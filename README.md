# Add Comment to gira

This action adds a comment to a Jira problem, the problem key will assume that it is in the comment title.

## Inputs

## `JIRA_BASE_URL`

**Required** jira base url https://<yourdomain>.atlassian.net

## `JIRA_USER_EMAIL`

**Required** It is the email to access to jira instance

## `JIRA_API_TOKEN`

**Required** It's the token we use to add the comment [How To](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/ "How To")


## Example usage

````
uses: jonathan-mejia-herzum/github-jira-action@main
with:
  JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
  JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
  JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}s