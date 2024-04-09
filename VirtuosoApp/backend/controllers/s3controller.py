from flask import Blueprint, jsonify
import boto3
import os

s3_controller = Blueprint('s3_controller', __name__)

@s3_controller.route('/images')
def get_images():
    s3_client = boto3.client(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_REGION')
    )
    bucket_name = os.getenv('S3_BUCKET_NAME')

    try:
        images_urls = []
        paginator = s3_client.get_paginator('list_objects_v2')
        pages = paginator.paginate(Bucket=bucket_name)

        for page in pages:
            for obj in page['Contents']:
                if obj['Key'].lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                    images_urls.append(f"https://{bucket_name}.s3.amazonaws.com/{obj['Key']}")

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(images_urls)
