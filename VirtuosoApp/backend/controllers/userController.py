import logging
import uuid
import re
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
def create_user():
    current_app.logger.info("Attempting to create a new user")
    try:
        data = request.get_json()
        #password requirement: 
        if not data:
            current_app.logger.warning("No JSON payload received")
            return jsonify({"error": "No JSON payload received"}), 400
        
        if not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
            current_app.logger.error("Invalid email format provided")
            return jsonify({"error": "Invalid email format"}), 400
        
        if User.objects(email=data['email']).first() or User.objects(user_name=data['user_name']).first():
            current_app.logger.error("Username or email already exists")
            return jsonify({"error": "Username or email already exists"}), 409
        
        if len(data['password']) < 8:
            current_app.logger.error("Password does not meet complexity requirements")
            return jsonify({"error": "Password must be at least 8 characters long"}), 400

        hashed_password = bcrypt.generate_password_hash(data['password'].encode('utf-8')).decode('utf-8')
        unique_user_id = str(uuid.uuid4())
        
        new_user = User(
            user_id=unique_user_id,
            user_name=data['user_name'],
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', ''),
            email=data['email'],
            password_hash=hashed_password,
            profile_picture=data.get('profile_picture', ''),
            bio=data.get('bio', ''),
            location=data.get('location', ''),
            favorite_artworks=data.get('favorite_artworks', []),
            reviews=data.get('reviews', []),
            is_private=data.get('is_private', False), 
            social_media_links=data.get('social_media_links', {}),
            verification_status=data.get('verification_status', False),
            preferences=data.get('preferences', {}),
            joined_date=datetime.now(timezone.utc)
        )
        new_user.save()
        current_app.logger.info(f"User {new_user.user_name} created successfully with ID {unique_user_id}.")
        return jsonify({"message": "User created successfully", "user_id": unique_user_id}), 201
    except ValidationError as e:
        current_app.logger.exception("Data validation failed")
        return jsonify({"error": "Data validation failed"}), 400
    except NotUniqueError:
        current_app.logger.exception("Attempted to create a user with existing username or email")
        return jsonify({"error": "User already exists"}), 409
    except Exception as e:
        current_app.logger.exception("An unexpected error occurred during user creation")
        return jsonify({"error": "An unexpected error occurred"}), 500
    
# Route for user login
@user_controller.route('/login', methods=['POST'])
def login_user():
    current_app.logger.info("Login attempt")
    try:
        data = request.get_json()
        if not data or 'user_name' not in data or 'password' not in data:
            current_app.logger.warning("Missing login credentials")
            return jsonify({"error": "Missing login credentials"}), 400

        user = User.objects(user_name=data['user_name']).first()
        if not user:
            current_app.logger.warning("User not found during login")
            return jsonify({"error": "User not found"}), 404
        
        if bcrypt.check_password_hash(user.password_hash, data['password']):
            access_token = create_access_token(identity=str(user.user_id))
            current_app.logger.info(f"User {data['user_name']} logged in successfully")
            return jsonify({"message": "Login successful", "access_token": access_token}), 200
        else:
            current_app.logger.warning("Invalid login credentials provided")
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        current_app.logger.exception("An unexpected error occurred during login")
        return jsonify({"error": "An unexpected error occurred"}), 500

# Route for getting user details by user ID
@user_controller.route('/user/<string:user_id>', methods=['GET'])
def get_user(user_id):
    current_app.logger.info(f"Fetching details for user ID: {user_id}")
    try:
        user = User.objects(user_id=user_id).first()
        if not user:
            current_app.logger.warning(f"User {user_id} not found")
            return jsonify({"error": "User not found"}), 404
        
        user_data = user.serialize()
        current_app.logger.info(f"User details fetched for {user_id}")
        return jsonify(user_data), 200
    except Exception as e:
        current_app.logger.exception(f"Error fetching user details for {user_id}")
        return jsonify({"error": "An unexpected error occurred"}), 500

# Route for updating user details
@user_controller.route('/update_user/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    current_app.logger.info(f"Updating user {user_id}")
    current_user_id = get_jwt_identity()  # Authenticate user

    # Make sure users can only update their own information
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized to update this user's information"}), 403

    data = request.get_json()
    if not data:
        current_app.logger.warning("No data provided for update")
        return jsonify({"error": "No update data provided"}), 400

    try:
        user = User.objects(user_id=user_id).first()
        if not user:
            current_app.logger.warning(f"User {user_id} not found for update")
            return jsonify({"error": "User not found"}), 404

        allowed_updates = {'first_name', 'last_name', 'bio', 'location', 'profile_picture',
                           'is_private', 'social_media_links', 'preferences'}

        for field, value in data.items():
            if field in allowed_updates:
                if field == 'bio' and len(value) > 500:
                    # Enforces bio length limit
                    return jsonify({"error": "Bio must be 500 characters or less"}), 400
                setattr(user, field, value)
            else:
                current_app.logger.warning(f"Attempted to update an unauthorized field: {field}")
                return jsonify({"error": f"Cannot update field: {field}"}), 400

        user.save()
        current_app.logger.info(f"User {user_id} updated successfully")
        return jsonify({"message": "User updated successfully"}), 200
    except ValidationError as e:
        current_app.logger.exception("Validation error during update")
        return jsonify({"error": "Data validation failed", "details": str(e)}), 400
    except NotUniqueError:
        current_app.logger.exception("Attempted to update user with existing email or username")
        return jsonify({"error": "Email or username already exists"}), 409
    except Exception as e:
        current_app.logger.exception("An unexpected error occurred during user update")
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500


# Route for deleting a user
@user_controller.route('/delete_user/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    current_app.logger.info(f"Deleting user {user_id}")
    try:
        user = User.objects(user_id=user_id).first()
        if not user:
            current_app.logger.warning(f"User {user_id} not found for deletion")
            return jsonify({"error": "User not found"}), 404
        
        user.delete()
        current_app.logger.info(f"User {user_id} deleted successfully")
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        current_app.logger.exception(f"Unexpected error during deletion for user {user_id}")
        return jsonify({"error": "An unexpected error occurred"}), 500
# Route for authenticating a user
@user_controller.route('/authenticate_user', methods=['POST'])
def authenticate_user():
    current_app.logger.info("Attempting user authentication")
    try:
        data = request.get_json()
        if not data or 'email' not in data or 'password' not in data:
            current_app.logger.warning("Missing authentication credentials")
            return jsonify({"error": "Missing authentication credentials"}), 400

        user = User.objects(email=data['email']).first()
        if user and bcrypt.check_password_hash(user.password_hash, data['password']):
            current_app.logger.info(f"User {data['email']} authenticated successfully")
            return jsonify({"message": "Authentication successful"}), 200
        else:
            current_app.logger.warning("Authentication failed")
            return jsonify({"error": "Authentication failed"}), 401
    except Exception as e:
        current_app.logger.exception("Unexpected error during authentication")
        return jsonify({"error": "An unexpected error occurred"}), 500

# Route for listing all users
@user_controller.route('/list_users', methods=['GET'])
def list_users():
    current_app.logger.info("Listing all users")
    try:
        users = User.objects()
        users_data = [user.serialize() for user in users]
        current_app.logger.info("Successfully fetched all users")
        return jsonify(users_data), 200
    except Exception as e:
        current_app.logger.exception("Unexpected error while listing users")
        return jsonify({"error": "An unexpected error occurred"}), 500

# Route for getting details of the currently logged-in user
@user_controller.route('/details', methods=['GET'])
@jwt_required()
def get_user_details():
    current_user_id = get_jwt_identity()
    current_app.logger.info(f"Fetching details for currently logged-in user: {current_user_id}")
    try:
        user = User.objects(user_id=current_user_id).first()
        if not user:
            current_app.logger.warning(f"Logged-in user {current_user_id} not found")
            return jsonify({"error": "User not found"}), 404
        
        user_details = user.serialize()  
        current_app.logger.info(f"Details fetched successfully for user: {current_user_id}")
        return jsonify(user_details), 200
    except Exception as e:
        current_app.logger.exception(f"Error fetching details for logged-in user: {current_user_id}, Error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@user_controller.route('/follow', methods=['POST'])
@jwt_required()
def follow_user():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    current_app.logger.info(f"User {current_user_id} attempting to follow another user")

    target_user_id = data.get('target_user_id')
    if not target_user_id:
        current_app.logger.error("Target user ID is required")
        return jsonify({"error": "Target user ID is required"}), 400

    if current_user_id == target_user_id:
        current_app.logger.error("User attempted to follow themselves")
        return jsonify({"error": "You cannot follow yourself"}), 400

    current_user = User.objects(user_id=current_user_id).first()
    target_user = User.objects(user_id=target_user_id).first()

    if not current_user or not target_user:
        current_app.logger.error("Either current user or target user not found")
        return jsonify({"error": "User not found"}), 404

    if target_user_id in current_user.following or target_user_id in target_user.pending_follow_requests:
        current_app.logger.warning("User is already following this user or request is pending")
        return jsonify({"error": "Already following this user or request pending"}), 400

    if target_user.is_private:
        target_user.update(add_to_set__pending_follow_requests=current_user_id)
        current_app.logger.info("Follow request sent to target user")
        return jsonify({"message": "Follow request sent"}), 200
    else:
        current_user.update(add_to_set__following=target_user_id, inc__following_count=1)
        target_user.update(add_to_set__followers=current_user_id, inc__followers_count=1)
        current_app.logger.info("User successfully followed another user")
        return jsonify({"message": "Successfully followed the user"}), 200

@user_controller.route('/unfollow', methods=['POST'])
@jwt_required()
def unfollow_user():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    current_app.logger.info(f"User {current_user_id} attempting to unfollow another user")

    target_user_id = data.get('target_user_id')
    if not target_user_id:
        current_app.logger.error("Target user ID is required")
        return jsonify({"error": "Target user ID is required"}), 400

    current_user = User.objects(user_id=current_user_id).first()
    target_user = User.objects(user_id=target_user_id).first()

    if not current_user or not target_user:
        current_app.logger.error("Either current user or target user not found")
        return jsonify({"error": "User not found"}), 404

    if target_user_id in current_user.following:
        current_user.update(pull__following=target_user_id, dec__following_count=1)
        target_user.update(pull__followers=current_user_id, dec__followers_count=1)
        current_app.logger.info("User successfully unfollowed another user")
        return jsonify({"message": "Successfully unfollowed the user"}), 200
    elif target_user_id in target_user.pending_follow_requests:
        target_user.update(pull__pending_follow_requests=current_user_id)
        current_app.logger.info("Cancelled pending follow request")
        return jsonify({"message": "Follow request canceled"}), 200
    else:
        current_app.logger.warning("User is not following this user or no pending request found")
        return jsonify({"error": "You are not following this user or no pending request found"}), 400
