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
  scopes: [
    "https://www.googleapis.com/auth/forms",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/forms.responses.readonly",
  ],
});

router.get("/responses/:responseId", async (req, res) => {
  try {
    // set response ID from route parameter
    responseId = req.params.responseId;

    // retrieve single response
    const response = await getSingleResponse();

    // send response data as JSON
    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const data = await createForm(req.body);
    res.json({
      result: "ok",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Google Form" });
  }
});

async function getResponses(formId) {
  // authenticate using credentials file
  await authClient.authorize();
  // create forms client
  const forms = google.forms({ version: "v1", auth: authClient });
  // retrieve   response
  const response = await forms.forms.responses.list({
    formId,
  });
  console.log(response.data);
  return response.data;
}
async function getSingleResponse(formId, responseId) {
  try {
    // authenticate using credentials file
    await authClient.authorize();
    // create forms client
    const forms = google.forms({ version: "v1", auth: authClient });
    // retrieve single response
    const response = await forms.forms.responses.get({
      formId: formId,
      responseId: responseId,
    });
    // log response data
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function createForm(formData) {
  try {
    // Authenticate with the Google Forms API
    await authClient.authorize();
    // Create a new form object
    const form = {
      info: {
        title: formData.FORM_NAME,
        documentTitle: formData.QUESTION_TITLE,
      },
    };
    // Call the Google Forms API to create the form
    const response = await google
      .forms({ version: "v1", auth: authClient })
      .forms.create({ resource: form });
    // console.log(`Form created with ID: ${response.data.formId}`);
    // Loop through each question in the array and add it to the form
    for (const questionData of formData.questions) {
      const question = {
        title: questionData.title,
        questionItem: {
          question: {
            choiceQuestion: {
              type: "RADIO",
              options: questionData.choices.map((choice) => ({
                value: choice,
              })),
            },
          },
        },
      };
      // Call the Google Forms API to add the question to the form
      const questionResponse = await google
        .forms({ version: "v1", auth: authClient })
        .forms.batchUpdate({
          formId: response.data.formId,
          resource: {
            requests: [
              {
                createItem: {
                  item: question,
                  location: { index: 0 },
                },
              },
            ],
          },
        });
         
    }

    // Grant permission to the specified email address
    const drive = google.drive({ version: "v3", auth: authClient });
    const permissionResponse = await drive.permissions.create({
      fileId: response.data.formId,
      requestBody: {
        role: "writer",
        type: "user",
        emailAddress: formData.EMAIL,
      },
    });
    console.log(`Permission granted to ${formData.EMAIL}`);
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// Start the Express server
module.exports = router;
