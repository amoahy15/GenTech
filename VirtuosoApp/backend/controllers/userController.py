import logging
import uuid
from flask import Flask, Blueprint, request, jsonify, current_app
from models.userModel import User
from mongoengine.errors import NotUniqueError, ValidationError
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
bcrypt = Bcrypt(app)
user_controller = Blueprint('user_controller', __name__)

@user_controller.route('/create_user', methods=['POST'])
@jwt_required()
def create_user():
    current_app.logger.info("Attempting to create a new user")
    data = request.get_json()
    if not data:
        current_app.logger.warning("No JSON payload received")
        return jsonify({"error": "No JSON payload received"}), 400

    if User.objects(email=data['email']).first():
        current_app.logger.error("Email already exists")
        return jsonify({"error": "Email already exists"}), 409

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
        preferences=data.get('preferences', {}),
        joined_date=datetime.now(timezone.utc)
    )
    try:
        new_user.save()
        current_app.logger.info(f"User {new_user.user_name} created successfully with ID {new_user.user_id}.")
        return jsonify({"message": "User created successfully", "user_id": new_user.user_id}), 201
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

    if user:
        data = request.get_json()
        for key, value in data.items():
            setattr(user, key, value)
        user.save()
        current_app.logger.info(f"User {user_id} updated successfully.")
        return jsonify({"message": "User updated successfully"}), 200

    current_app.logger.error("User not found for update")
    return jsonify({"error": "User not found"}), 404

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