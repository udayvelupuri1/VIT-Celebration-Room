import { database, auth } from './firebase-config.js';
import { ref, set, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Get booking details from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const bookingDetails = {
    roomType: urlParams.get('roomType'),
    bookingDate: urlParams.get('bookingDate'),
    timeSlot: urlParams.get('timeSlot'),
    userEmail: urlParams.get('email')
};

// Display booking details
document.getElementById('bookingDetails').innerHTML = `
    <p><strong>Room:</strong> ${bookingDetails.roomType}</p>
    <p><strong>Date:</strong> ${bookingDetails.bookingDate}</p>
    <p><strong>Time:</strong> ${bookingDetails.timeSlot}</p>
`;

window.copyUpiId = () => {
    const upiId = document.getElementById('upiId').textContent;
    navigator.clipboard.writeText(upiId);
    alert('UPI ID copied!');
};

window.verifyPayment = async () => {
    const transactionId = document.getElementById('transactionId').value;
    if (!transactionId) {
        alert('Please enter transaction ID');
        return;
    }

    try {
        // Save booking with payment details
        const bookingRef = ref(database, `bookings/${bookingDetails.roomType}/${bookingDetails.bookingDate}/${bookingDetails.timeSlot.replace(/\s/g, '')}`);
        const booking = {
            ...bookingDetails,
            transactionId,
            timestamp: Date.now(),
            status: 'confirmed'
        };
        
        await set(bookingRef, booking);

        // Send confirmation email
        const response = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: bookingDetails.userEmail,
                subject: 'Celebration Room Booking Confirmation',
                details: booking
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send confirmation email');
        }

        document.getElementById('paymentStatus').className = 'payment-status success';
        document.getElementById('paymentStatus').textContent = 'Payment confirmed! Redirecting to home page...';
        document.getElementById('paymentStatus').style.display = 'block';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    } catch (error) {
        document.getElementById('paymentStatus').className = 'payment-status error';
        document.getElementById('paymentStatus').textContent = 'Error: ' + error.message;
        document.getElementById('paymentStatus').style.display = 'block';
    }
};