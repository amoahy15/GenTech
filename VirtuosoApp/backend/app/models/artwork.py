from mongoengine import Document, StringField, IntField, DateTimeField, FloatField, ListField
from datetime import datetime

# Model for Artwork
class Artwork(Document):
    
        # Fields
        artworkID = StringField(required=True, unique=True)
        title = StringField(required=True)
        artist = StringField(required=True)
        year = StringField(required=True)
        image_url = StringField()
        tags = ListField(StringField(max_length=50))
        description = StringField()
        image_location = StringField()
        annotations = StringField()
        average_rating = FloatField()
