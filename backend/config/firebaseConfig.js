
// const admin = require("firebase-admin");
// require('dotenv').config();


// const serviceAccount = {
//     type: process.env.FIREBASE_TYPE,
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replaces \n characters with actual newline characters
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: process.env.FIREBASE_AUTH_URI,
//     token_uri: process.env.FIREBASE_TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
// };



// // Now you can use Firebase Admin SDK in your application


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)

// });

// module.exports = admin;

const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = {
  type: process.env.FIREBASE_TYPE || '',
  project_id: process.env.FIREBASE_PROJECT_ID || '',
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || '',
  private_key: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : '',
  client_email: process.env.FIREBASE_CLIENT_EMAIL || '',
  client_id: process.env.FIREBASE_CLIENT_ID || '',
  auth_uri: process.env.FIREBASE_AUTH_URI || '',
  token_uri: process.env.FIREBASE_TOKEN_URI || '',
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || '',
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || ''
};

// Validate required fields
const requiredFields = ['type', 'project_id', 'private_key', 'client_email'];
const missingFields = requiredFields.filter(field => !serviceAccount[field]);
if (missingFields.length > 0) {
  console.error(`Missing required Firebase service account fields: ${missingFields.join(', ')}`);
  process.exit(1); // Exit gracefully to avoid crashing
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error.message);
  process.exit(1);
}

module.exports = admin;
