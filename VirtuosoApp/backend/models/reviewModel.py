from mongoengine import Document, FloatField, StringField, DateTimeField, ReferenceField
from datetime import datetime
from .userModel import User
import uuid

#see docs
class Review(Document):
    review_id = StringField(primary_key=True, default=lambda: str(uuid.uuid4()))
    artwork_id  = ReferenceField('Artwork', required=True)
    user_id = ReferenceField('User', required=True)
    rating = FloatField(required=True, min_value=0, max_value=5)
    comment = StringField()
    created_at = DateTimeField(default=datetime.now)
    
    def serialize(self):
        return {
            "review_id": self.review_id,
            "user_id": str(self.user.id),
            "user_displayName": self.user.user_name,
            "artwork_id": str(self.artwork.artwork_id),
            "rating": self.rating,
            "comment": self.comment,
            # Format the created_at datetime to ISO 8601 string
            "created_at": self.created_at.isoformat()
        }
