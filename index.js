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
const payload = JSON.stringify(github, undefined, 2);
const payloadtoken = JSON.stringify(github.token, undefined, 2);

console.log(payload);
console.log('****token****')
console.log(token);
console.log('********')
