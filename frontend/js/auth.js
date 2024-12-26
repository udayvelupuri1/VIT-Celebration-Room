import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

let isSignUp = false;

window.toggleAuth = () => {
    isSignUp = !isSignUp;
    document.getElementById('authTitle').textContent = isSignUp ? 'Sign Up' : 'Welcome Back';
    document.getElementById('authButton').textContent = isSignUp ? 'Sign Up' : 'Sign In';
    document.getElementById('authToggle').textContent = isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up';
};

window.handleAuth = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        if (isSignUp) {
            await createUserWithEmailAndPassword(auth, email, password);
        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('bookingSection').style.display = 'block';
    } catch (error) {
        document.getElementById('authError').textContent = error.message;
        document.getElementById('authError').style.display = 'block';
    }
};

window.handleLogout = () => {
    auth.signOut();
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('bookingSection').style.display = 'none';
};