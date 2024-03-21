import logging
from flask import request, jsonify, Blueprint
from mongoengine import NotUniqueError, ValidationError
from VirtuosoApp.backend.app.models.artwork import Artwork

artwork_controller = Blueprint('artwork_controller', __name__)

# Configure the logger
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@artwork_controller.route('/artwork', methods=['POST'])
def create_artwork():
    data = request.get_json()

    # Required Fields
    required_fields = ['artworkID', 'title', 'artist', 'year', 'image_url']

    # Check if all required fields are present
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        new_artwork = Artwork(
            artworkID=data['artworkID'],
            title=data['title'],
            artist=data['artist'],
            year=data['year'],
            image_url=data['image_url']
        )
        new_artwork.save()
        logger.info("Artwork created successfully!")
        return jsonify({"message": "Artwork created successfully!"}), 201
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500


@artwork_controller.route('/artwork/<artworkID>', methods=['GET'])
def get_artwork(artworkID):
    artwork = Artwork.objects(artworkID=artworkID).first()
    if artwork:
        logger.info("Artwork found")
        return jsonify(artwork.serialize())
    else:
        logger.error("Artwork not found")
        return jsonify({"error": "Artwork not found"}), 404


@artwork_controller.route('/artwork/<artworkID>', methods=['PUT'])
def update_artwork(artworkID):
    data = request.get_json()
    try:
        artwork = Artwork.objects(artworkID=artworkID).first()
        if not artwork:
            logger.error("Artwork not found")
            return jsonify({"error": "Artwork not found"}), 404

        # Update fields if they exist in the request data
        if 'title' in data:
            artwork.title = data['title']
        if 'artist' in data:
            artwork.artist = data['artist']
        if 'tags' in data:
            artwork.tags = data['tags']
        if 'description' in data:
            artwork.description = data['description']
        if 'image_location' in data:
            artwork.image_location = data['image_location']

        artwork.save()
        logger.info("Artwork updated successfully")
        return jsonify({"message": "Artwork updated successfully"}), 200

    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500

@artwork_controller.route('/artwork/<artworkID>', methods=['DELETE'])
def delete_artwork(artworkID):
    artwork = Artwork.objects(artworkID=artworkID).first()
    if artwork:
        artwork.delete()
        logger.info("Artwork deleted successfully")
        return jsonify({"message": "Artwork deleted successfully"})
    else:
        logger.error("Artwork not found")
        return jsonify({"error": "Artwork not found"}), 404
