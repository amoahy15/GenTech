from flask import Blueprint, jsonify, request
from jinja2 import Environment, FileSystemLoader
import os
import logging
import mailtrap as mt


mail_controller = Blueprint('mail_controller', __name__)
logger = logging.getLogger(__name__)

template_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../templates')
env = Environment(loader=FileSystemLoader(template_dir))

@mail_controller.route('/send_confirmation_email', methods=['POST'])
def send_confirmation_email(email, verification_url):
    data = request.get_json()
    if not data or 'email' not in data or 'verification_url' not in data:
        return jsonify({'error': 'Missing email or verification URL'}), 400

    email = data['email']
    verification_url = data['verification_url']
    
    logger.info(f"Preparing to send confirmation email to {email}")
    html_content = render_email_template(verification_url)
    
    mail = mt.Mail(
        sender=mt.Address(email=os.getenv('MAIL_ADDRESS'), name="Virtuoso"),
        to=[mt.Address(email=email)],
        subject="Verify Your Email",
        text="Please check your email for the verification link.",
        html=html_content,
        category="User Verification"
    )
    client = mt.MailtrapClient(token=os.getenv('MAILTRAP_TOKEN'))
    try:
        client.send(mail)
        logger.info("Confirmation email sent successfully")
        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return jsonify({'error': 'Failed to send email', 'details': str(e)}), 500

def render_email_template(verification_url):
    template = env.get_template('template.html')
    return template.render(verification_url=verification_url)