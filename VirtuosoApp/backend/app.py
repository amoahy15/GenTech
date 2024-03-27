from flask import Flask
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS  # Ensure this is imported
from util.database import connect_db
from controllers.userController import user_controller
import os

def create_app():
    app = Flask(__name__)

    # Enable CORS for all domains on all routes
    CORS(app)

    # Load environment variables, if not already loaded
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')  # Ensure this is set in your .env file or environment
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)  # Configure as needed

    # Initialize JWT
    jwt = JWTManager(app)

    # Connect to the database
    connect_db(app)

    # Register Blueprints
    app.register_blueprint(user_controller, url_prefix='/api')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
