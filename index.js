const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  const jiraBaseUrl = core.getInput('JIRA_BASE_URL');
  const jiraUserEmail = core.getInput('JIRA_USER_EMAIL');
  const jiraApiToken = core.getInput('JIRA_API_TOKEN');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)

  const message = payload.commits[0].message;
  const words = message.split(' ');
  const issue = words[0];

  console.log(`jira TOken ${jiraApiToken}`);
  console.log(`jira jiraBaseUrl: ${jiraBaseUrl}`);
  console.log(`jira jira email: ${jiraUserEmail}`);
  console.log(`The event payload: ${payload}`);
  console.log(`This is the commit ${issue}`);






} catch (error) {
  core.setFailed(error.message);
}





/*
// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

const bodyData = `{
  "visibility": {
    "type": "role",
    "value": "Administrators"
  },
  "body": {
    "type": "doc",
    "version": 1,
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper.",
            "type": "text"
          }
        ]
      }
    ]
  }
}`;

fetch(`${jiraBaseUrl}/rest/api/3/issue/{issueIdOrKey}/comment`, {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      'email@example.com:<api_token>'
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: bodyData
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));
*/

