from flask import request, jsonify, Blueprint
from werkzeug.utils import secure_filename
import boto3
import os
from mongoengine import ValidationError, NotUniqueError
from models.artworkModel import Artwork
from models.userModel import User
from flask_jwt_extended import jwt_required, get_jwt_identity
import uuid

artwork_controller = Blueprint('artwork_controller', __name__)

s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)
bucket_name = os.getenv('S3_BUCKET_NAME')

@artwork_controller.route('/create_artwork', methods=['POST'])
@jwt_required()
def create_artwork():
    user_id = get_jwt_identity()
    user = User.objects(user_id=user_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    filename = secure_filename(file.filename)
    s3_folder_path = "Uploaded Artworks/" + filename
    try:
        s3_client.upload_fileobj(file, bucket_name, s3_folder_path)
        image_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_folder_path}"

        data = request.get_json()
        new_artwork = Artwork(
            artwork_id=str(uuid.uuid4()),
            title=data['title'],
            user_id=user_id,
            artist=data['artist'],
            year=data['year'],
            image_url=image_url,
            image_location=s3_folder_path
        )
        if 'tags' in data:
            new_artwork.tags = data['tags']
        if 'description' in data:
            new_artwork.description = data['description']
        new_artwork.save()
        return jsonify({"message": "Artwork created successfully!", "artwork_id": new_artwork.artwork_id, "image_url": image_url}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@artwork_controller.route('/delete_artwork/<string:artwork_id>', methods=['DELETE'])
@jwt_required()
def delete_artwork(artwork_id):
    user_id = get_jwt_identity()
    artwork = Artwork.objects(artwork_id=artwork_id, user_id=user_id).first()
    
    if not artwork:
        return jsonify({"error": "Artwork not found or not authorized"}), 404

    try:
        # Delete the image from S3
        s3_client.delete_object(Bucket=bucket_name, Key=artwork.image_location)
        artwork.delete()
        return jsonify({"message": "Artwork deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@artwork_controller.route('/update_artwork/<string:artwork_id>', methods=['PUT'])
@jwt_required()
def update_artwork(artwork_id):
    user_id = get_jwt_identity()
    artwork = Artwork.objects(artwork_id=artwork_id, user_id=user_id).first()
    
    if not artwork:
        return jsonify({"error": "Artwork not found or not authorized"}), 404
    
    data = request.get_json()
    file = request.files.get('image')
    if file and file.filename:
        filename = secure_filename(file.filename)
        s3_folder_path = "Updated Artworks/" + filename
        try:
            s3_client.upload_fileobj(file, bucket_name, s3_folder_path)
            data['image_url'] = f"https://{bucket_name}.s3.amazonaws.com/{s3_folder_path}"
            data['image_location'] = s3_folder_path
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    for field in ['title', 'year', 'image_url', 'description', 'tags']:
        if field in data:
            setattr(artwork, field, data[field])
    
    artwork.save()
    return jsonify({"message": "Artwork updated successfully"}), 200

@artwork_controller.route('/get_artwork/<string:artwork_id>', methods=['GET'])
@jwt_required()
def get_artwork(artwork_id):
    current_app.logger.info("Attempting to fetch artwork")
    artwork = Artwork.objects(artwork_id=artwork_id).first()
    
    if not artwork:
        current_app.logger.error("Artwork not found")
        return jsonify({"error": "Artwork not found"}), 404
    
    # Serialize the artwork data to return a JSON representation
    artwork_data = {
        "artwork_id": artwork.artwork_id,
        "title": artwork.title,
        "artist": artwork.artist,
        "year": artwork.year,
        "image_url": artwork.image_url,  # URL to the image stored on S3
        "description": artwork.description if artwork.description else "No description provided",
        "tags": artwork.tags,
        "average_rating": artwork.average_rating if artwork.average_rating else "Not rated",
        "genre": artwork.genre if artwork.genre else "No genre specified"
    }
    return jsonify(artwork_data), 200

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

@artwork_controller.route('/add_annotation/<string:artwork_id>', methods=['POST'])
@jwt_required()
def add_annotation(artwork_id):
    user_id = get_jwt_identity()
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
            artwork_id=artwork_id,
            user_id=user_id,
            message=data['message'],
            x_coordinate=data['x_coordinate'],
            y_coordinate=data['y_coordinate'],
            annotation_id=str(uuid.uuid4())
        ).save()

        artwork.update(push__annotations=new_annotation)
        artwork.reload()

        return jsonify({"message": "Annotation added successfully", "annotation": new_annotation}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Unexpected error", "details": str(e)}), 500
