// Firebase & imgbb Configuration for Aznaf Market
// ==========================================
// Configuration is loaded from environment variables via the server
// For production deployments:
// - Set up proper Firestore Security Rules in your Firebase Console
// - Keep your imgbb API key secure

// Firebase Configuration - loaded from environment variables via server injection
window.firebaseConfig = {
    apiKey: "test-key",
    authDomain: "aznef-9cea0.firebaseapp.com",
    projectId: "test-project",
    storageBucket: "aznef-9cea0.firebasestorage.app",
    messagingSenderId: "365910456676",
    appId: "1:365910456676:web:d2122c5958dfd66f426271"
};

// imgbb API Key for image uploads
window.imgbbApiKey = "test-imgbb";

console.log('Firebase Config - projectId:', window.firebaseConfig.projectId);
console.log('Firebase Config - apiKey exists:', !!window.firebaseConfig.apiKey);

// Check if Firebase config has been set up
function isFirebaseConfigured() {
    const config = window.firebaseConfig;
    const configured = config && config.apiKey && config.apiKey.length > 0 && 
           config.projectId && config.projectId.length > 0 &&
           !config.projectId.includes('%');
    return configured;
}

// Check if imgbb is configured
function isImgbbConfigured() {
    return window.imgbbApiKey && window.imgbbApiKey.length > 0 && !window.imgbbApiKey.includes('%');
}
