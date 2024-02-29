from mongoengine import Document, StringField, IntField, DateTimeField
from datetime import datetime

# Model for Artwork
class Artwork(Document):
    
        # Fields
        artworkID = StringField(required=True, unique=True)
        title = StringField(required=True)
        artist = StringField(required=True)
        year = IntField(required=True)
        image_url = image_url(required=True)
        description = StringField()
        image_location = StringField()
        annotations = StringField()

meta = {
        'collection': 'Artwork'
    }

    def serialize(self):
        return {
            'artworkID' : self.artworkID
            'title' : self.title
            'artist' : self.artist
            'year' : self.year
            'image_url' : self.image_url
            'description' : self.description 
            'image_location' : self.image_location
            'annotations' : self.annotations
        }
