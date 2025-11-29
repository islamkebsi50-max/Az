// Firebase & imgbb Configuration for Aznaf Market
// ==========================================
// Configuration is loaded from environment variables via the server
// For production deployments:
// - Set up proper Firestore Security Rules in your Firebase Console
// - Keep your imgbb API key secure

// Firebase Configuration - loaded from window globals set by HTML or server injection
const firebaseConfig = {
    apiKey: window.__FIREBASE_API_KEY__ || "%FIREBASE_API_KEY%",
    authDomain: window.__FIREBASE_AUTH_DOMAIN__ || "%FIREBASE_AUTH_DOMAIN%",
    projectId: window.__FIREBASE_PROJECT_ID__ || "%FIREBASE_PROJECT_ID%",
    storageBucket: window.__FIREBASE_STORAGE_BUCKET__ || "%FIREBASE_STORAGE_BUCKET%",
    messagingSenderId: window.__FIREBASE_MESSAGING_SENDER_ID__ || "%FIREBASE_MESSAGING_SENDER_ID%",
    appId: window.__FIREBASE_APP_ID__ || "%FIREBASE_APP_ID%"
};

// imgbb API Key for image uploads
const imgbbApiKey = window.__IMGBB_API_KEY__ || "%IMGBB_API_KEY%";

console.log('Firebase Config - projectId:', firebaseConfig.projectId);
console.log('Firebase Config - apiKey exists:', !!firebaseConfig.apiKey);

// Check if Firebase config has been set up
function isFirebaseConfigured() {
    const configured = firebaseConfig.apiKey && firebaseConfig.apiKey.length > 0 && 
           firebaseConfig.projectId && firebaseConfig.projectId.length > 0 &&
           !firebaseConfig.projectId.includes('%');
    return configured;
}

// Check if imgbb is configured
function isImgbbConfigured() {
    return imgbbApiKey && imgbbApiKey.length > 0;
}
