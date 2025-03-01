const geoip = require('geoip-lite');
const uaParser = require('ua-parser-js');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://surprise-7acea.firebaseio.com', // Replace with your Firebase Database URL
    });
}

const db = admin.firestore(); // Firestore instance

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { ip, userAgent, timestamp } = req.body;
    const geo = geoip.lookup(ip);
    const userData = {
        ip: ip,
        geo: geo ? geo : { message: 'Geolocation data not available' },
        userAgent: userAgent,
        timestamp: timestamp,
        latitude: req.body.latitude || null, // Add latitude
        longitude: req.body.longitude || null, // Add longitude
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
};
