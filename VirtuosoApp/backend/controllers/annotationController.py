from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine.errors import ValidationError, DoesNotExist
from models.annotationModel import Annotation
from models.userModel import User
import datetime
import uuid

annotation_controller = Blueprint('annotation_controller', __name__)

@annotation_controller.route('/annotation', methods=['POST'])
@jwt_required()
def create_annotation():
    user_id = get_jwt_identity()
    data = request.get_json()
    required_fields = ['artworkID', 'message', 'x_coordinate', 'y_coordinate']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
    try:
        uniqueAnnotationID = str(uuid.uuid4())
        new_annotation = Annotation(
            userID=user_id,
            annotationID = uniqueAnnotationID,
            artworkID=data['artworkID'],
            message=data['message'],
            x_coordinate=data['x_coordinate'],
            y_coordinate=data['y_coordinate'],
            createdAt=datetime.datetime.now()
        )
        new_annotation.save()

        return jsonify({"message": "Annotation created successfully!", "annotationID": str(new_annotation.id)}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500


@annotation_controller.route('/annotations/<annotation_id>', methods=['GET'])
def get_annotation(annotation_id):
    annotation = Annotation.objects(id=annotation_id).first()
    if annotation:
        annotation_data = {
            "annotationID": annotation.id,
            "userID": annotation.userID,
        }
        return jsonify(annotation_data)
    else:
        return jsonify({"error": "Annotation not found"}), 404

@annotation_controller.route('/annotations/<annotation_id>', methods=['DELETE'])
@jwt_required()
def delete_annotation(annotation_id):
    user_id = get_jwt_identity()
    annotation = Annotation.objects(id=annotation_id, userID=user_id).first()
    if annotation:
        annotation.delete()
        return jsonify({"message": "Annotation deleted successfully"})
    else:
        return jsonify({"error": "Annotation not found or access denied"}), 404


@annotation_controller.route('/artwork/<artwork_id>', methods=['GET'])
def get_annotations(artwork_id):
    try:
        annotations = Annotation.objects(artworkID = artwork_id)
        annotations_list = [{
            'annotationID': str(annotation.id),
            'userID': str(annotation.userID),
            'message': annotation.message,
            'x_coordinate': annotation.x_coordinate,
            'y_coordinate': annotation.y_coordinate,
        } for annotation in annotations]

        return jsonify(annotations_list)
    except DoesNotExist:
        return jsonify({"error": "Artwork not found"}), 404
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500