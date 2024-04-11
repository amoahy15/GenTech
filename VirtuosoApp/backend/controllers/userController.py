import logging
import uuid
import re
from flask import Flask, Blueprint, request, jsonify, current_app
from models.userModel import User
from mongoengine.errors import NotUniqueError, ValidationError
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_controller = Blueprint('user_controller', __name__)

@user_controller.route('/create_user', methods=['POST'])
@jwt_required()
def create_user():
    current_app.logger.info("Attempting to create a new user")
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No JSON payload received"}), 400

    if User.objects(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 409

    new_user = User(
        user_id=str(uuid.uuid4()),
        user_name=data['user_name'],
        first_name=data.get('first_name', ''),
        last_name=data.get('last_name', ''),
        email=data['email'],
        password_hash=User.hash_password(data['password']),
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
        return jsonify({"message": "User created successfully", "user_id": new_user.user_id}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except NotUniqueError:
        return jsonify({"error": "User already exists"}), 409

@user_controller.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.objects(user_name=data.get('user_name')).first()

    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.user_id)
        return jsonify({"message": "Login successful", "access_token": access_token}), 200

    return jsonify({"error": "Invalid credentials"}), 401

@user_controller.route('/user/<string:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.objects(user_id=user_id).first()

    if user:
        return jsonify(user.serialize()), 200

    return jsonify({"error": "User not found"}), 404

@user_controller.route('/update_user', methods=['PUT'])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    user = User.objects(user_id=user_id).first()

    if user:
        data = request.get_json()
        user.modify(**data)
        return jsonify({"message": "User updated successfully"}), 200

    return jsonify({"error": "User not found"}), 404

@user_controller.route('/delete_user/<string:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.objects(user_id=user_id).first()

    if user:
        user.delete()
        return jsonify({"message": "User deleted successfully"}), 200

    return jsonify({"error": "User not found"}), 404

@user_controller.route('/authenticate_user', methods=['POST'])
@jwt_required()
def authenticate_user():
    data = request.get_json()
    user = User.objects(email=data['email']).first()

    if user and user.check_password(data['password']):
        return jsonify({"message": "Authentication successful"}), 200

    return jsonify({"error": "Authentication failed"}), 401

@user_controller.route('/list_users', methods=['GET'])
@jwt_required()
def list_users():
    users = User.objects()
    return jsonify([user.serialize() for user in users]), 200

@user_controller.route('/details', methods=['GET'])
@jwt_required()
def get_user_details():
    current_user_id = get_jwt_identity()
    user = User.objects(user_id=current_user_id).first()

    if user:
        return jsonify(user.serialize()), 200

    return jsonify({"error": "User not found"}), 404

@user_controller.route('/follow', methods=['POST'])
@jwt_required()
def follow_user():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    target_user_id = data.get('target_user_id')

    if not target_user_id or current_user_id == target_user_id:
        return jsonify({"error": "Invalid target user ID or cannot follow self"}), 400

    current_user = User.objects(user_id=current_user_id).first()
    target_user = User.objects(user_id=target_user_id).first()

    if not current_user or not target_user:
        return jsonify({"error": "User not found"}), 404

    if target_user_id in current_user.following:
        return jsonify({"message": "Already following"}), 200

    if target_user.is_private:
        target_user.update(add_to_set__pending_follow_requests=current_user_id)
        return jsonify({"message": "Follow request sent"}), 200
    else:
        current_user.update(add_to_set__following=target_user_id)
        target_user.update(add_to_set__followers=current_user_id)
        return jsonify({"message": "Successfully followed the user"}), 200

@user_controller.route('/unfollow', methods=['POST'])
@jwt_required()
def unfollow_user():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    target_user_id = data.get('target_user_id')

    if not target_user_id:
        return jsonify({"error": "Target user ID is required"}), 400

    current_user = User.objects(user_id=current_user_id).first()
    target_user = User.objects(user_id=target_user_id).first()

    if not current_user or not target_user:
        return jsonify({"error": "User not found"}), 404

    if target_user_id in current_user.following:
        current_user.update(pull__following=target_user_id)
        target_user.update(pull__followers=current_user_id)
        return jsonify({"message": "Successfully unfollowed the user"}), 200
    else:
        return jsonify({"error": "Not following this user"}), 400
