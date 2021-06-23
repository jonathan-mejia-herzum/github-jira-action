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

let commit, url, message;

if (event == 'release') {
  url = github.context.payload.release.html_url;
  message = github.context.payload.release.name;
}
else {

  commit = github.context.payload.head_commit;
  message = commit.message;
  url = commit.url;
}


const indexOfFirst = message.indexOf('\n');

let words;
if (indexOfFirst > 0) {
  words = message.split('\n');
  words = words[0];
}
words = message.split(' ');


const issue = words[0];


const bodyJson = body.getBody(url, message);
const urlJira = `https://${jiraBaseUrl}.atlassian.net/rest/api/3/issue/${issue}/comment`;


fetch(urlJira, {
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






