from flask import request, jsonify, Blueprint
from mongoengine import NotUniqueError, ValidationError
from VirtuosoApp.backend.app.models.artwork import Artwork

reviewController = Blueprint('artworkController', __name__)

@artworkController.route('/artwork', methods=['POST'])
def createArtwork():
    data = request.get_json()

    # Required Fields
    required_fields = ['artworkID', 'title', 'artist', 'year', 'image_url']

    # Check if all required fields are present
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        newArtwork = Artwork(
         artworkID=data['artworkID']
         title=data['title']
         artist=data['artist']
         year=data['year']
         image_url=data['image_url']

        )
        newArtwork.save()
        return jsonify({"message": "Artwork created successfully!"}), 201
        except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
  return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500


@artworkController.route('/artwork', methods=['GET'])
    def artwork(artworkID):
        artwork = artwork.objects(artworkID=artworkID).first()
        if artwork:
            return jsonify(artwork.serialize())
        else:
            return jsonify({"error": "Artwork not found"}), 404


@artworkController.route('/artwork/<artworkID>', methods=['PUT'])
    def updateArtwork(artworkID):
        data = request.get_json()

            try:
                artwork = Artwork.objects(artworkID=artworkID).first()
                if not artwork:
                    return jsonify({"error": "Artwork not found"}), 404

                # Update fields if they exist in the request data
                if 'title' in data:
                    artwork.title = data['title']
                if 'artist' in data:
                    artwork.artist = data['artist']
                if 'tags' in data:
                    artwork.tags = data['tags']
                if 'description' in data:
                    artwork.description = data['description']
                if 'image_location' in data:
                    artwork.image_location = data['image_location']

                artwork.save()
                return jsonify({"message": "Artwork updated successfully"}), 200

            except ValidationError as e:
                return jsonify({"error": str(e)}), 400
            except Exception as e:
                return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500

@artworkController.route('/artwork/<artworkID>', methods=['DELETE'])
   def delete_artwork(artworkID):
        artwork = artwork.objects(artworkID=artworkID).first()
         if artwork:
                artwork.delete()
                return jsonify({"message": "Artwork deleted successfully"})
        else:
                return jsonify({"error": "Artwork not found"}), 404
