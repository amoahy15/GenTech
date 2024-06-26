from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS
from util.database import connect_db
from controllers.userController import user_controller
from controllers.reviewController import review_controller
from controllers.artworkController import artwork_controller
from controllers.annotationController import annotation_controller
from controllers.s3controller import s3_controller
from controllers.mailController import mail_controller
from dotenv import load_dotenv

import os
import logging


load_dotenv() 

app = Flask(__name__)
connect_db(app)

jwt = JWTManager(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}}, allow_headers=["Authorization", "Content-Type"])

app.config['DEBUG'] = True
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)


app.register_blueprint(user_controller, url_prefix='/api/user')
app.register_blueprint(artwork_controller, url_prefix='/api/artwork')
app.register_blueprint(review_controller, url_prefix='/api/review')
app.register_blueprint(annotation_controller, url_prefix='/api/annotations')
app.register_blueprint(s3_controller, url_prefix='/api/s3')
app.register_blueprint(mail_controller, url_prefix='/api/mail')

gunicorn_logger = logging.getLogger('gunicorn.error')
app.logger.handlers = gunicorn_logger.handlers
app.logger.setLevel(gunicorn_logger.level)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5100)
