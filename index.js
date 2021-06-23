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
  const payload = JSON.stringify(github.context, undefined, 2)



  console.log(`jira TOken ${jiraApiToken}`);
  console.log(`jira jiraBaseUrl: ${jiraBaseUrl}`);
  console.log(`jira jira email: ${jiraUserEmail}`);
  console.log(`The event payload: ${payload}`);
  const message = payload.commits[0].message;
  console.log(`This is the message ${message}`);
  const words = message.split(' ');
  console.log(`This is the words ${words}`);
  const issue = words[0];
  console.log(`This is the commit ${issue}`);



fetch(`${jiraBaseUrl}/rest/api/3/issue/SSD-9`, {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      `${jiraUserEmail}:${jiraApiToken}`
    ).toString('base64')}`,
    'Accept': 'application/json'
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


