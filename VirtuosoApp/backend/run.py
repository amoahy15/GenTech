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
        SECRET_KEY=os.environ.get('SECRET_KEY', 'default_secret_key'),
        DEBUG=os.environ.get('DEBUG', 'False') == 'True',
    )

    # Load the instance config, if it exists, when not testing
    if test_config is None:
        # Load the configuration if it exists in the instance folder
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Load the test config if passed in
        app.config.from_mapping(test_config)

    # Initialize the database with the app
    connect_db(app)

    # Register blueprints
    app.register_blueprint(userController.user_controller)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=app.config['DEBUG'])
