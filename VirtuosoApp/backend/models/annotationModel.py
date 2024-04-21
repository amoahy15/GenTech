from mongoengine import Document, StringField, DateTimeField, IntField, ListField, ReferenceField
from datetime import datetime
from .userModel import User

class Annotation(Document):
    annotation_id = StringField(required=True, unique=True)
    artwork_id = StringField(required=True)
    user_id = StringField(required=True)
    message = StringField(required=True)
    x_coordinate = StringField(required=True)
    y_coordinate = StringField(required=True)
    createdAt = DateTimeField(default=datetime.now)
    like_count = IntField(default=0)
    liked_by = ListField(ReferenceField('User', required=True))
