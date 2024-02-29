from mongoengine import Document, StringField, IntField, DateTimeField
from datetime import datetime


# Model for Reviews
class Reviews(Document):
    # Fields
    reviewID = StringField(required=True, unique=True)
    userID = StringField(required=True)
    artworkID = StringField(required=True)
    rating = IntField(min_value=1, max_value=5)
    comment = StringField()
    createdAt = DateTimeField(default=datetime.now)

    meta = {
        'collection': 'reviews'
    }
