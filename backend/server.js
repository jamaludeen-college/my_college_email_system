// server.js
const express = require("express");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const { getAccessToken, oauth2Client } = require("./services/auth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log("Tokens:", tokens);

    if (tokens.refresh_token) {
      console.log("Refresh Token:", tokens.refresh_token);
    }

    res.send("Authentication successful! You can close this window.");
  } catch (error) {
    console.error("Error getting OAuth tokens:", error);
    res.status(500).send("Error during authentication");
  }
});

app.get("/list-emails", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    oauth2Client.setCredentials({ access_token: accessToken });

    const gmail = google.gmail("v1");
    const response = await gmail.users.messages.list({
      auth: oauth2Client,
      userId: "me",
      q: "subject:test", // Change the query as needed
    });

    const messages = response.data.messages;
    let emailList = "No messages found.";
    if (messages && messages.length) {
      emailList = "<h1>Emails:</h1><ul>";
      for (const message of messages) {
        const messageData = await gmail.users.messages.get({
          auth: oauth2Client,
          userId: "me",
          id: message.id,
        });
        emailList += `<li>${messageData.data.snippet}</li>`;
      }
      emailList += "</ul>";
    }

    res.send(emailList);
  } catch (error) {
    console.error("Error listing emails:", error);
    res.status(500).send("Error listing emails");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
