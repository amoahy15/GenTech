from mongoengine import Document, StringField, ListField, FloatField

class Artwork(Document):
    artwork_id = StringField(required=True, unique=True)
    title = StringField(required=True)
    artist = StringField(required=True)
    year = StringField(required=True)
    image_url = StringField(required=True)
    tags = ListField(StringField(max_length=50))
    description = StringField()
    image_location = StringField()
    annotations = StringField()
    average_rating = FloatField()
    genre = StringField()

    def serialize(self):
        return {
            "artwork_id": self.artwork_id,
            "title": self.title,
            "artist": self.artist,
            "year": self.year,
            "image_url": self.image_url,
            "tags": self.tags,
            "description": self.description,
            "image_location": self.image_location,
            "annotations": self.annotations,
            "average_rating": self.average_rating,
            "genre": self.genre
        }
