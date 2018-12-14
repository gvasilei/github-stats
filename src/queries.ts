import gql from "graphql-tag";
import { REPOSITORY_FRAGMENT } from "./Repository";

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query getRepos($cursor: String) {
    viewer {
      login
      name
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export const GET_PULL_REQUESTS = gql`
  query getPRs($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      name
      pullRequests(states: [OPEN], first: 100) {
        nodes {
          id
          title
          createdAt
          url
          author {
            login
          }
          assignees(first: 10) {
            nodes {
              name
              url
            }
          }
          reviewRequests(first: 10) {
            nodes {
              requestedReviewer {
                ... on User {
                  id
                  avatarUrl
                  name
                }
              }
            }
          }
          reviews(first: 10) {
            nodes {
              author {
                login
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_REPOS = gql`
  query searchRepos($repoName: String!) {
    search(query: $repoName, first: 5, type: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          owner {
            ... on User {
              name
              login
              avatarUrl
            }
            ... on Organization {
              name
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`;
