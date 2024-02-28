from flask import Flask
from dotenv import load_dotenv
from VirtuosoApp.backend.app.utils.database import connect_db
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Directly set Flask configuration from environment variables if needed
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'default_secret_key')
app.config['DEBUG'] = os.environ.get('DEBUG', 'False') == 'True'

# Initialize the database
connect_db(app)

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
