// getRefreshToken.js
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID, // Client ID from environment variable
  process.env.GOOGLE_CLIENT_SECRET, // Client Secret from environment variable
  "http://localhost:5000/oauth2callback" // Redirect URI
);

// Generate the URL
const url = oauth2Client.generateAuthUrl({
  access_type: "offline", // Will return a refresh token
  prompt: "consent",
  scope: "https://www.googleapis.com/auth/gmail.readonly",
});

console.log(`Authorize this app by visiting this url: ${url}`);
