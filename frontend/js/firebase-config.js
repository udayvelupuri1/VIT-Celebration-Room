import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';

const firebaseConfig = {
    apiKey: "AIzaSyCkcsMtIr5uQEzPdIWso_UYLGDTqESs3qM",
    authDomain: "celebration-room-app.firebaseapp.com",
    databaseURL: "https://celebration-room-app-default-rtdb.firebaseio.com",
    projectId: "celebration-room-app",
    storageBucket: "celebration-room-app.firebasestorage.app",
    messagingSenderId: "115645212454",
    appId: "1:115645212454:web:0cb332b3d81e29f55c83e7",
    measurementId: "G-F5B5CYT5G5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { app, auth, database, analytics };