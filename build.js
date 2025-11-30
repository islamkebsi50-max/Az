#!/usr/bin/env node
const fs = require('fs');

// Get environment variables
const env = process.env;

// Create the firebase config with actual values
const configContent = `// Firebase & imgbb Configuration for Aznaf Market
// ==========================================
// Configuration is loaded from environment variables via the server
// For production deployments:
// - Set up proper Firestore Security Rules in your Firebase Console
// - Keep your imgbb API key secure

// Firebase Configuration - loaded from environment variables via server injection
window.firebaseConfig = {
    apiKey: "${env.FIREBASE_API_KEY || ''}",
    authDomain: "${env.FIREBASE_AUTH_DOMAIN || ''}",
    projectId: "${env.FIREBASE_PROJECT_ID || ''}",
    storageBucket: "${env.FIREBASE_STORAGE_BUCKET || ''}",
    messagingSenderId: "${env.FIREBASE_MESSAGING_SENDER_ID || ''}",
    appId: "${env.FIREBASE_APP_ID || ''}"
};

// imgbb API Key for image uploads
window.imgbbApiKey = "${env.IMGBB_API_KEY || ''}";

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
`;

// Write the config file
fs.writeFileSync('firebase-config.js', configContent, 'utf8');
console.log('✅ firebase-config.js generated successfully with environment variables');
