const res = require('dotenv').config();

module.exports = {
  client: {
    service: {
      name: "github",
      url: "https://api.github.com/graphql",
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
      }
    }
  }
};
