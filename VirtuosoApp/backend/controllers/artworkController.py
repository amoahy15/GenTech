from datetime import datetime
from flask import current_app, request, jsonify, Blueprint
from werkzeug.utils import secure_filename
import boto3
import os
from mongoengine import ValidationError, NotUniqueError
from models.artworkModel import Artwork
from models.userModel import User
from flask_jwt_extended import jwt_required, get_jwt_identity
import uuid


artwork_controller = Blueprint('artwork_controller', __name__)



@artwork_controller.route('/create_artwork', methods=['POST'])
@jwt_required()  
def create_artwork():
    current_app.logger.info("Attempting to create artwork")
    user_id = get_jwt_identity()
    user = User.objects(user_id=user_id).first()
    
    if not user:
        current_app.logger.error("User not found")
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    required_fields = ['title', 'year', 'image_url', 'description']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        current_app.logger.error("Missing required fields: %s", ', '.join(missing_fields))
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400


    try:
        new_artwork = Artwork(
            artwork_id=str(uuid.uuid4()),
            title=data['title'],
            user_id=user.user_id,  
            artist_name=data['artist'],
            artist = data['artist'],
            year=data['year'],
            image_url=data['image_url'],
            description=data['description'],
            tags = [user.email],
        )

        new_artwork.save()
        current_app.logger.info("Artwork created successfully")

        user.update(inc__artwork_count=1)  
        current_app.logger.info("Artwork count updated for user.")

        return jsonify({"message": "Artwork created successfully!"}), 201
    except ValidationError as e:
        current_app.logger.exception("Validation error during artwork creation")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        current_app.logger.exception("Unexpected error during artwork creation")
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500
    
@artwork_controller.route('/delete_artwork/<string:artwork_id>', methods=['DELETE'])
@jwt_required()
def delete_artwork(artwork_id):
    current_app.logger.info("Attempting to delete artwork")
    current_user_id = get_jwt_identity()
    artwork = Artwork.objects(artwork_id=artwork_id, artist=current_user_id).first()
    
    if not artwork:
        current_app.logger.error("Artwork not found or not authorized")
        return jsonify({"error": "Artwork not found or not authorized"}), 404

    artwork.delete()
    current_app.logger.info("Artwork deleted successfully")
    return jsonify({"message": "Artwork deleted successfully"}), 200

@artwork_controller.route('/update_artwork/<string:artwork_id>', methods=['PUT'])
@jwt_required()
def update_artwork(artwork_id):
    current_app.logger.info("Attempting to update artwork")
    current_user_id = get_jwt_identity()
    artwork = Artwork.objects(artwork_id=artwork_id, artist=current_user_id).first()
    
    if not artwork:
        current_app.logger.error("Artwork not found or not authorized")
        return jsonify({"error": "Artwork not found or not authorized"}), 404
    
    data = request.get_json()
    for field in ['title', 'year', 'image_url', 'description', 'tags']:
        if field in data:
            setattr(artwork, field, data[field])
    
    artwork.save()
    current_app.logger.info("Artwork updated successfully")
    return jsonify({"message": "Artwork updated successfully"}), 200

@artwork_controller.route('/get_artwork/<string:artwork_id>', methods=['GET'])
@jwt_required(optional=True)  
def get_artwork(artwork_id):
    current_app.logger.info("Attempting to fetch artwork")
    artwork = Artwork.objects(artwork_id=artwork_id).first()
    
    if not artwork:
        current_app.logger.error("Artwork not found")
        return jsonify({"error": "Artwork not found"}), 404
    
    return jsonify(artwork.serialize()), 200


@artwork_controller.route('/user_artwork', methods=['GET'])
@jwt_required()
def get_user_artworks():
    user_id = get_jwt_identity() 
    current_app.logger.info(f"Attempting to fetch artworks for user ID {user_id}")
    artworks = Artwork.objects(user_id=user_id)

    if artworks:
        return jsonify([artwork.serialize() for artwork in artworks]), 200
    else:
        current_app.logger.error("No artworks found for this user")
        return jsonify({"error": "No artworks found"}), 404

@artwork_controller.route('/artworks/collection/<string:collection_name>', methods=['GET'])
@jwt_required()  
def get_artworks_by_collection(collection_name):
    artworks = Artwork.objects(collection=collection_name)
    if artworks:
        response = {
            "images": [artwork.serialize() for artwork in artworks]
        }
        return jsonify(response), 200
    else:
        return jsonify({"error": "No artworks found in this collection"}), 404

@artwork_controller.route('/get_artwork_url/<string:artwork_id>', methods=['GET'])
@jwt_required()  
def get_artwork_url(artwork_id):
    current_app.logger.info("Attempting to fetch artwork URL")
    artwork = Artwork.objects(artwork_id=artwork_id).first()
    
    if not artwork:
        current_app.logger.error("Artwork not found")
        return jsonify({"error": "Artwork not found"}), 404

    image_url = artwork.image_url
    
    return jsonify({"image_url": image_url}), 200

@artwork_controller.route('/tags/<string:tag>', methods=['GET'])
@jwt_required(optional=True)
def get_artworks_by_tag(tag):
    try:
        artworks_with_tag = Artwork.objects(tags=tag)
        artworks_data = [artwork.serialize() for artwork in artworks_with_tag]
        if artworks_with_tag:
            return jsonify({"artworks": artworks_data}), 200
        else:
            return jsonify({"message": "No artworks found with the tag"}), 404
    except Exception as e:
        current_app.logger.error(f"Failed to fetch artworks with tag {tag}: {e}")
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

@artwork_controller.route('/create_artwork/gentech', methods=['POST'])
@jwt_required()  
def gentech_artwork():
    current_app.logger.info("Attempting to create artwork")
    user_id = get_jwt_identity()
    user = User.objects(user_id=user_id).first()
    if not user:
        current_app.logger.error("User not found")
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    required_fields = ['title', 'year', 'image_url']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        current_app.logger.error("Missing required fields: %s", ', '.join(missing_fields))
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400


    try:
        new_artwork = Artwork(
            artwork_id=str(uuid.uuid4()),
            title=data['title'],
            user_id=user.user_id,  
            artist_name=data['artist'],
            artist = data['artist'],
            year=data['year'],
            image_url=data['image_url'],
            tags = data['tags'],
            description = data['description']
        )

        new_artwork.save()
        current_app.logger.info("Artwork created successfully")

        user.update(inc__artwork_count=1)  
        current_app.logger.info("Artwork count updated for user.")

        return jsonify({"message": "Artwork created successfully!"}), 201
    except ValidationError as e:
        current_app.logger.exception("Validation error during artwork creation")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        current_app.logger.exception("Unexpected error during artwork creation")
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500
    
@artwork_controller.route('/getartwork', methods=['GET'])
def getartwork():
    artworks = Artwork.objects.all()
    return jsonify([artwork.serialize() for artwork in artworks]), 200