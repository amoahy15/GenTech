# GenTech/Virtusio/backend/app/utils/database.py
from mongoengine import connect
from VirtuosoApp.backend.config import Config

import sys
def initialize_db():
    try:
        connect(host=Config.MONGODB_URI)
        print("Database connection established successfully.")
    except Exception as e:
        print(f"Failed to connect to the database. Error: {e}", file=sys.stderr)
