from flask import request, jsonify, Blueprint
from mongoengine import NotUniqueError, ValidationError
from models.artworkModel import Artwork
from models.userModel import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import uuid
import logging

artwork_controller = Blueprint('artwork_controller', __name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@artwork_controller.route('/create_artwork', methods=['POST'])
@jwt_required()  
def create_artwork():
    logger.info("Attempting to create artwork")
    current_user_id = get_jwt_identity()  
    user = User.objects(user_id=current_user_id).first()  
    
    if not user:
        logger.error("User not found")
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    required_fields = ['title', 'year', 'image_url']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        logger.error("Missing required fields: %s", ', '.join(missing_fields))
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        new_artwork = Artwork(
            artwork_id=str(uuid.uuid4()),
            title=data['title'],
            artist=user.user_id,  
            artist_name=f"{user.first_name} {user.last_name}",  
            year=data['year'],
            image_url=data['image_url']
        )
        new_artwork.save()
        logger.info("Artwork created successfully")
        return jsonify({"message": "Artwork created successfully!"}), 201
    except ValidationError as e:
        logger.exception("Validation error during artwork creation")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.exception("Unexpected error during artwork creation")
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500

@artwork_controller.route('/delete_artwork/<string:artwork_id>', methods=['DELETE'])
@jwt_required()
def delete_artwork(artwork_id):
    logger.info("Attempting to delete artwork")
    current_user_id = get_jwt_identity()
    artwork = Artwork.objects(artwork_id=artwork_id, artist=current_user_id).first()
    
    if not artwork:
        logger.error("Artwork not found or not authorized")
        return jsonify({"error": "Artwork not found or not authorized"}), 404

    artwork.delete()
    logger.info("Artwork deleted successfully")
    return jsonify({"message": "Artwork deleted successfully"}), 200

@artwork_controller.route('/update_artwork/<string:artwork_id>', methods=['PUT'])
@jwt_required()
def update_artwork(artwork_id):
    logger.info("Attempting to update artwork")
    current_user_id = get_jwt_identity()
    artwork = Artwork.objects(artwork_id=artwork_id, artist=current_user_id).first()
    
    if not artwork:
        logger.error("Artwork not found or not authorized")
        return jsonify({"error": "Artwork not found or not authorized"}), 404
    
    data = request.get_json()
    for field in ['title', 'year', 'image_url', 'description', 'tags']:
        if field in data:
            setattr(artwork, field, data[field])
    
    artwork.save()
    logger.info("Artwork updated successfully")
    return jsonify({"message": "Artwork updated successfully"}), 200

@artwork_controller.route('/get_artwork/<string:artwork_id>', methods=['GET'])
def get_artwork(artwork_id):
    logger.info("Attempting to fetch artwork")
    artwork = Artwork.objects(artwork_id=artwork_id).first()
    
    if not artwork:
        logger.error("Artwork not found")
        return jsonify({"error": "Artwork not found"}), 404
    
    return jsonify(artwork.serialize()), 200

@artwork_controller.route('/artworks/collection/<string:collection_name>', methods=['GET'])
def get_artworks_by_collection(collection_name):
    artworks = Artwork.objects(collection=collection_name)
    if artworks:
        # Wrap the serialized artworks in an object under the 'images' key
        response = {
            "images": [artwork.serialize() for artwork in artworks]
        }
        return jsonify(response), 200
    else:
        return jsonify({"error": "No artworks found in this collection"}), 404
