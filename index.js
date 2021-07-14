const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');
const body = require('./body');

const jiraBaseUrl = core.getInput('JIRA_BASE_URL');
const jiraUserEmail = core.getInput('JIRA_USER_EMAIL');
const jiraApiToken = core.getInput('JIRA_API_TOKEN');
const idField = core.getInput('idField');
const token = core.getInput('token');

const event = core.getInput('event');
const sha = core.getInput('sha');
const time = (new Date()).toTimeString();
core.setOutput("time", time);
const payload = JSON.stringify(github.payload, undefined, 2);
const payloadtoken = JSON.stringify(github.token, undefined, 2);


let commit, url, message, branch;

if (event == 'release') {
  url = github.context.payload.release.html_url;
  message = github.context.payload.release.name;
  branch = github.context.payload.release.target_commitish;

}
else {

  commit = github.context.payload.head_commit;
  message = commit.message;
  url = commit.url;
  const ref = payload.ref;
  const refSplit = ref.split('/');
  branch = refSplit[refSplit.length-1];
}

console.log('***********BRANCH  or TAG');
console.log(branch)
console.log(payload);
console.log('****token****')
console.log(token);
console.log('********')

/****************************GET COMMITS***************** */

/*******************GET ID ISSUE************************** */

const getIssue = `http://mastery.digitalfactory.ec/api/release/setRelease/${branch}`;

fetch(getIssue, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Github-token': token,
    'Jira-usr': jiraUserEmail,
    'Jira-psw': jiraApiToken,
    'Jira-url': jiraBaseUrl
  }
})
  .then(response => response.json())
  .then(data => console.log(data));


