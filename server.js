const express = require("express");
const UAParser = require("ua-parser-js");
const geoip = require("geoip-lite");

const app = express();

app.get("/", (req, res) => {
  const ip = req.ip; // Get client IP address
  const geo = geoip.lookup(ip); // Lookup geo information

  // Parse the user-agent string
  const parser = new UAParser(req.headers["user-agent"]);
  const userAgent = parser.getResult();

  res.json({
    ip: ip,
    geo: geo,
    userAgent: userAgent
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
