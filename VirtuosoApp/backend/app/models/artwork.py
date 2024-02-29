from mongoengine import Document, StringField, IntField, DateTimeField, DoubleField, ListField
from datetime import datetime

# Model for Artwork
class Artwork(Document):
    
        # Fields
        artworkID = StringField(required=True, unique=True)
        title = StringField(required=True)
        artist = StringField(required=True)
        year = StringField(required=True)
        image_url = image_url(required=True)
        tags = ListField(StringField(max_length=50))
        description = StringField()
        image_location = StringField()
        annotations = StringField()
        average_rating = DoubleField()
        

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
