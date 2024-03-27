import logging
import os

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
    try:
        data = request.get_json()
        if not data:
            raise ValueError("No JSON payload received")
        
        hashed_password = bcrypt.generate_password_hash(data['password'].encode('utf-8'))
        
        # Generate a random UUID for the new user
        unique_user_id = str(uuid.uuid4())
        
        new_user = Users(
            userID=unique_user_id,  # Use the generated UUID as userID
            userName=data['userName'],
            first_name=data.get('firstName'),
            last_name=data.get('lastName'),
            email=data['email'],
            passwordHash=hashed_password,
            profilePicture=data.get('profilePicture'),
            bio=data.get('bio'),
            location=data.get('location'),
            favoriteArtworks=data.get('favoriteArtworks', []),
            reviews=data.get('reviews', []),
            friendsList=data.get('friendsList', []),
            socialMediaLinks=data.get('socialMediaLinks', {}),
            verificationStatus=data.get('verificationStatus', False),
            preferences=data.get('preferences', {}),
            joinedDate=data.get('joinedDate')
        )
        new_user.save()
        logger.info(f"User {new_user.userName} created successfully.")
        return jsonify({"message": "User created successfully", "userID": unique_user_id}), 201
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({"error": "Data validation failed"}), 400
    except NotUniqueError:
        logger.error("User already exists.")
        return jsonify({"error": "User already exists"}), 409
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
