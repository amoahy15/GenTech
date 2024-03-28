from mongoengine import Document, StringField, DateTimeField, FloatField
from datetime import datetime

class Review(Document):
    review_id = StringField(required=True, unique=True)
    user_id = StringField(required=True)
    artwork_id = StringField(required=True)
    rating = FloatField(required=True, min_value=0.0, max_value=5.0)
    comment = StringField()
    created_at = DateTimeField(default=datetime.now)

    def serialize(self):
        return {
            "review_id": self.review_id,
            "user_id": self.user_id,
            "artwork_id": self.artwork_id,
            "rating": self.rating,
            "comment": self.comment,
            "created_at": self.created_at.isoformat()
        }
