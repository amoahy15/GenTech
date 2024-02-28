from flask import Flask
from config import Config
from VirtuosoApp.backend.app.utils.database import connect_db

app = Flask(__name__)
app.config.from_object(Config)

# Initialize the database
connect_db(app)


if __name__ == '__main__':
    app.run(debug=True)
