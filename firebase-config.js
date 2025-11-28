// Firebase & imgbb Configuration for Aznaf Market
// ==========================================
// Configuration is loaded from environment variables via the server
// For production deployments:
// - Set up proper Firestore Security Rules in your Firebase Console
// - Keep your imgbb API key secure

// Firebase Configuration - loaded from window globals set by HTML
const firebaseConfig = {
    apiKey: window.__FIREBASE_API_KEY__ || "",
    authDomain: window.__FIREBASE_AUTH_DOMAIN__ || "",
    projectId: window.__FIREBASE_PROJECT_ID__ || "",
    storageBucket: window.__FIREBASE_STORAGE_BUCKET__ || "",
    messagingSenderId: window.__FIREBASE_MESSAGING_SENDER_ID__ || "",
    appId: window.__FIREBASE_APP_ID__ || ""
};

// imgbb API Key for image uploads
const imgbbApiKey = window.__IMGBB_API_KEY__ || "";

// Check if Firebase config has been set up
function isFirebaseConfigured() {
    return firebaseConfig.apiKey && firebaseConfig.apiKey.length > 0 && 
           firebaseConfig.projectId && firebaseConfig.projectId.length > 0;
}

// Check if imgbb is configured
function isImgbbConfigured() {
    return imgbbApiKey && imgbbApiKey.length > 0;
}
