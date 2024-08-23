// utils/refreshAccessToken
const { google } = require("googleapis");
require("dotenv").config();

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Set the credentials with the refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const refreshAccessToken = async () => {
  try {
    const { token } = await oauth2Client.getAccessToken();
    console.log("New Access Token:", token);
    return token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
};

module.exports = refreshAccessToken;
