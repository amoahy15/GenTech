import uuid
import logging
import os
import secrets
from flask import Flask, Blueprint, request, jsonify, current_app
from models.userModel import User
from mongoengine.errors import NotUniqueError, ValidationError
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .mailController import send_confirmation_email, send_password_reset_email

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
bcrypt = Bcrypt(app)
user_controller = Blueprint('user_controller', __name__)

@user_controller.route('/create_user', methods=['POST'])
def create_user():
    current_app.logger.info("Attempting to create a new user")
    data = request.get_json()
    if not data:
        current_app.logger.warning("No JSON payload received")
        return jsonify({"error": "No JSON payload received"}), 400

    if User.objects(email=data['email']).first():
        current_app.logger.error("Email already exists")
        return jsonify({"error": "Email already exists"}), 409     
     
    verification_code = secrets.token_urlsafe(16)
    new_user = User(
        user_id=str(uuid.uuid4()),
        user_name=data['user_name'],
        first_name=data.get('first_name', ''),
        last_name=data.get('last_name', ''),
        email=data['email'],
        password_hash=bcrypt.generate_password_hash(data['password']).decode('utf-8'),
        profile_picture=data.get('profile_picture', ''),
        bio=data.get('bio', ''),
        location=data.get('location', ''),
        favorite_artworks=data.get('favorite_artworks', []),
        reviews=[],
        is_private=data.get('is_private', False),
        social_media_links=data.get('social_media_links', {}),
        verification_status=data.get('verification_status', False),
        reset_token = '',
        verification_token=verification_code,
        preferences=data.get('preferences', {}),
        joined_date=datetime.now(timezone.utc)
    )
    try:
        new_user.save()
        base_url = os.getenv('BASE_URL', 'http://localhost:3000')
        verification_url = f"{base_url}/verify/{new_user.user_id}/{verification_code}"
        send_confirmation_email(new_user.email, verification_url)
        return jsonify({"message": "User created successfully, please check your email to verify your account", "user_id": new_user.user_id}), 201
        
    except ValidationError as e:
        current_app.logger.error("Validation error during user creation", exc_info=True)
        return jsonify({"error": str(e)}), 400
    except NotUniqueError:
        current_app.logger.error("User already exists with the provided username or email", exc_info=True)
        return jsonify({"error": "User already exists"}), 409

@user_controller.route('/update_user', methods=['PUT'])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    user = User.objects(user_id=user_id).first()

    if not user:
        current_app.logger.error("User not found for update")
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if 'user_name' in data:
        user.user_name = data['user_name']
        current_app.logger.info(f"Updating username for user ID {user_id} to {data['user_name']}")
    else:
        current_app.logger.warning(f"No 'user_name' found in request data for user ID {user_id}")

    try:
        user.save()
        current_app.logger.info(f"User {user_id} updated successfully to {data['user_name']}")
        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        current_app.logger.error(f"Error updating user {user_id}: {str(e)}")
        return jsonify({"error": "Error updating user"}), 500

@user_controller.route('/update_password', methods=['PUT'])
@jwt_required()
def update_password():
    user_id = get_jwt_identity()
    user = User.objects(user_id=user_id).first()

    if not user:
        current_app.logger.error("User not found")
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if 'old_password' in data and 'new_password' in data:
        if bcrypt.check_password_hash(user.password_hash, data['old_password']):
            new_hashed_password = bcrypt.generate_password_hash(data['new_password']).decode('utf-8')
            user.password_hash = new_hashed_password
            try:
                user.save()
                return jsonify({"message": "Password updated successfully"}), 200
            except Exception as e:
                current_app.logger.error(f"Error updating password for user {user_id}: {str(e)}")
                return jsonify({"error": "Error updating password"}), 500
        else:
            return jsonify({"error": "Incorrect old password"}), 400
    else:
        return jsonify({"error": "Required password fields missing"}), 400
    
@user_controller.route('/update_bio', methods=['PUT'])
@jwt_required()
def update_bio():
    user_id = get_jwt_identity()
    user = User.objects(user_id=user_id).first()

    if not user:
        current_app.logger.error("User not found for bio update")
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if 'bio' in data:
        user.bio = data['bio']
        current_app.logger.info(f"Updating bio for user ID {user_id} to {data['bio']}")
    else:
        current_app.logger.warning(f"No 'bio' found in request data for user ID {user_id}")

    try:
        user.save()
        current_app.logger.info(f"User bio updated successfully for user ID {user_id}")
        return jsonify({"message": "User bio updated successfully"}), 200
    except Exception as e:
        current_app.logger.error(f"Error updating bio for user {user_id}: {str(e)}")
        return jsonify({"error": "Error updating user bio"}), 500

    
@user_controller.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.objects(user_name=data.get('user_name')).first()

    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.user_id)
        current_app.logger.info(f"User {data['user_name']} logged in successfully")
        return jsonify({"message": "Login successful", "access_token": access_token}), 200

    current_app.logger.error("Invalid login credentials")
    return jsonify({"error": "Invalid credentials"}), 401


@user_controller.route('/delete_user/<string:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.objects(user_id=user_id).first()

    if user:
        user.delete()
        current_app.logger.info(f"User {user_id} deleted successfully")
        return jsonify({"message": "User deleted successfully"}), 200

    current_app.logger.error(f"User {user_id} not found for deletion")
    return jsonify({"error": "User not found"}), 404

@user_controller.route('/authenticate_user', methods=['POST'])
@jwt_required()
def authenticate_user():
    data = request.get_json()
    user = User.objects(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        current_app.logger.info(f"User {data['email']} authenticated successfully")
        return jsonify({"message": "Authentication successful"}), 200

    current_app.logger.error("Authentication failed")
    return jsonify({"error": "Authentication failed"}), 401

@user_controller.route('/list_users', methods=['GET'])
@jwt_required()
def list_users():
    users = User.objects()
    current_app.logger.info("Successfully fetched all users")
    return jsonify([user.serialize() for user in users]), 200

@user_controller.route('/details', methods=['GET'])
@jwt_required()
def get_user_details():
    current_user_id = get_jwt_identity()
    user = User.objects(user_id=current_user_id).first()

    if user:
        current_app.logger.info(f"Details fetched successfully for user: {current_user_id}")
        return jsonify(user.serialize()), 200

    current_app.logger.error(f"Logged-in user {current_user_id} not found")
    return jsonify({"error": "User not found"}), 404

@user_controller.route('/follow', methods=['POST'])
@jwt_required()
def follow_user():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    target_user_id = data.get('target_user_id')

    if not target_user_id or current_user_id == target_user_id:
        current_app.logger.error("Invalid target user ID or cannot follow self")
        return jsonify({"error": "Invalid target user ID or cannot follow self"}), 400

    current_user = User.objects(user_id=current_user_id).first()
    target_user = User.objects(user_id=target_user_id).first()

    if not current_user or not target_user:
        current_app.logger.error("User not found")
        return jsonify({"error": "User not found"}), 404

    if target_user_id in current_user.following:
        current_app.logger.warning("User is already following this user")
        return jsonify({"message": "Already following"}), 200

    if target_user.is_private:
        target_user.update(add_to_set__pending_follow_requests=current_user_id)
        current_app.logger.info("Follow request sent to private user")
        return jsonify({"message": "Follow request sent"}), 200
    else:
        current_user.update(add_to_set__following=target_user_id)
        target_user.update(add_to_set__followers=current_user_id)
        current_app.logger.info("User successfully followed another user")
        return jsonify({"message": "Successfully followed the user"}), 200

@user_controller.route('/unfollow', methods=['POST'])
@jwt_required()
def unfollow_user():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    target_user_id = data.get('target_user_id')

    if not target_user_id:
        current_app.logger.error("Target user ID is required")
        return jsonify({"error": "Target user ID is required"}), 400

    current_user = User.objects(user_id=current_user_id).first()
    target_user = User.objects(user_id=target_user_id).first()

    if not current_user or not target_user:
        current_app.logger.error("User not found")
        return jsonify({"error": "User not found"}), 404

    if target_user_id in current_user.following:
        current_user.update(pull__following=target_user_id)
        target_user.update(pull__followers=current_user_id)
        current_app.logger.info("User successfully unfollowed another user")
        return jsonify({"message": "Successfully unfollowed the user"}), 200
    else:
        current_app.logger.warning("User is not following this user")
        return jsonify({"error": "Not following this user"}), 400

@user_controller.route('/verify/<user_id>/<verification_token>', methods=['GET'])
def verify_user(user_id, verification_token):
    current_app.logger.debug(f"Verifying user {user_id} with token {verification_token}")
    user = User.objects(user_id=user_id).first()
    if not user:
        current_app.logger.warning(f"User not found: {user_id}")
        return jsonify({"error": "User not found"}), 404
    if user.verification_status:
        current_app.logger.info(f"User already verified: {user_id}")
        return jsonify({"message": "User already verified"}), 200
    if user.verification_token == verification_token:
        user.verification_status = True
        user.save()
        current_app.logger.info(f"User verified successfully: {user_id}")
        return jsonify({"verified": True, "message": "User successfully verified"}), 200
    else:
        current_app.logger.warning(f"Invalid verification token for user {user_id}: {verification_token}")
        return jsonify({"error": "Invalid verification token"}), 400

@user_controller.route('/request_password_reset', methods=['POST'])
def request_password_reset():
    data = request.get_json()
    if not data or 'email' not in data:
        current_app.logger.error("Email field is missing in request data")
        return jsonify({'error': 'Email is required'}), 400

    user = User.objects(email=data['email']).first()
    if not user:
        current_app.logger.warning(f"User not found with email: {data['email']}")
        return jsonify({'error': 'User not found'}), 404

    reset_code = secrets.token_urlsafe(16)
    user.reset_token = reset_code
    user.save()

    base_url = os.getenv('BASE_URL', 'http://localhost:3000')
    reset_url = f"{base_url}/reset_password/{reset_code}"
    try:
        send_password_reset_email(email=user.email, reset_url=reset_url)
        current_app.logger.info(f"Password reset email sent to {user.email}")
        return jsonify({'message': 'Password reset email sent successfully'}), 200
    except Exception as e:
        current_app.logger.error(f"Failed to send password reset email to {user.email}: {str(e)}")
        return jsonify({'error': 'Failed to send password reset email', 'details': str(e)}), 500

@user_controller.route('/reset_password/<reset_token>', methods=['PUT'])
def reset_password(reset_token):
    current_app.logger.info(f"Received password reset request for token: {reset_token}")
    data = request.get_json()
    if not data or 'password' not in data:
        current_app.logger.warning("No password provided in the request data")
        return jsonify({'error': 'Password is required'}), 400

    user = User.objects(reset_token=reset_token).first()
    if not user:
        current_app.logger.warning(f"No user found with reset token: {reset_token}")
        return jsonify({'error': 'Invalid or expired reset token'}), 404

    new_password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user.password_hash = new_password_hash
    user.reset_token = None
    try:
        user.save()
        current_app.logger.info("Password has been successfully reset")
        return jsonify({'message': 'Password has been reset successfully'}), 200
    except Exception as e:
        current_app.logger.error(f"Failed to reset password: {str(e)}")
        return jsonify({'error': 'Failed to reset password', 'details': str(e)}), 500
