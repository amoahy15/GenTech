from flask import Blueprint, request, jsonify, current_app
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
    required_fields = ['artwork_id', 'message', 'x_coordinate', 'y_coordinate']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
    try:
        unique_annotation_id = str(uuid.uuid4())
        new_annotation = Annotation(
            user_id=user_id,
            annotation_id=unique_annotation_id,
            artwork_id=data['artwork_id'],
            message=data['message'],
            x_coordinate=data['x_coordinate'],
            y_coordinate=data['y_coordinate'],
        )
        new_annotation.save()

        return jsonify({"message": "Annotation created successfully!", "annotation_id": str(new_annotation.id)}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500

@annotation_controller.route('/annotations/<annotation_id>', methods=['GET'])
def get_annotation(annotation_id):
    annotation = Annotation.objects(id=annotation_id).first()
    if annotation:
        user = User.objects(user_id=annotation.user_id).first()
        if user:
            annotation_data = {
                "annotation_id": str(annotation.id),
                "user_id": annotation.user_id,
                "user_name": user.user_name,
                "profile_picture": user.profile_picture
            }
            return jsonify(annotation_data)
        else:
            return jsonify({"error": "User not found"}), 404
    else:
        return jsonify({"error": "Annotation not found"}), 404

@annotation_controller.route('/annotations/<annotation_id>', methods=['DELETE'])
@jwt_required()
def delete_annotation(annotation_id):
    user_id = get_jwt_identity()
    annotation = Annotation.objects(id=annotation_id, user_id=user_id).first()
    if annotation:
        annotation.delete()
        return jsonify({"message": "Annotation deleted successfully"})
    else:
        return jsonify({"error": "Annotation not found or access denied"}), 404

@annotation_controller.route('/artwork/<artwork_id>/annotations', methods=['GET'])
@jwt_required()
def get_annotations_for_artwork(artwork_id):
    #took out token req.
    try:
        annotations = Annotation.objects(artwork_id=artwork_id)
        annotations_list = []
        for annotation in annotations:
            user = User.objects(user_id=annotation.user_id).first()
            if user:
                annotations_list.append({
                    'annotation_id': str(annotation.id),
                    'user_id': str(annotation.user_id),
                    'user_name': user.user_name,
                    'profile_picture': user.profile_picture,
                    'message': annotation.message,
                    'x_coordinate': annotation.x_coordinate,
                    'y_coordinate': annotation.y_coordinate,
                })
        return jsonify(annotations_list), 200
    except DoesNotExist:
        return jsonify({"error": "Artwork not found"}), 404
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500