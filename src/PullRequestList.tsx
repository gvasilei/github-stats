import * as React from 'react';
import { getPRs_repository_pullRequests_nodes as PullRequest } from './__generated__/getPRs';

type PullRequestListProps = {
    pullRequests: PullRequest[]
};

export default class PullRequestList extends React.PureComponent<PullRequestListProps, {}> {
  public render() {
    const list = this.props.pullRequests.map(pr => {
      return (
        <li key={pr.url}>
          <a href={pr.url} target='_blank'>{`${pr.title}`}</a>
        </li>
      );
    });
    return <ul>{list}</ul>;
  }
}