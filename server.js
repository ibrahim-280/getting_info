const express = require('express');
const fs = require('fs');
const path = require('path');
const geoip = require('geoip-lite');
const uaParser = require('ua-parser-js');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (like your index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST request to '/user-data'
app.post('/user-data', (req, res) => {
    const { ip, userAgent, timestamp } = req.body; // Extract data from request body

    console.log('User Data Received:', { ip, userAgent, timestamp }); // Log the data

    // Format the data to be written into the file
    const dataToSave = `
    IP: ${ip}
    User-Agent: ${JSON.stringify(userAgent, null, 2)}
    Timestamp: ${timestamp}
    -------------------------------
    `;

    // Save the data in a text file (append mode)
    fs.appendFile(path.join(__dirname, 'user_data.txt'), dataToSave, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).json({ error: 'Failed to save data' });
        }
        console.log('Data saved successfully');
        res.json({ message: 'Data saved successfully' }); // Respond back to the client
    });
});

// Handle GET request to serve the index.html (embedded YouTube video)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the HTML file
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
