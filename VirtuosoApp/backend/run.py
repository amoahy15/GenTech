from flask import Flask
from dotenv import load_dotenv
from VirtuosoApp.backend.app.utils.database import connect_db
from VirtuosoApp.backend.app.controllers import userController
import os

# Load environment variables
load_dotenv()

def create_app(test_config=None):
    # Create the Flask application
    app = Flask(__name__, instance_relative_config=True)

    # Default configuration that the app will use
    app.config.from_mapping(
        SECRET_KEY=os.environ.get('JWT_SECRET_KEY', 'default_secret_key'),
        DEBUG=os.environ.get('DEBUG', 'False') == 'True',
    )

    # Initialize the database with the app
    connect_db(app)

    # Initialize JWTManager
    userController.setup_jwt(app)

    # Register blueprints
    app.register_blueprint(userController.user_controller)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=app.config['DEBUG'])
