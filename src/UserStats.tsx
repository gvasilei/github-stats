import * as React from 'react';
import { Card, Image, Dropdown } from 'semantic-ui-react';
import { getPRs_repository_pullRequests_nodes as PullRequest } from './__generated__/getPRs';
import { PullRequestsPerUser } from './Tabs';



type UserStatsProps = {
  prPerUser: PullRequestsPerUser
};



export default class UserStats extends React.PureComponent<UserStatsProps, {}> {

  render() {
    const cards =  Object.keys(this.props.prPerUser).map((key: string) => {
      return (
        <Card key={`card-${key}`}>
        <Card.Content>
          <Image floated='right' size='mini' src={this.props.prPerUser[key].avatarUrl}/>
          <Card.Header>{this.props.prPerUser[key].name}</Card.Header>
          <Card.Description>
            <Dropdown text={`${this.props.prPerUser[key].pullRequests.length} Pull Request(s)`}>
              <Dropdown.Menu>
                {this.props.prPerUser[key].pullRequests.map(
                  (pr: PullRequest) => <Dropdown.Item as="a" target="_blank" key={pr.id} text={pr.title} href={pr.url} />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Card.Description>
        </Card.Content>
      </Card>
      );
    });

    return cards;
  }


}