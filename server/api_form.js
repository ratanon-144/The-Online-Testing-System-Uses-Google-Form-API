const express = require("express");
const router = express.Router();
const path = require("path");
const custom = require("./custom");
const {google} = require('googleapis');
const {JWT} = require('google-auth-library');
const CLIENT_EMAIL = 'ratanonformapi@api-form-v4.iam.gserviceaccount.com';
const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDxK49VZggfAqD+\nW+6BFKw6j4AAWz+qiIVucaNtexFdA6UZ+9WFG7jF9jCb0NbIZ1GOMrVJ0Go1F9q/\nUmN3DNsbLUNE/aIX0WScoviPhqNlDPd1FnU+qMnKOEMmyE3t0QOs3v5bAqzYFfyR\nXtZujCoMUMsuOjHOGZBYFGU3xj6gBWbifBbFzth1ljf5CYh3+Pr5PRWZoiCQRubl\nhkstYurR6YotwS+PPv2Zh+DCliXg92KXjsNJuqQBGBRKzUysVAcw3W62pF2LpnhY\nVYzVUby8RQu/XNEj8lmMGdB2yBfYrUsvmCK3JB7m3LiNrC7CPyyJAH/PuUf+tMwV\nv15rmqqFAgMBAAECggEAD+iT5tMm+Gr8VUi+KmCe8BdnDMyu+WAJDu9dXKbwYTRH\ntG5wgQ6nAkGvFHTAkJIUK4FXzaTo7cHMbkJHG4fvo0CC4tNf/dGB/JiQWeEV1ASv\ncvvh6CwmTAw7DcGmpAy47rL72ZpUNzP4FaTJPHdvxcXFu5+M9xQ6eYYRwA3BM+/x\n7ar1ErGn3Pj+jrhcpG5S05Fk6h4OBhoQZQz2pAPhWb03sReR9lfbMVLes6tk7m3N\nbHxpSVKAkQEPN4d7P6mM452NzbXAP6AZfxzhpp2X5QzcXuNJriNC8yt/OZkFUZqS\nKZCKC+aXngOxg2hZlxC6/ecGX+J/d2yZ7kwJfG3k7wKBgQD8Ikd8IniKJZlsYe/f\nefWXpd133OpdBLcPMerLmFMokHzzpDTKAOWdRxVvHpmBgDA5hnj8hU23iN5pz28H\nPfulqtL7wY/dc9tuoVY2KHcx6U7R5GB9gYwQcj2qMvALDqw94gTdKNeSu3V3ue9R\nLVQ99tyxeWmJwbZbFPMrUYESvwKBgQD03j5qZY5NAZ0Rpw9POzZC7XkcNRmDuaUB\nJIApnOgWSCiAOC96P8ZEGlbdNvQ12v8uG8Zq8y+LEu5btZnOWo61q3lB8q7LCiGj\n2lyMNSt4anu/mpGzwbZC97dI2LFfl7j7SwEav+gEUsOsMuDSvL9lPQf4YNNr2K86\n6g08tKFHuwKBgG/Qo/MhNmPNmOS/6ikpZQkDvdvSVP07ghNzB7WSsA5lRYSnZeHP\n1AST6aWF5H3R45EfWbhjRbwHLtut6odDrb4iq76KcMq8/qtpUVpjR7kSxqm+piwC\nr6L7hu1b+ahtsWUgPxf1bOTdzZJzGvbdK2bve6AZP/yfs8dg2xZy5tLxAoGATTgE\noNLT1C7tFFMFfevjSanPpniMSkDx6vFSxUyo19X7h6uwNTIFWRahS/N3gcBE9opl\nwPZdiNL4fc0/6pYeKOYhQA3C116jiyNiSgi+Y6PY0GxzBCfTTT0G/J7xGH8lI4Hc\noE3iYfKjqBsHUQ2aoddkOwx1v62+XKrQb9NahN8CgYAaQU33quqGqpfUMYPhQXw1\nA/mm5zMJqQxUtaChj/LbrcwnGzKyBGfe2cuDwf41Es2kI6OElohY1OdQfSN9egpe\ny58gIJAWOU6dhM7RQxeNP6KnyQln7lG+1ZRUSjmE0lFRhK2z3/SnPNcWw9fN5Wxf\nJSLgCYHUtlM/sYWxh8GlYQ==\n-----END PRIVATE KEY-----\n';
const authClient = new JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/forms','https://www.googleapis.com/auth/drive']
});

const app = express();

// Set up the Google Forms API client

router.get("/",  async (req, res) => {
   
      res.json("hello");
  });
  
  router.post("/create",  async (req, res) => {
    try {
      const {EMAIL,FORM_NAME,QUESTION_TITLE,QUESTION_CHOICES} = req.body;
      createForm(EMAIL,FORM_NAME,QUESTION_TITLE,QUESTION_CHOICES);
      res.json(
        {
        result: "ok",
        EMAIL:EMAIL,
        FORM_NAME:FORM_NAME,
        QUESTION_TITLE:QUESTION_TITLE,
        QUESTION_CHOICES:QUESTION_CHOICES

      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create Google Form' });
    }
});

// Define a route to create a new Google Form
router.post('/cforms', async (req, res) => {
  try {
    const { username, password } = req.body;
    const { title } = req.body;
    // Create a new Google Form with the specified title
    console.log(username);
    console.log(password);
    console.log(title);
    custom().catch(console.error);
    // Return the ID of the newly created form
 //   res.json({ id: response.data.formId });
        res.json({
    result: "ok",
    username:username,
    password:password,
    title:title,
    id: response.data.formId
     
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Google Form' });
  }
});

// Create a new form
async function createForm(EMAIL,FORM_NAME,QUESTION_TITLE,QUESTION_CHOICES) {
  try {
    // Authenticate with the Google Forms API
    await authClient.authorize();

    // Create a new form object
    const form = {
      info: {
          title: FORM_NAME , documentTitle: QUESTION_TITLE
      },
  };
  
    // Call the Google Forms API to create the form
    const response = await google.forms({version: 'v1', auth: authClient}).forms.create({resource: form});
  console.log(response.data);
   
    const question = {
      title: QUESTION_TITLE,
      questionItem: {
        question: {
         // required: true,
          choiceQuestion: {
            type:"RADIO",
            options: QUESTION_CHOICES.map((options) => ({ value: options }))
          }
        }
      }
    };
  // Call the Google Forms API to add the question to the form
    const questionResponse = await google.forms({ version: "v1", auth: authClient }).forms.batchUpdate({
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
    console.log(questionResponse.data);

    console.log(response.data);
    // I added the below script.
    const drive = google.drive({ version: "v3", auth: authClient});
   
    const res = await drive.permissions.create({
      fileId: response.data.formId,
      requestBody: {
        role: "writer",
        type: "user",
        emailAddress: EMAIL, //  Please set your email address.
      },  permissionDetails: [
        {
          permissionType: 'flie',
          role: 'reader',
        }
      ]
    });
    console.log(res.data);

  } catch (err) {
    console.error(err);
  }
}

// Start the Express server
module.exports = router;
