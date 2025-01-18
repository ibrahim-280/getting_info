const admin = require('firebase-admin');

// Path to your service account key file
const serviceAccount = require('./path/to/your/surprise-7acea-firebase-adminsdk-fbsvc-028a4bff23.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Reference to Firestore
