from mongoengine import Document, StringField, IntField, DateTimeField, DoubleField
from datetime import datetime


# Model for Reviews
class Reviews(Document):
    # Fields
    reviewID = StringField(required=True, unique=True)
    userID = StringField(required=True)
    artworkID = StringField(required=True)
    rating = DoubleField(required =True, min_value=0.0, max_value=5.0)
    comment = StringField()
    createdAt = DateTimeField(default=datetime.now)
