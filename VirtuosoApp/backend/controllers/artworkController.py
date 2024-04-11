from flask import request, jsonify, Blueprint, current_app
from mongoengine import NotUniqueError, ValidationError
from models.artworkModel import Artwork
from models.userModel import User
from models.annotationModel import Annotation
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import uuid
import logging
import pandas as pd
import os

image_data_path = os.path.join(current_app.root_path, 'data', 'published_images.csv')
df_images = pd.read_csv(image_data_path)
image_dict = df_images.set_index('depictstmsobjectid')['iiifurl'].to_dict()


artwork_controller = Blueprint('artwork_controller', __name__)

@artwork_controller.route('/create_artwork', methods=['POST'])
@jwt_required()  
def create_artwork():
    current_app.logger.info("Attempting to create artwork")
    current_user_id = get_jwt_identity()  
    user = User.objects(user_id=current_user_id).first()  
    
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
            artist=user.user_id,  
            artist_name=f"{user.first_name} {user.last_name}",  
            year=data['year'],
            image_url=data['image_url']
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
@jwt_required()  
def get_artwork(artwork_id):
    current_app.logger.info("Attempting to fetch artwork")
    artwork = Artwork.objects(artwork_id=artwork_id).first()
    
    if not artwork:
        current_app.logger.error("Artwork not found")
        return jsonify({"error": "Artwork not found"}), 404
    
    return jsonify(artwork.serialize()), 200

@artwork_controller.route('/artworks/collection/<string:collection_name>', methods=['GET'])
@jwt_required()  
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

@artwork_controller.route('/get_artwork_url/<string:artwork_id>', methods=['GET'])
@jwt_required()  
def get_artwork_url(artwork_id):
    current_app.logger.info("Attempting to fetch artwork URL")
    artwork = Artwork.objects(artwork_id=artwork_id).first()
    
    if not artwork:
        current_app.logger.error("Artwork not found")
        return jsonify({"error": "Artwork not found"}), 404

    # Assuming the image_url field contains the direct URL to the image in S3
    image_url = artwork.image_url
    
    return jsonify({"image_url": image_url}), 200

@artwork_controller.route('/add_annotation/<string:artwork_id>', methods=['POST'])
@jwt_required()
def add_annotation(artwork_id):
    current_user_id = get_jwt_identity()
    artwork = Artwork.objects(artwork_id=artwork_id).first()
    
    if not artwork:
        current_app.logger.error("Artwork not found")
        return jsonify({"error": "Artwork not found"}), 404

    data = request.get_json()
    required_fields = ['message', 'x_coordinate', 'y_coordinate']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        new_annotation = Annotation(
            artworkID=artwork_id,
            userID=current_user_id,
            message=data['message'],
            x_coordinate=data['x_coordinate'],
            y_coordinate=data['y_coordinate'],
            annotationID=str(uuid.uuid4())  # Generate a unique ID for the annotation
        ).save()

        artwork.update(push__annotations=new_annotation)
        artwork.reload()

        return jsonify({"message": "Annotation added successfully", "annotation": new_annotation}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Unexpected error", "details": str(e)}), 500

@artwork_controller.route('/get_image_url/<int:artwork_id>', methods=['GET'])
@jwt_required()
def get_image_url(artwork_id):
    """Fetch the IIIF image URL for a given artwork ID."""
    try:
        image_url = image_dict[artwork_id]
        return jsonify({'image_url': image_url}), 200
    except KeyError:
        return jsonify({'error': 'Artwork image not found'}), 404
