# Celebration Room Booking System 🎉

A web-based room booking system that allows users to reserve celebration rooms with automated email confirmations. The system supports different types of rooms (Ladies Hostel, Men's Hostel, and General Rooms) with time slot management.

## Features 🌟

- User Authentication with Firebase
- Real-time booking availability
- Time slot visualization
- Automated email confirmations
- Multiple room types support
- Date and time validation
- Responsive design
- Booking status tracking

## Tech Stack 💻

### Frontend
- HTML/CSS/JavaScript
- Firebase Authentication
- Firebase Realtime Database
- Netlify (Hosting)

### Backend
- Python
- Flask
- SMTP Email Service
- PythonAnywhere/Render (Hosting)

## Setup and Installation 🚀

### Prerequisites
- Python 3.9 or higher
- Node.js and npm
- Firebase account
- Gmail account (for sending confirmation emails)

### Frontend Setup

1. Clone the repository
```bash
git clone <https://github.com/udayvelupuri1/VIT-Celebration-Room.git>
```

2. Configure Firebase
- Create a new Firebase project
- Enable Authentication and Realtime Database
- Update firebase-config.js with your credentials:
```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};
```

3. Deploy to Netlify
- Connect your repository to Netlify
- Configure build settings
- Deploy the application

### Backend Setup

1. Install Python dependencies
```bash
pip install -r requirements.txt
```

2. Configure Environment Variables
```
EMAIL_ADDRESS=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

3. Deploy to PythonAnywhere
- Create a PythonAnywhere account
- Upload the Flask application
- Configure virtual environment
- Set up environment variables
- Configure WSGI file
- Enable the web app

## API Endpoints 📡

### Send Email Confirmation
- **URL**: `/send-email`
- **Method**: `POST`
- **Body**:
```json
{
    "to": "user@email.com",
    "subject": "Booking Confirmation",
    "details": {
        "userId": "user-id",
        "userEmail": "user@email.com",
        "roomType": "LH",
        "bookingDate": "2024-12-27",
        "timeSlot": "09:00 AM",
        "timestamp": 1703664000000
    }
}
```

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response**: `{"status": "healthy"}`

## Room Types 🏠

- LH: Ladies Hostel Room
- MH: Men's Hostel Room
- GN: General Room

## Time Slots ⏰

Available time slots are from 9:00 AM to 8:00 PM with 1-hour intervals:
- Morning: 09:00 AM - 12:00 PM
- Afternoon: 01:00 PM - 04:00 PM
- Evening: 05:00 PM - 08:00 PM

## Security Features 🔒

- Firebase Authentication for user management
- Environment variables for sensitive data
- CORS protection
- Email verification
- App-specific password for Gmail
- Input validation and sanitization

## Contributing 🤝

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Error Handling 🔧

The system includes error handling for:
- Invalid dates
- Past date bookings
- Already booked slots
- Email sending failures
- Network issues
- Authentication errors

## License 📝

[My license]

## Support 💪

For support, please contact [your contact information]

## Author ✍️

[Uday Kumar]

## Acknowledgments 🙏

- Firebase team for the excellent documentation
- Flask community for the helpful resources
