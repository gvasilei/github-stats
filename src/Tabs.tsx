import * as React from 'react';
import { GET_PULL_REQUESTS } from './queries';
import * as moment from "moment";
import PullRequestList from './PullRequestList';
import { Grid, Loader, Card, Image, Header, Message, Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Query } from "react-apollo";
import { getPRs_repository_pullRequests_nodes as PullRequest, getPRs as Repository } from './__generated__/getPRs';
import AddRepo from './AddRepo';
import isNotNull from './Utils';


// TODO - Create DTOs to handle serialization / desereliazation. Can't be bothered now.
class RepoQueryVariables {
  owner: string;
  name: string;
}

const getRepoQueryVariables = (): RepoQueryVariables[] => {
  const reposString = localStorage.getItem('repos');
  const repoArr = reposString !== null ? reposString.split(',') : [];

  if (repoArr.length === 0 || repoArr.length % 2 !== 0) {
    return [];
  }

  let ret: RepoQueryVariables[] = [];
  for (let i = 0; i < repoArr.length; i += 2) {
    ret.push({
      owner: repoArr[i],
      name: repoArr[i + 1]
    });
  }

  return ret;
};

const repos = getRepoQueryVariables();

type prGroups = {
  [key: string]: {
    name: string,
    avatarUrl: string,
    pullRequests: Array<PullRequest>
  }
};

class RepoQuery extends Query<Repository, {}> {}



export let panes = repos.map((repo: RepoQueryVariables) => {

  return {
    menuItem : (
      <Menu.Item name={repo.name} key={`menu-item-${repo.name}`}>
        {repo.name}
        <Icon name='delete' size='small' onClick={() => console.log('Implement Delete...')} />
      </Menu.Item>
    ), 
    render: () => {
      return (
        <RepoQuery query={GET_PULL_REQUESTS} variables={{owner: repo.owner, repo: repo.name}} pollInterval={30000}>
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

          const users = Object.keys(prPerUser).map((key: string) => {
            return (
              <Card key={`card-${key}`}>
              <Card.Content>
                <Image floated='right' size='mini' src={prPerUser[key].avatarUrl}/>
                <Card.Header>{prPerUser[key].name}</Card.Header>
                <Card.Description>
                  <Dropdown text={`${prPerUser[key].pullRequests.length} Pull Request(s)`}>
                    <Dropdown.Menu>
                      {prPerUser[key].pullRequests.map((pr: PullRequest) => <Dropdown.Item as="a" target="_blank" key={pr.id} text={pr.title} href={pr.url} />)}
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Description>
              </Card.Content>
            </Card>
            );
          });
  
          return (
          <Grid divided='vertically'>
            <Grid.Row columns={1}>
              <Grid.Column textAlign="center">
              <br />
              <Header as='h4'>{`Total PRs: ${pullRequests.length}`}</Header>
              </Grid.Column>
            </Grid.Row>
            {users.length > 0 &&
            <Grid.Row>
            <Card.Group>
            {users}
            </Card.Group>
            </Grid.Row>
            }
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as='h4'>{`Late PRs: ${latePRs.length}`}</Header>
                <PullRequestList pullRequests={latePRs} />
              </Grid.Column>
              <Grid.Column>
                <Header as='h4'>{`Pull Requests up for grabs: ${unassignedPRs.length}`}</Header>
                <PullRequestList pullRequests={unassignedPRs} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          );
        }}
        </RepoQuery>
      );
    }
  };
});

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
  
  return pullRequests.reduce(
    function (acc: prGroups, pr: PullRequest) {

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
    {}
  );
}

// Can't be bothered to pass the state change all the way to the top component
// to rerender the tabs, so for now I'm refreshing the page which is good enough for me tbh
panes.push({
    menuItem : <Menu.Item icon='plus' />,
    render : () => <AddRepo />
});