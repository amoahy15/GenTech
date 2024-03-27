import logging
import os
import re

from flask import Flask, Blueprint, request, jsonify, current_app
from models.userModel import Users
from mongoengine.errors import NotUniqueError, ValidationError, DoesNotExist
from datetime import timedelta, datetime,timezone
from flask_bcrypt import Bcrypt

import uuid  # Import UUID library

app = Flask(__name__)
bcrypt = Bcrypt(app)

# Initialize Blueprint for UserController
user_controller = Blueprint('user_controller', __name__)

# Configure the logger
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@user_controller.route('/create_user', methods=['POST'])
def create_user():
    logger.info("Attempting to create a new user")
    try:
        data = request.get_json()
        if not data:
            logger.warning("No JSON payload received")
            raise ValueError("No JSON payload received")
        
        # Email validation using regex
        if not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
            logger.error("Invalid email format provided")
            return jsonify({"error": "Invalid email format"}), 400
        
        # Check if email or username already exists in the database
        if Users.objects(email=data['email']).first() or Users.objects(userName=data['userName']).first():
            logger.error("Username or email already exists")
            return jsonify({"error": "Username or email already exists"}), 409

        # Password complexity check: At least 8 characters
        if len(data['password']) < 8:
            logger.error("Password does not meet complexity requirements")
            return jsonify({"error": "Password must be at least 8 characters long"}), 400

        hashed_password = bcrypt.generate_password_hash(data['password'].encode('utf-8'))
        unique_user_id = str(uuid.uuid4())  # Generate a unique UUID for the new user
        
        new_user = Users(
            userID=unique_user_id,
            userName=data['userName'],
            email=data['email'],
            passwordHash=hashed_password,
            first_name=data.get('firstName', ''),
            last_name=data.get('lastName', ''),
            profilePicture=data.get('profilePicture', ''),
            bio=data.get('bio', ''),
            location=data.get('location', ''),
            favoriteArtworks=data.get('favoriteArtworks', []),
            reviews=data.get('reviews', []),
            friendsList=data.get('friendsList', []),
            socialMediaLinks=data.get('socialMediaLinks', {}),
            verificationStatus=data.get('verificationStatus', False),
            preferences=data.get('preferences', {}),
            joinedDate=data.get('joinedDate', datetime.utcnow())  # Use current UTC datetime if not provided
        )
        new_user.save()
        logger.info(f"User {new_user.userName} created successfully with ID {unique_user_id}.")
        
        return jsonify({"message": "User created successfully", "userID": unique_user_id}), 201
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
        # Find user by username
        user = Users.objects(userName=data['userName']).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Check if the password matches
        if bcrypt.check_password_hash(user.passwordHash, data['password']):
            return jsonify({"message": "Login successful", "userID": user.userID}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
    

@user_controller.route('/user/<string:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = Users.objects(userID=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        return jsonify(user.to_json()), 200
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@user_controller.route('/update_user/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    try:
        user = Users.objects(userID=user_id).first()
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
        user = Users.objects(userID=user_id).first()
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
        user = Users.objects(email=data['email']).first()
        if user and bcrypt.check_password_hash(user.passwordHash, data['password']):
            return jsonify({"message": "Authentication successful"}), 200
        return jsonify({"error": "Authentication failed"}), 401
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@user_controller.route('/list_users', methods=['GET'])
def list_users():
    try:
        users = Users.objects()
        return jsonify(users.to_json()), 200
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
