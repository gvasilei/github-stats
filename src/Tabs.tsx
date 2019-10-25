import * as React from 'react';
import moment from "moment";
import { Grid, Loader, Card, Message, Menu, Icon, Statistic, Tab } from 'semantic-ui-react';

import { GET_PULL_REQUESTS } from './queries';

import UserStats from './UserStats';
import PullRequestList from './PullRequestList';
import { Query } from "react-apollo";
import { getPRs_repository_pullRequests_nodes as PullRequest, getPRs as Repository } from './__generated__/getPRs';
import AddRepo from './AddRepo';
import isNotNull from './Utils';
import { loadState } from './localStorageService';

export type PullRequestsPerUser = {
  [key: string]: {
    name: string,
    avatarUrl: string,
    pullRequests: Array<PullRequest>
  }
};

export type RepoQueryVariables = {
  owner: string
  name: string
};

type RepoTabsState = {
  repos: RepoQueryVariables[]
};

export class RepoTabs extends React.Component<{}, RepoTabsState> {
  constructor(props: {}) {
    super(props);
    this.state = { 
      repos: loadState<RepoQueryVariables[]>() || []
    };
  }

  private deleteRepo = (owner: string, name: string) => {
    console.log(`Implement Delete... ${owner} - ${name}`);
  }

  // TODO - Check shouldComponentUpdate PureComponent
  render() {
    let panes = this.state.repos.map((repo: RepoQueryVariables) => {

      return {
        menuItem : (
          <Menu.Item name={repo.name} key={`menu-item-${repo.name}`}>
            {repo.name}
            <Icon name='delete' size='small' onClick={() => this.deleteRepo(repo.owner, repo.name)} />
          </Menu.Item>
        ), 
        render: () => {
          return (
            <Query<Repository, {}> query={GET_PULL_REQUESTS} variables={{owner: repo.owner, repo: repo.name}} pollInterval={30000}>
            {({ loading, error, data }) => {
      
              if (loading) {
                return <Loader active inline='centered'>Loading...</Loader>;
              }
      
              if (error) {
                return (
                  <Message negative>
                    <Message.Header>{error.name}</Message.Header>
                    <p>{error.message} {error.extraInfo}</p>
                  </Message>
                );
              }
      
              if (data === undefined || data.repository === null) {
                return <p>No Data :(</p>;
              }
    
              const pullRequests = getPullRequests(data.repository.pullRequests.nodes);
              const latePRs = getLatePRs(pullRequests);
              const unassignedPRs = getUnassignedPRs(pullRequests);
              const prPerUser = getPRPerUser(pullRequests);
      
              return (
              <Grid divided='vertically'>
                <Grid.Row columns={1}>
                  <Grid.Column textAlign="center">
                    <br />
                    <Statistic size='small' label='Open Pull Requests' value={pullRequests.length} />
                  </Grid.Column>
                </Grid.Row>
                {Object.keys(prPerUser).length > 0 &&
                <Grid.Row>
                  <Card.Group>
                    <UserStats prPerUser={prPerUser} />
                  </Card.Group>
                </Grid.Row>
                }
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Statistic size='small' label='Late Pull Requests' value={latePRs.length} />
                    <PullRequestList pullRequests={latePRs} />
                  </Grid.Column>
                  <Grid.Column>
                    <Statistic size='small' label='Pull Requests up for grabs' value={unassignedPRs.length} />
                    <PullRequestList pullRequests={unassignedPRs} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              );
            }}
            </Query>
          );
        }
      };
    });

    panes.push({
      menuItem : <Menu.Item icon='plus' title='Add a new repo' />,
      render : () => <AddRepo />
    });

    return <Tab panes={panes} />;
  }
}



// Filter out the nulls
function getPullRequests(pullRequests: (PullRequest | null)[] | null): PullRequest[] {
  const PRs = pullRequests === null ? [] : pullRequests;
  return PRs.filter(isNotNull);
}



function getLatePRs(pullRequests: PullRequest[]) {
  const now = moment();
  return pullRequests.filter((pr) => {
    return now.diff(moment(pr.createdAt)) > 3 * 3600 * 24 * 1000;
  });
}



function getUnassignedPRs(pullRequests: PullRequest[]) {

  return pullRequests.filter((pr) => {
    if (pr === null) {
      return false;
    }

    // Clean up the data
    const assignees = (pr.assignees.nodes === null ? [] : pr.assignees.nodes).filter(isNotNull);
    const reviewRequests = (pr.reviewRequests === null || pr.reviewRequests.nodes === null ? [] : pr.reviewRequests.nodes).filter(isNotNull);
    const reviews = (pr.reviews === null || pr.reviews.nodes === null ? [] : pr.reviews.nodes).filter(isNotNull);

    return !assignees.length && !reviewRequests.length && !reviews.length;
  });
}



function getPRPerUser(pullRequests: PullRequest[]) {

  let initial: PullRequestsPerUser = {};
  
  return pullRequests.reduce(
    function (acc: PullRequestsPerUser, pr: PullRequest) {

      const reviewRequests = (pr.reviewRequests === null || pr.reviewRequests.nodes === null ? [] : pr.reviewRequests.nodes).filter(isNotNull);

      reviewRequests.forEach((reviewer) => {
        // Requested Reviewer can be a user or a team
        if (reviewer.requestedReviewer !== null && reviewer.requestedReviewer.__typename === "User") {
          const key = reviewer.requestedReviewer.id;
          if (!acc[key]) {
            acc[key] = {
              name: reviewer.requestedReviewer.name || '',
              avatarUrl: reviewer.requestedReviewer.avatarUrl,
              pullRequests: []
            };
          }
          acc[key].pullRequests.push(pr);
        }
      });

      return acc;
    }, 
    initial
  );
}