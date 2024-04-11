from flask import Blueprint, jsonify
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
