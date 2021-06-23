const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');
const body = require('./body');


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
  const commit = github.context.payload.commits[0];
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  const message = commit.message;

  const indexOfFirst = message.indexOf('\n');
  
  let words;
  if(indexOfFirst>0){
    words = message.split('\n');
  }

  
  words = words[0].split(' ');
  const issue = words[0];


  const bodyJson = body.getBody(commit.url, message);
  const url = `${jiraBaseUrl}/rest/api/3/issue/${issue}/comment`;
  

  console.log(`jira TOken ${jiraApiToken}`);
  console.log(`jira jiraBaseUrl: ${jiraBaseUrl}`);
  console.log(`jira jira email: ${jiraUserEmail}`);
  console.log(`This is the commit ${issue}`);
  console.log(`This is the url ${url}`);
  
  console.log(JSON.stringify(bodyJson, undefined, 2))
  console.log(`This is the payload ${payload}`);




  fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      `${jiraUserEmail}:${jiraApiToken}`
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: {
    "body": body
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));



} catch (error) {
  core.setFailed(error.message);
}


