Statistics about open Pull Requests in a repo. Shows the number of later PRs, PRs without a reviewer and the number of participating PRs per user.

In order to use you need to create a Github Personal Access Token with the following permissions:

read:discussion, read:org, read:public_key, read:repo_hook, repo, user

add the token in a .env file with the REACT_APP_GITHUB_ACCESS_TOKEN prefix:

`REACT_APP_GITHUB_ACCESS_TOKEN=YOU_GITHUB_TOKEN`

How to generate the typescript GraphQL Definitions:

* Install [Apollo CLI](https://github.com/apollographql/apollo-tooling).

* Go to the src folder. Then type apollo codegen:generate -c ../apollo.config.js --target=typescript

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of CRA guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

