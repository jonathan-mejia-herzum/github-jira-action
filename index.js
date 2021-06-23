const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');
const body = require('./body');

const jiraBaseUrl = core.getInput('JIRA_BASE_URL');
const jiraUserEmail = core.getInput('JIRA_USER_EMAIL');
const jiraApiToken = core.getInput('JIRA_API_TOKEN');
const time = (new Date()).toTimeString();
core.setOutput("time", time);
const commit = github.context.payload.commits[0];
const message = commit.message;

const indexOfFirst = message.indexOf('\n');

let words;
if (indexOfFirst > 0) {
  words = message.split('\n');
}


words = words[0].split(' ');
const issue = words[0];


const bodyJson = body.getBody(commit.url, message);
const url = `${jiraBaseUrl}/rest/api/3/issue/${issue}/comment`;


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
    if(response.status != 201){
      throw new Error('The comment was not inserted in Jira');
    }
    console.log(`Response: ${response.status}`);
    return response.text();
  });






