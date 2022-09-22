
// [START forms_create_form]

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
      title: 'RATANON-Test112', documentTitle: 'โปรแกรมเรียน112',
    },

  };

  const update = {
    'requests': [{
      'updateFormInfo': {
        'info': {
          'description': ' ทดสอบระบบ\'.',
        },
        'updateMask': 'description',
      },
    }],
  };

  const update_n = {
    'requests': [{
      'createItem': {
        'item': {
          'title': 'Homework video',
          'description': 'Quizzes in Google Forms  ทดสอบระบบ\'.',
          'videoItem': {
            'video': {
              'youtubeUri': 'https://www.youtube.com/watch?v=g4hmoL0RJ60',
            },
          },
        },
        'item': {
          'title': 'Homework video 2 ',
          'description': 'Ladyfingers Lofi Remix ทดสอบระบบ\'.',
          'videoItem': {
            'video': {
              'youtubeUri': 'https://www.youtube.com/watch?v=SYiow4ZNKCg',
            },
          },
        },
        'location': {
          'index': 0,
        },
      },
    }],
  };




  const update_m = {
    'requests': [{
      'createItem': {
        'item': {
          'title': 'Which of these singers was not a member of Destiny\'s Child?',
          'questionItem': {
            'question': {
              'required': true,
              'grading': {
                'pointValue': 2,
                'correctAnswers': {
                  'answers': [{ 'value': 'Rihanna' }]
                },
                'whenRight': { 'text': 'You got it!' },
                'whenWrong': { 'text': 'Sorry, that\'s wrong' }
              },
              'choiceQuestion': {
                'type': 'RADIO',
                'options': [
                  { 'value': 'Kelly Rowland' },
                  { 'value': 'Beyoncé' },
                  { 'value': 'Rihanna' },
                  { 'value': 'Michelle Williams' }
                ],
              },
            },
          },
        }
        ,
        'location': {
          'index': 0,
        },
      },
    }],
  };
  // ส่งไปสร้าง form ก่อน
  const createResponse = await forms.forms.create({
    requestBody: newForm,
  });
  console.log(createResponse.data);
  console.log('New formId was: ' + createResponse.data.formId);
  // ทำการอัพเดท
  const res = await forms.forms.batchUpdate({
    formId: createResponse.data.formId,
    requestBody: update_m,
  });
  console.log(res.data);
  return res.data;
  
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;

// [END forms_create_form]
