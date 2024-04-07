import mongoengine
from dotenv import load_dotenv
import os

def connect_db(app):
    load_dotenv()
    try:
        mongoengine.connect(
            db=os.environ.get("MONGODB_DATABASE"),
            host=os.environ.get("MONGODB_URI"),
            alias='default'
        )
        print(f"Successful connection to MongoDB Atlas at {os.environ.get("MONGODB_URI")}.")
    except Exception as e:
        print(f"An error occurred while connecting to MongoDB: {e}")