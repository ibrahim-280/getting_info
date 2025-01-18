const express = require('express');
const geoip = require('geoip-lite');
const uaParser = require('ua-parser-js');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./surprise-7acea-firebase-adminsdk-fbsvc-028a4bff23.json'); // Path to your Firebase credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://surprise-7acea.firebaseio.com', // Replace with your Firebase Database URL
});

const db = admin.firestore(); // Firestore instance
const app = express();
app.use(express.json());

// Endpoint to handle user data
app.post('/user-data', async (req, res) => {
    const { ip, userAgent, timestamp } = req.body;
    const geo = geoip.lookup(ip);
    const userData = {
        ip: ip,
        geo: geo ? geo : { message: 'Geolocation data not available' },
        userAgent: userAgent,
        timestamp: timestamp,
    };

    try {
        // Save user data to Firestore
        await db.collection('user-data').add(userData);
        console.log('User data saved:', userData);
        res.status(200).send({ message: 'Data saved successfully!' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send({ message: 'Error saving data' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
