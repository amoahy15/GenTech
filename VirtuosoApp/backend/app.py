# GenTech/Virtusio/backend/app/app.py
from flask import Flask
from app.utils.database import initialize_db


def create_app():
    app = Flask(__name__)
    initialize_db()


    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
