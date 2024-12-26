import { database, auth } from './firebase-config.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

window.proceedToPayment = async () => {
    const roomType = document.getElementById('roomType').value;
    const bookingDate = document.getElementById('bookingDate').value;
    const selectedSlot = document.querySelector('.time-slot.selected');
    const statusElement = document.getElementById('bookingStatus');
    
    if (!selectedSlot) return;
    
    const timeSlot = selectedSlot.textContent;
    
    try {
        const bookingRef = ref(database, `bookings/${roomType}/${bookingDate}/${timeSlot.replace(/\s/g, '')}`);
        const bookingDetails = {
            userId: auth.currentUser.uid,
            userEmail: auth.currentUser.email,
            roomType,
            bookingDate,
            timeSlot,
            timestamp: Date.now()
        };
        
        await set(bookingRef, bookingDetails);
        
        const response = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: auth.currentUser.email,
                subject: 'Celebration Room Booking Confirmation',
                details: bookingDetails
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send confirmation email');
        }

        // Show success status
        statusElement.className = 'booking-status success';
        statusElement.querySelector('.status-title').textContent = 'Booking Successful!';
        statusElement.querySelector('.status-message').textContent = 
            `Your ${roomType} room has been booked for ${bookingDate} at ${timeSlot}. A confirmation email will be sent shortly.`;
        statusElement.style.display = 'block';
        
        // Reset selection
        updateTimeSlots();
        document.getElementById('paymentButton').disabled = true;
    } catch (error) {
        // Show error status
        statusElement.className = 'booking-status error';
        statusElement.querySelector('.status-title').textContent = 'Booking Failed';
        statusElement.querySelector('.status-message').textContent = 'Error processing booking: ' + error.message;
        statusElement.style.display = 'block';
    }
};