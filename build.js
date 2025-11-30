#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Read firebase-config.js
let configContent = fs.readFileSync('firebase-config.js', 'utf8');

// Replace environment variables
const env = process.env;
configContent = configContent.replace('%FIREBASE_API_KEY%', env.FIREBASE_API_KEY || '');
configContent = configContent.replace('%FIREBASE_AUTH_DOMAIN%', env.FIREBASE_AUTH_DOMAIN || '');
configContent = configContent.replace('%FIREBASE_PROJECT_ID%', env.FIREBASE_PROJECT_ID || '');
configContent = configContent.replace('%FIREBASE_STORAGE_BUCKET%', env.FIREBASE_STORAGE_BUCKET || '');
configContent = configContent.replace('%FIREBASE_MESSAGING_SENDER_ID%', env.FIREBASE_MESSAGING_SENDER_ID || '');
configContent = configContent.replace('%FIREBASE_APP_ID%', env.FIREBASE_APP_ID || '');
configContent = configContent.replace('%IMGBB_API_KEY%', env.IMGBB_API_KEY || '');

// Write back
fs.writeFileSync('firebase-config.js', configContent, 'utf8');

console.log('✅ Environment variables substituted successfully');
