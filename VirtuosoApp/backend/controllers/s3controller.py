from flask import Blueprint, jsonify, current_app, request
from werkzeug.utils import secure_filename
import boto3
import os


s3_controller = Blueprint('s3_controller', __name__)
s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)
bucket_name = os.getenv('S3_BUCKET_NAME')

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@s3_controller.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Optionally, save file to a local directory for further processing before uploading
        # file.save(os.path.join('/path/to/the/uploads', filename))
        
        # Include the folder path in the key for S3
        s3_folder_path = "User Created Images/" + filename
        try:
            # In-memory upload to S3 without saving file locally
            s3_client.upload_fileobj(file, bucket_name, s3_folder_path)
            file_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_folder_path}"
            return jsonify({'message': 'File uploaded successfully', 'url': file_url}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'File type not allowed'}), 400
    
def get_images_from_folder(folder_prefix):
    try:
        images_urls = []
        paginator = s3_client.get_paginator('list_objects_v2')
        pages = paginator.paginate(Bucket=bucket_name, Prefix=folder_prefix)

        for page in pages:
            if 'Contents' in page:
                for obj in page['Contents']:
                    if obj['Key'].lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                        images_urls.append(f"https://{bucket_name}.s3.amazonaws.com/{obj['Key']}")
        return images_urls
    except Exception as e:
        return {'error': str(e)}

@s3_controller.route('/images/paintings')
def get_paintings():
    return jsonify(get_images_from_folder('Paintings/'))

@s3_controller.route('/images/photographs')
def get_photographs():
    return jsonify(get_images_from_folder('Photographs/'))

@s3_controller.route('/images/sculptures')
def get_sculptures():
    return jsonify(get_images_from_folder('Sculptures And Models/'))

@s3_controller.route('/images/trending')
def get_trending():
    return jsonify(get_images_from_folder('Trending/'))

@s3_controller.route('/images/all')
def get_all_images():
    return jsonify(get_images_from_folder(''))
