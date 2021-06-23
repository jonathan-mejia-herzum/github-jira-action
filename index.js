const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');
const body = require('./body');

const jiraBaseUrl = core.getInput('JIRA_BASE_URL');
const jiraUserEmail = core.getInput('JIRA_USER_EMAIL');
const jiraApiToken = core.getInput('JIRA_API_TOKEN');
const event = core.getInput('event');
const time = (new Date()).toTimeString();
core.setOutput("time", time);
const payload = JSON.stringify(github.context.payload, undefined, 2);
console.log(`thi is the event ${event}`);
console.log(`This is payload:  ${payload}`)

let commit, message;

if (event == 'release') {
  message = github.context.payload.release.name;
}
else {

  commit = github.context.payload.head_commit;
  message = commit.message;

}


const indexOfFirst = message.indexOf('\n');

let words;
if (indexOfFirst > 0) {
  words = message.split('\n');
}


words = words[0].split(' ');
const issue = words[0];


const bodyJson = body.getBody(commit.url, message);
const url = `https://${jiraBaseUrl}.atlassian.net/rest/api/3/issue/${issue}/comment`;


fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      `${jiraUserEmail}:${jiraApiToken}`
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bodyJson, undefined, 2)
})
  .then(response => {
    if (response.status != 201) {
      core.setFailed(response.statusText);
    }
    console.log(`Response: ${response.status}`);
    return 'OK';
  });






