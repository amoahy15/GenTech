import logging
from flask import Blueprint, request, jsonify
from VirtuosoApp.backend.app.models.annotation import Annotation
from mongoengine.errors import ValidationError, DoesNotExist

# Initialize Blueprint for AnnotationController
annotation_controller = Blueprint('annotation_controller', __name__)

# Configure the logger
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@annotation_controller.route('/create_annotation', methods=['POST'])
def create_annotation():
    data = request.get_json()
    try:
        new_annotation = Annotation(
            artworkID=data['artworkID'],
            userID=data['userID'],
            message=data['message'],
            x_coordinate=data['x_coordinate'],
            y_coordinate=data['y_coordinate']
        )
        new_annotation.save()
        logger.info(f"Annotation created successfully by user {new_annotation.userID}.")
        return jsonify({"message": "Annotation created successfully"}), 201
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({"error": "Data validation failed"}), 400
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@annotation_controller.route('/delete_annotation/<annotation_id>', methods=['DELETE'])
def delete_annotation(annotation_id):
    try:
        annotation = Annotation.objects.get(id=annotation_id)
        annotation.delete()
        logger.info(f"Annotation {annotation_id} deleted successfully.")
        return jsonify({"message": "Annotation deleted successfully"}), 200
    except DoesNotExist:
        return jsonify({"error": "Annotation not found"}), 404
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@annotation_controller.route('/modify_annotation/<annotation_id>', methods=['PUT'])
def modify_annotation(annotation_id):
    data = request.get_json()
    try:
        annotation = Annotation.objects.get(id=annotation_id)
        annotation.message = data.get('message', annotation.message)
        annotation.x_coordinate = data.get('x_coordinate', annotation.x_coordinate)
        annotation.y_coordinate = data.get('y_coordinate', annotation.y_coordinate)
        annotation.save()
        logger.info(f"Annotation {annotation_id} modified successfully.")
        return jsonify({"message": "Annotation modified successfully"}), 200
    except DoesNotExist:
        return jsonify({"error": "Annotation not found"}), 404
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({"error": "Data validation failed"}), 400
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
