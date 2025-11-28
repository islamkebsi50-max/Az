// Firebase & imgbb Configuration for Aznaf Market
// ==========================================
// SECURITY NOTE: Replace these placeholder values with your actual credentials.
//
// Firebase Credentials:
// You can find these in your Firebase Console: Project Settings > General > Your apps
//
// imgbb API Key:
// Get your free API key from: https://api.imgbb.com/
//
// IMPORTANT: For production deployments:
// - Set up proper Firestore Security Rules in your Firebase Console
// - Keep your imgbb API key secure

// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// imgbb API Key for image uploads
// Get your free API key from: https://api.imgbb.com/
const imgbbApiKey = "YOUR_IMGBB_API_KEY";

// Check if Firebase config has been set up
function isFirebaseConfigured() {
    return firebaseConfig.apiKey !== "YOUR_API_KEY" && 
           firebaseConfig.projectId !== "YOUR_PROJECT_ID";
}

// Check if imgbb is configured
function isImgbbConfigured() {
    return imgbbApiKey !== "YOUR_IMGBB_API_KEY" && imgbbApiKey.length > 0;
}
