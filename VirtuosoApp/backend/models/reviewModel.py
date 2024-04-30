from mongoengine import Document, FloatField, StringField, DateTimeField, ReferenceField, IntField, ListField
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
    like_count = IntField(default=0)
    liked_by = ListField(ReferenceField('User', required=True))
    
    def serialize(self):
        return {
            "review_id": self.review_id,
            "user_id": str(self.user_id),
            "artwork_id": str(self.artwork_id),
            "rating": self.rating,
            "comment": self.comment,
            "created_at": self.created_at.isoformat(),
            "like_count": self.like_count

        }