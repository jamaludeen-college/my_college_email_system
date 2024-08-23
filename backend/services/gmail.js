// gmail.js
const { google } = require("googleapis");
const { getAccessToken, oauth2Client } = require("./services/auth");

const gmail = google.gmail("v1");

const listEmails = async () => {
  try {
    const accessToken = await getAccessToken();
    oauth2Client.setCredentials({ access_token: accessToken });

    const res = await gmail.users.messages.list({
      auth: oauth2Client,
      userId: "me",
      q: "subject:test", // Change the query as needed
    });

    const messages = res.data.messages;
    if (messages && messages.length) {
      console.log("Messages:");
      for (const message of messages) {
        console.log(`- ${message.id}`);
        const messageData = await gmail.users.messages.get({
          auth: oauth2Client,
          userId: "me",
          id: message.id,
        });
        console.log(`Message snippet: ${messageData.data.snippet}`);
      }
    } else {
      console.log("No messages found.");
    }
  } catch (error) {
    console.error("Error listing emails:", error);
  }
};

module.exports = { listEmails };
