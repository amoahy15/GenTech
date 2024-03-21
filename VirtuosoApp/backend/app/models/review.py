from mongoengine import Document, StringField, FloatField, DateTimeField
from datetime import datetime


# Model for Reviews
class Review(Document):
    # Fields
    reviewID = StringField(required=True,)
    userID = StringField(required=True)
    artworkID = StringField(required=True)
    rating = FloatField(required = True, min_value=0.0, max_value=5.0)
    comment = StringField()
    createdAt = DateTimeField(default=datetime.now)
