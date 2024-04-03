from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine import NotUniqueError, ValidationError
from models.artworkModel import Artwork

artwork_controller = Blueprint('artwork_controller', __name__)


@artwork_controller.route('/artwork', methods=['POST'])
@jwt_required()  # Require authentication to create artwork
def create_artwork():
    # Optionally, get the current user's ID if you need to associate the artwork with the user
    # current_user_id = get_jwt_identity()

    data = request.get_json()
    required_fields = ['artworkID', 'title', 'artist', 'year', 'image_url']
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
        return jsonify({"message": "Artwork created successfully!"}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500


@artwork_controller.route('/artwork/<string:artworkID>', methods=['GET'])
def get_artwork(artworkID):
    artwork = Artwork.objects(artworkID=artworkID).first()
    if artwork:
        return jsonify(artwork.to_mongo().to_dict()), 200
    else:
        return jsonify({"error": "Artwork not found"}), 404


@artwork_controller.route('/artwork/<string:artworkID>', methods=['PUT'])
@jwt_required()  # Require authentication to update artwork
def update_artwork(artworkID):
    # current_user_id = get_jwt_identity()
    data = request.get_json()
    try:
        artwork = Artwork.objects(artworkID=artworkID).first()
        if not artwork:
            return jsonify({"error": "Artwork not found"}), 404

        for field in ['title', 'artist', 'tags', 'description', 'image_location']:
            if field in data:
                setattr(artwork, field, data[field])

        artwork.save()
        return jsonify({"message": "Artwork updated successfully"}), 200
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500


@artwork_controller.route('/artwork/<string:artworkID>', methods=['DELETE'])
@jwt_required()  # Require authentication to delete artwork
def delete_artwork(artworkID):
    # current_user_id = get_jwt_identity()
    artwork = Artwork.objects(artworkID=artworkID).first()
    if artwork:
        artwork.delete()
        return jsonify({"message": "Artwork deleted successfully"}), 200
    else:
        return jsonify({"error": "Artwork not found"}), 404
