import { database, auth } from './firebase-config.js';
import { ref, set, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

window.updateTimeSlots = async () => {
    const roomType = document.getElementById('roomType').value;
    const bookingDate = document.getElementById('bookingDate').value;
    
    if (!roomType || !bookingDate) return;
    
    // Check if selected date is in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(bookingDate);
      
      if (selectedDate < today) {
          alert('Please select a future date');
          document.getElementById('bookingDate').value = '';
          return;
      }

    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
        "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
    ];

    const timeSlotsContainer = document.getElementById('timeSlots');
    timeSlotsContainer.innerHTML = '';

    for (const slot of timeSlots) {
        const bookingRef = ref(database, `bookings/${roomType}/${bookingDate}/${slot.replace(/\s/g, '')}`);
        const snapshot = await get(bookingRef);
        const isBooked = snapshot.exists();

        const slotElement = document.createElement('div');
        slotElement.className = `time-slot ${isBooked ? 'unavailable' : ''}`;
        slotElement.textContent = slot;
        
        if (!isBooked) {
            slotElement.onclick = () => selectTimeSlot(slotElement);
        }

        timeSlotsContainer.appendChild(slotElement);
    }
};

window.selectTimeSlot = (element) => {
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    element.classList.add('selected');
    document.getElementById('paymentButton').disabled = false;
};