const core = require('@actions/core');
const github = require('@actions/github');

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
  console.log(`jira TOken ${jiraApiToken}`);
  console.log(`The event payload: ${payload}`);


} catch (error) {
  core.setFailed(error.message);
}

