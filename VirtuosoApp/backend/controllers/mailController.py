from flask import Blueprint, jsonify, request, current_app
from jinja2 import Environment, FileSystemLoader
import os
import logging
import mailtrap as mt


mail_controller = Blueprint('mail_controller', __name__)
logging.basicConfig(level=logging.DEBUG)

template_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../templates')
template_dir2 =os.path.join(os.path.dirname(os.path.abspath(__file__)), './templates')
env = Environment(loader=FileSystemLoader(template_dir))

@mail_controller.route('/send_confirmation_email', methods=['POST'])
def send_confirmation_email(email, verification_url):
    email = email
    verification_url = verification_url
    current_app.logger.info(f"Preparing to send confirmation email to {email}")
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
        current_app.logger.info("Confirmation email sent successfully")
        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        current_app.logger.error(f"Failed to send email: {str(e)}")
        return jsonify({'error': 'Failed to send email', 'details': str(e)}), 500

def render_email_template(verification_url):
    template = env.get_template('confirm_email_template.html')
    return template.render(verification_url=verification_url)

@mail_controller.route('/send_password_reset_email', methods=['POST'])
def send_password_reset_email(email, reset_url):
    email = email
    reset_url = reset_url
    
    current_app.logger.info(f"Preparing to send password reset email to {email}")
    html_content = render_password_email_template(reset_url)
    
    mail = mt.Mail(
        sender=mt.Address(email=os.getenv('MAIL_ADDRESS'), name="Virtuoso"),
        to=[mt.Address(email=email)],
        subject="Password Reset Request",
        text="Please use the link below to reset your password.",
        html=html_content,
        category="Password Reset"
    )
    
    client = mt.MailtrapClient(token=os.getenv('MAILTRAP_TOKEN'))
    try:
        client.send(mail)
        current_app.logger.info("Password reset email sent successfully")
        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        current_app.logger.error(f"Failed to send email: {str(e)}")
        return jsonify({'error': 'Failed to send email', 'details': str(e)}), 500

def render_password_email_template(reset_url):
    template = env.get_template('reset_password_template.html')
    return template.render(reset_url=reset_url)