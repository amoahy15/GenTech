from flask import Blueprint, jsonify, current_app, request
from werkzeug.utils import secure_filename
import boto3
import os
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.artworkModel import Artwork
from models.userModel import User
import uuid

# Blueprint setup for handling S3-related routes.
s3_controller = Blueprint('s3_controller', __name__)

# Configuring AWS S3 client with credentials and region from environment variables.
s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)
# S3 bucket name retrieved from environment variables.
bucket_name = os.getenv('S3_BUCKET_NAME')

# Allowed file types for upload.
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}

# Function to check if file extension is allowed.
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to handle image uploads to S3.
@s3_controller.route('/upload', methods=['POST'])
def upload_image():
    # Check if the post request has the file part.
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    # Check if the file has a filename.
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Secure the filename and prepare for upload.

        # Set the S3 folder path for the uploaded image.
        s3_folder_path = "User Created Images/" + filename
        try:
            # Upload the file to S3 without saving it locally.
            s3_client.upload_fileobj(file, bucket_name, s3_folder_path)
            # Generate the URL for the uploaded file.
            file_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_folder_path}"
            return jsonify({'message': 'File uploaded successfully', 'url': file_url}), 200
        except Exception as e:
            # Handle exceptions during upload.
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'File type not allowed'}), 400
    
# Function to retrieve image URLs from a specified folder in S3.
def get_images_from_folder(folder_prefix):
    try:
        images_urls = []
        # Create a paginator to handle large sets of objects.
        paginator = s3_client.get_paginator('list_objects_v2')
        pages = paginator.paginate(Bucket=bucket_name, Prefix=folder_prefix)

        for page in pages:
            if 'Contents' in page:
                for obj in page['Contents']:
                    # Check if the object is an image and collect its URL.
                    if obj['Key'].lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                        images_urls.append(f"https://{bucket_name}.s3.amazonaws.com/{obj['Key']}")
        return images_urls
    except Exception as e:
        # Handle exceptions during retrieval.
        return {'error': str(e)}

# Routes to retrieve images by category from S3.
@s3_controller.route('/images/paintings')
def get_paintings():
    # Return images from the "Paintings/" folder.
    return jsonify(get_images_from_folder('Paintings/'))

@s3_controller.route('/images/photographs')
def get_photographs():
    # Return images from the "Photographs/" folder.
    return jsonify(get_images_from_folder('Photographs/'))

@s3_controller.route('/images/sculptures')
def get_sculptures():
    # Return images from the "Sculptures And Models/" folder.
    return jsonify(get_images_from_folder('Sculptures And Models/'))

@s3_controller.route('/images/trending')
def get_trending():
    # Return images from the "Trending/" folder.
    return jsonify(get_images_from_folder('Trending/'))

@s3_controller.route('/images/all')
def get_all_images():
    # Return all images from the S3 bucket.
    return jsonify(get_images_from_folder(''))
