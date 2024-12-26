from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Email configuration
EMAIL_ADDRESS = "celebrationroomvit@gmail.com"
EMAIL_PASSWORD = "igkf jtma gccj jami"  # App-specific password
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

def format_room_type(room_type):
    room_types = {
        "LH": "Ladies Hostel Room",
        "MH": "Men's Hostel Room",
        "GN": "General Room"
    }
    return room_types.get(room_type, room_type)

def send_email(to_email, subject, booking_details):
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = to_email
        msg['Subject'] = subject

        # Generate a simple transaction ID (you might want to implement a more sophisticated system)
        transaction_id = f"TRX-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        # Format the booking time
        booking_time = datetime.fromtimestamp(booking_details['timestamp']/1000).strftime('%Y-%m-%d %H:%M:%S')
        
        # Create email body with booking details
        body = f"""
Dear {booking_details['userEmail']},

Your Celebration Room booking has been confirmed!

Booking Details:
---------------
Room Type: {format_room_type(booking_details['roomType'])}
Date: {booking_details['bookingDate']}
Time Slot: {booking_details['timeSlot']}
User ID: {booking_details['userId']}
Transaction ID: {transaction_id}
Booking Time: {booking_time}

Important Information:
--------------------
1. Please save this email for your records
2. You must present this confirmation email at the venue
3. Arrive 5 minutes before your scheduled time
4. Maximum duration: 1 hour
5. Please follow all room usage guidelines

Cancellation Policy:
------------------
- Cancellations must be made at least 24 hours before the booking time
- Contact the administrator with your Transaction ID for any modifications

Need Help?
---------
If you have any questions or need assistance, please contact:
Email: support@celebrationroom.com
Phone: +91-XXXXXXXXXX

Thank you for choosing our Celebration Room service!

Best regards,
Celebration Room Booking Team
"""

        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)

        return True, transaction_id
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False, None

@app.route('/send-email', methods=['POST'])
def handle_email():
    try:
        data = request.json
        success, transaction_id = send_email(
            data['to'],
            data['subject'],
            data['details']
        )
        
        if success:
            return jsonify({
                "status": "success", 
                "message": "Email sent successfully",
                "transactionId": transaction_id
            }), 200
        else:
            return jsonify({
                "status": "error", 
                "message": "Failed to send email"
            }), 500
    except Exception as e:
        return jsonify({
            "status": "error", 
            "message": str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)