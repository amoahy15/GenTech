from flask import Blueprint, jsonify, request
import os
import logging
import mailtrap as mt

mail_controller = Blueprint('mail_controller', __name__)
logger = logging.getLogger(__name__)

@mail_controller.route('/send_confirmation_email', methods=['POST'])
def send_confirmation_email(email, verification_url):
    logger.info(f"Preparing to send confirmation email to {email}")

    
    text = f"Thanks for signing up! Please follow this link to activate your account:\n{verification_url}\nHave fun, and don't hesitate to contact us with your feedback.\nThe Team\nhttps://yourdomain.com"
    html = f"<html><body><p>Thanks for signing up! Please follow this link to activate your account:</p><p><a href='{verification_url}'>{verification_url}</a></p><p>Have fun, and don't hesitate to contact us with your feedback.</p><p>The Team<br><a href='https://yourdomain.com'>https://yourdomain.com</a></p></body></html>"

    
    mail = mt.Mail(
        sender=mt.Address(email=os.getenv('MAIL_ADDRESS'), name="Virtuoso"),
        to=[mt.Address(email=email)],
        subject="Verify Your Email",
        text=text,
        html=html,
        category="User Verification"
    )

    
    client = mt.MailtrapClient(token=os.getenv('MAILTRAP_TOKEN'))
    try:
        client.send(mail)
        logger.info("Confirmation email sent successfully")
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        raise Exception("Failed to send email") 


