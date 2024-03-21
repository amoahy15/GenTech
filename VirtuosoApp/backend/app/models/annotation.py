from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class Annotation(Document):
    artworkID = StringField(required=True)
    userID = StringField(required=True)
    message = StringField(required=True)
    x_coordinate = StringField(required=True)
    y_coordinate = StringField(required=True)
    createdAt = DateTimeField(default=datetime.now)
