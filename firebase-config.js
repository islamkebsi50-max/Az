// Firebase Configuration for Aznaf Market
// ==========================================
// SECURITY NOTE: Replace these placeholder values with your actual Firebase credentials.
// You can find these in your Firebase Console: Project Settings > General > Your apps
//
// IMPORTANT: For production deployments:
// - Consider using environment variables or a secrets management service
// - Firebase API keys are safe to expose in client-side code as security is enforced
//   through Firebase Security Rules, but you should still configure proper rules
// - Set up proper Firestore Security Rules in your Firebase Console
// - Enable only the Firebase services you actually use

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Check if Firebase config has been set up
function isFirebaseConfigured() {
    return firebaseConfig.apiKey !== "YOUR_API_KEY" && 
           firebaseConfig.projectId !== "YOUR_PROJECT_ID";
}
