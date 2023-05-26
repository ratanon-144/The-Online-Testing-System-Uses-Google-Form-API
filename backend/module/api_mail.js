const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { JWT } = require("google-auth-library");
require("dotenv").config();
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const authClient = new JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ["https://mail.google.com"],
  subject: process.env.SUBJECT_KEY,
});


router.post("/send", async (req, res) => {
  try {
  const { email, subject, content } = req.body;
    const data = await sendEmail(email,subject, content);
    res.json({ message: { send :"OK" , status: data } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
 


async function sendEmail(emailAddress, subject, content) {
  try {
    // authenticate using credentials file
    await authClient.authorize();
    // create gmail
    const gmail = google.gmail({ version: "v1", auth: authClient });
    // Define the email
    const message = {
      requestBody: {
        raw: makeEmail("Admin", emailAddress, subject, content),
      },
      userId: "me",
    };
    // Send the email
    const data =  await gmail.users.messages.send(message);

    // Helper function to create an email
    function makeEmail(sender, recipient, subject, message) {
      const email = [
        'Content-Type: text/plain; charset="utf-8"\n',
        "MIME-Version: 1.0\n",
        `From: ${sender}\n`,
        `To: ${recipient}\n`,
        `Subject: ${subject}\n\n`,
        message,
      ].join("");

      return Buffer.from(email)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    }
    console.log(data);
    return data.status;
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
