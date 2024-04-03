from flask import Flask, request, send_file
import boto3
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

# Configure your S3 Bucket Name here
BUCKET_NAME = 'gentech.carouselimages'

@app.route('/')
def hello_world():
    return 'Hello, World!'

def list_files(bucket_name):
    s3 = boto3.client('s3')
    contents = []
    try:
        for item in s3.list_objects(Bucket=bucket_name)['Contents']:
            contents.append(item['Key'])
    except Exception as e:
        print(e)
        return None
    return contents

@app.route('/files')
def files():
    files = list_files(BUCKET_NAME)
    if files is not None:
        return {"files": files}
    else:
        return {"error": "Unable to fetch files"}, 500

def upload_file_to_s3(file, bucket_name, acl="public-read"):
    """
    Uploads file to S3
    :param file: File to upload
    :param bucket_name: S3 bucket name
    :param acl: Access control list
    """
    s3 = boto3.client('s3')
    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        print(e)
        return False
    return True

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return {"error": "No file part"}, 400
    file = request.files['file']
    if file.filename == '':
        return {"error": "No selected file"}, 400
    if file:
        success = upload_file_to_s3(file, BUCKET_NAME)
        if success:
            return {"message": "File uploaded successfully"}, 200
        else:
            return {"error": "Upload failed"}, 500

def download_file_from_s3(file_name, bucket_name):
    """
    Download file from S3
    :param file_name: Name of the file to download
    :param bucket_name: S3 bucket name
    """
    s3 = boto3.client('s3')
    file_path = f"temp/{secure_filename(file_name)}"
    try:
        s3.download_file(bucket_name, file_name, file_path)
    except Exception as e:
        print(e)
        return None
    return file_path

@app.route('/download/<filename>')
def download(filename):
    file_path = download_file_from_s3(filename, BUCKET_NAME)
    if file_path:
        return send_file(file_path, as_attachment=True)
    else:
        return {"error": "Download failed"}, 500

if __name__ == '__main__':
    # Create a directory to temporarily store files for download
    if not os.path.exists('temp'):
        os.makedirs('temp')
    app.run(debug=True, port=5001)


#curl http://localhost:5000/files