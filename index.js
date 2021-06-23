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








