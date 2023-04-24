const nodemailer = require('nodemailer');
const express = require("express");
const router = express.Router();
const path = require("path"); 
const {google} = require('googleapis');
const {JWT} = require('google-auth-library'); 
const CLIENT_EMAIL = 'ratanonformapi@api-form-v4.iam.gserviceaccount.com';
const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDxK49VZggfAqD+\nW+6BFKw6j4AAWz+qiIVucaNtexFdA6UZ+9WFG7jF9jCb0NbIZ1GOMrVJ0Go1F9q/\nUmN3DNsbLUNE/aIX0WScoviPhqNlDPd1FnU+qMnKOEMmyE3t0QOs3v5bAqzYFfyR\nXtZujCoMUMsuOjHOGZBYFGU3xj6gBWbifBbFzth1ljf5CYh3+Pr5PRWZoiCQRubl\nhkstYurR6YotwS+PPv2Zh+DCliXg92KXjsNJuqQBGBRKzUysVAcw3W62pF2LpnhY\nVYzVUby8RQu/XNEj8lmMGdB2yBfYrUsvmCK3JB7m3LiNrC7CPyyJAH/PuUf+tMwV\nv15rmqqFAgMBAAECggEAD+iT5tMm+Gr8VUi+KmCe8BdnDMyu+WAJDu9dXKbwYTRH\ntG5wgQ6nAkGvFHTAkJIUK4FXzaTo7cHMbkJHG4fvo0CC4tNf/dGB/JiQWeEV1ASv\ncvvh6CwmTAw7DcGmpAy47rL72ZpUNzP4FaTJPHdvxcXFu5+M9xQ6eYYRwA3BM+/x\n7ar1ErGn3Pj+jrhcpG5S05Fk6h4OBhoQZQz2pAPhWb03sReR9lfbMVLes6tk7m3N\nbHxpSVKAkQEPN4d7P6mM452NzbXAP6AZfxzhpp2X5QzcXuNJriNC8yt/OZkFUZqS\nKZCKC+aXngOxg2hZlxC6/ecGX+J/d2yZ7kwJfG3k7wKBgQD8Ikd8IniKJZlsYe/f\nefWXpd133OpdBLcPMerLmFMokHzzpDTKAOWdRxVvHpmBgDA5hnj8hU23iN5pz28H\nPfulqtL7wY/dc9tuoVY2KHcx6U7R5GB9gYwQcj2qMvALDqw94gTdKNeSu3V3ue9R\nLVQ99tyxeWmJwbZbFPMrUYESvwKBgQD03j5qZY5NAZ0Rpw9POzZC7XkcNRmDuaUB\nJIApnOgWSCiAOC96P8ZEGlbdNvQ12v8uG8Zq8y+LEu5btZnOWo61q3lB8q7LCiGj\n2lyMNSt4anu/mpGzwbZC97dI2LFfl7j7SwEav+gEUsOsMuDSvL9lPQf4YNNr2K86\n6g08tKFHuwKBgG/Qo/MhNmPNmOS/6ikpZQkDvdvSVP07ghNzB7WSsA5lRYSnZeHP\n1AST6aWF5H3R45EfWbhjRbwHLtut6odDrb4iq76KcMq8/qtpUVpjR7kSxqm+piwC\nr6L7hu1b+ahtsWUgPxf1bOTdzZJzGvbdK2bve6AZP/yfs8dg2xZy5tLxAoGATTgE\noNLT1C7tFFMFfevjSanPpniMSkDx6vFSxUyo19X7h6uwNTIFWRahS/N3gcBE9opl\nwPZdiNL4fc0/6pYeKOYhQA3C116jiyNiSgi+Y6PY0GxzBCfTTT0G/J7xGH8lI4Hc\noE3iYfKjqBsHUQ2aoddkOwx1v62+XKrQb9NahN8CgYAaQU33quqGqpfUMYPhQXw1\nA/mm5zMJqQxUtaChj/LbrcwnGzKyBGfe2cuDwf41Es2kI6OElohY1OdQfSN9egpe\ny58gIJAWOU6dhM7RQxeNP6KnyQln7lG+1ZRUSjmE0lFRhK2z3/SnPNcWw9fN5Wxf\nJSLgCYHUtlM/sYWxh8GlYQ==\n-----END PRIVATE KEY-----\n';
const authClient = new JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/forms',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/forms.responses.readonly',
  'https://www.googleapis.com/auth/gmail.send', 'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose'
  ]
});

const app = express();

// Set up the Google Forms API client 


router.get("/sendgmail/:email",  async (req, res) => {
  try{ 
   const data = await sendEmail('63015144@kmitl.ac.th','Test Email', 'This is a test email sent using the Google APIs Gmail library','minaseyux@gmail.com');
  //const data = await getResponses(req.params.formId)
 // const data = await sendMail();
   res.json(data);
  }catch (error) {
   console.error(error);
   res.status(500).json({ message: 'Server error' });
 }
});
router.get("/getform/:formId",  async (req, res) => {
   try{ 
   const data = await getResponses(req.params.formId)
    res.json(data);
   }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
 
router.get('/responses/:responseId', async (req, res) => {
  try {
    // set response ID from route parameter
    responseId = req.params.responseId;

    // retrieve single response
    const response = await getSingleResponse();

    // send response data as JSON
    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post("/create",  async (req, res) => {
    try { 
      console.log(req.body);
     const data=  await  createForm(req.body);
      res.json(
        {
        result: "ok", 
        data:data
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create Google Form' });
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


async function getSingleResponse(formId,responseId) {
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
        documentTitle: formData.QUESTION_TITLE
      }
    };

    // Call the Google Forms API to create the form
    const response = await google.forms({ version: "v1", auth: authClient }).forms.create({ resource: form });
  // console.log(`Form created with ID: ${response.data.formId}`);

    // Loop through each question in the array and add it to the form
    for (const questionData of formData.questions) {
      const question = {
        title: questionData.title,
        questionItem: {
          question: {
            choiceQuestion: {
              type: "RADIO",
              options: questionData.choices.map((choice) => ({ value: choice }))
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
                location: { index: 0 }
              }
            }
          ]
        }
      });
    //  console.log(`Question "${questionData.title}" added to form`);
    }

    // Grant permission to the specified email address
    const drive = google.drive({ version: "v3", auth: authClient });
    const permissionResponse = await drive.permissions.create({
      fileId: response.data.formId,
      requestBody: {
        role: "writer",
        type: "user",
        emailAddress: formData.EMAIL
      }
    });
//    console.log(`Permission granted to ${formData.EMAIL}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
 
async function sendEmail(from,subject, body, to) {
  try {
      // authenticate using credentials file
      await authClient.authorize();
      // create gmail client
    const gmail = google.gmail({ version: "v1", auth: authClient });
    const message = [ 
      'Content-Type: text/html; charset=rfc822', 
      'To: ' + to,"\n",
      'From:' + from, "\n",
      'Subject: ' + subject , "\n\n", 
      body,
    ].join('');
   
    const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    console.log(encodedMessage);
    const res = await gmail.users.messages.send({
      userId: 'me', 
        body: encodedMessage
      
    });
    console.log('Email sent:', res.data);
     return  res.data
  } catch (err) {
    console.error('Error sending email:', err.message);
    return  err.message
  }
} 
 

async function sendMail() {
  try {

      // authenticate using credentials file
      await authClient.authorize();
      // create gmail client
      
    const transport = await nodemailer.createTransport({
      service: 'gmail',
       auth: authClient
    });
    const mailOptions = {
      from: '63015144@kmitl.ac.th',
      to: 'minaseyux@gmail.com',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: '<h1>Hello from gmail email using API <br> https://docs.google.com/forms/d/e/1FAIpQLScdmYuPc2IMTY6To--FFTeEsTU45aOWx3M2ZM60dolR_FtHxQ/viewform </br> </h1>',
    };
  
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

// Start the Express server
module.exports = router;
