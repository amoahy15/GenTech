from mongoengine import Document, FloatField, StringField, DateTimeField, ReferenceField
from datetime import datetime
from .userModel import User
import uuid

#see docs
class Review(Document):
    artwork_id = StringField(required=True)
    user_id = StringField(required=True)
    rating = FloatField(required=True, min_value=0, max_value=5)
    comment = StringField()
    created_at = DateTimeField(default=datetime.now)
    
    def serialize(self):
        return {
            "user_id": self.user_id,
            #"user_displayName": self.user.user_name,
            "artwork_id": self.artwork_id,
            "rating": self.rating,
            "comment": self.comment,
            # Format the created_at datetime to ISO 8601 string
            "created_at": self.created_at.isoformat()
        }