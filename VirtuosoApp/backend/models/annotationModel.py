from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class Annotation(Document):
    annotation_id = StringField(required=True, unique=True)
    artwork_id  = StringField(required=True)
    user_id = StringField(required=True)
    message = StringField(required=True)
    x_coordinate = StringField(required=True)
    y_coordinate = StringField(required=True)
    createdAt = DateTimeField(default=datetime.now)
