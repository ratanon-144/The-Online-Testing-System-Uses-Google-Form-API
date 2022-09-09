'use strict';

const path = require('path');
const google = require('@googleapis/forms');
const {
  authenticate,
} = require('@google-cloud/local-auth');

async function runSample(query) {


  const authClient = await authenticate({
    keyfilePath: path.join(__dirname, 'credentials.json'),
    scopes: 'https://www.googleapis.com/auth/drive',
  });

  const forms = google.forms({
    version: 'v1',
    auth: authClient,
  });
  const newForm = {
    'info': {
      title: 'RATANON-TestAAA', documentTitle: 'AAAAA4.00',
    },

  };
  const update = {
    requests: [
      {
        createItem: {
          item: {
            title: "ข้อที่ 1",
            description: "ตอบข้อความด้านล่าง",
            questionItem: {
              question: {
                "textQuestion": {
                  "paragraph": false
                }
              },
              image: { altText: "sample", sourceUri: 'https://picsum.photos/200?random=4' },
            },
          },
          location: { index: 0 },
        },
      }

      , {
        createItem: {
          item: {
            title: "ข้อที่ 2",
            description: "รูปนี้คืออะไร",
            questionItem: {
              question: {
                choiceQuestion: {
                  type: "DROP_DOWN",
                  options: ["เครื่องบิน", "รถ", "เรือ"].map((e) => ({
                    value: e,
                  })),
                },
              },
              image: { altText: "sample", sourceUri: 'https://picsum.photos/200?random=1' },
            },
          },
          location: { index: 1 },
        },
      },
      {
        createItem: {
          item: {
            title: "ข้อที่ 3",
            description: "นักศึกษาคิดว่า ",
            questionItem: {

              question: {
                choiceQuestion: {
                  type: "RADIO",
                  options: ["A", "B", "C"].map((e) => ({
                    value: e,
                  })),
                },
              },
              image: { altText: "sample", sourceUri: 'https://picsum.photos/200?random=2' },
            },

          },
          location: { index: 2 },
        },
      }, {
        createItem: {
          item: {
            title: "ข้อที่ 4",
            description: "สัตว์ปีกมีอะไรบ้าง",
            questionItem: {
              question: {
                choiceQuestion: {
                  type: "CHECKBOX",
                  options: ["นก", "กา", "แมว"].map((e) => ({
                    value: e,
                  })),
                },
              },
              image: { altText: "sample", sourceUri: 'https://picsum.photos/200?random=4' },
            },
          },
          location: { index: 3 },
        },
      },  
    ],
  };
  const createResponse = await forms.forms.create({
    requestBody: newForm,
  });
  console.log(createResponse.data);
  console.log('New formId was: ' + createResponse.data.formId);
  // ทำการอัพเดท
  const res = await forms.forms.batchUpdate({
    formId: createResponse.data.formId,
    requestBody: update,
  });
  console.log(res.data);
  return res.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;
