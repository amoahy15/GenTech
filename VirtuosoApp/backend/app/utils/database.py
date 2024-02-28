import mongoengine

import mongoengine
def connect_db(app):
    try:
        mongoengine.connect(
            db=app.config['MONGODB_SETTINGS']['db'],
            host=app.config['MONGODB_SETTINGS']['host'],
            alias='default'
        )
        print("Successful connection to MongoDB Atlas.")
    except Exception as e:
        print(f"An error occurred while connecting to MongoDB: {e}")
