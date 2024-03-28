import logging
import uuid
import re
from flask import Flask, Blueprint, request, jsonify
from models.userModel import User
from mongoengine.errors import NotUniqueError, ValidationError
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
bcrypt = Bcrypt(app)

user_controller = Blueprint('user_controller', __name__)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@user_controller.route('/create_user', methods=['POST'])
def create_user():
    logger.info("Attempting to create a new user")
    try:
        data = request.get_json()
        if not data:
            logger.warning("No JSON payload received")
            return jsonify({"error": "No JSON payload received"}), 400
        
        if not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
            logger.error("Invalid email format provided")
            return jsonify({"error": "Invalid email format"}), 400
        
        if User.objects(email=data['email']).first() or User.objects(user_name=data['user_name']).first():
            logger.error("Username or email already exists")
            return jsonify({"error": "Username or email already exists"}), 409
        
        if len(data['password']) < 8:
            logger.error("Password does not meet complexity requirements")
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
            friends_list=data.get('friends_list', []),
            social_media_links=data.get('social_media_links', {}),
            verification_status=data.get('verification_status', False),
            preferences=data.get('preferences', {}),
            joined_date=datetime.now(timezone.utc)
        )
        new_user.save()
        logger.info(f"User {new_user.user_name} created successfully with ID {unique_user_id}.")
        return jsonify({"message": "User created successfully", "user_id": unique_user_id}), 201
    except ValidationError as e:
        logger.exception("Data validation failed")
        return jsonify({"error": "Data validation failed"}), 400
    except NotUniqueError:
        logger.exception("Attempted to create a user with existing username or email")
        return jsonify({"error": "User already exists"}), 409
    except Exception as e:
        logger.exception("An unexpected error occurred during user creation")
        return jsonify({"error": "An unexpected error occurred"}), 500

@user_controller.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    try:
        user = User.objects(user_name=data['user_name']).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        if bcrypt.check_password_hash(user.password_hash, data['password']):
            access_token = create_access_token(identity=str(user.user_id))
            return jsonify({"message": "Login successful", "access_token": access_token}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@user_controller.route('/user/<string:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = User.objects(user_id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        user_data = user.serialize()
        return jsonify(user_data), 200
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@user_controller.route('/update_user/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    try:
        user = User.objects(user_id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        user.update(**data)
        return jsonify({"message": "User updated successfully"}), 200
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({"error": "Data validation failed"}), 400
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@user_controller.route('/delete_user/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.objects(user_id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        user.delete()
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@user_controller.route('/authenticate_user', methods=['POST'])
def authenticate_user():
    data = request.get_json()
    try:
        user = User.objects(email=data['email']).first()
        if user and bcrypt.check_password_hash(user.password_hash, data['password']):
            return jsonify({"message": "Authentication successful"}), 200
        return jsonify({"error": "Authentication failed"}), 401
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@user_controller.route('/list_users', methods=['GET'])
def list_users():
    try:
        users = User.objects()
        users_data = [user.serialize() for user in users]
        return jsonify(users_data), 200
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


@user_controller.route('/details', methods=['GET'])
@jwt_required()
def get_user_details():
    logger.info("Fetching user details")
    # Get the username from the JWT token
    current_user = get_jwt_identity()
    logger.debug(f"Current user identified: {current_user}")

    try:
        # Query the user details from the database
        user = User.objects(user_id=current_user).first()
        logger.debug(f"Current user ID: {current_user}")
        if not user:
            logger.warning(f"User not found: {current_user}")
            return jsonify({"error": "User not found"}), 404

        # Assuming 'bio' is a field in your User model
        user_details = {"username": user.user_name, "bio": user.bio}
        logger.info(f"User details fetched successfully for: {current_user}")
        
        return jsonify(user_details), 200
    except Exception as e:
        logger.error(f"Error fetching user details for {current_user}: {e}", exc_info=True)
        return jsonify({"error": "An unexpected error occurred"}), 500