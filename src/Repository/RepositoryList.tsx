import * as React from 'react';
import RepositoryItem from './RepositoryItem';
import { getRepos_viewer_repositories, getRepos } from '../__generated__/getRepos';
import { FetchMoreQueryOptions, FetchMoreOptions, ApolloQueryResult } from 'apollo-client';
import { Button } from 'semantic-ui-react';


type RepositoryListProps = {
  repositories: getRepos_viewer_repositories
fetchMore: (fetchMoreOptions: FetchMoreQueryOptions<{cursor: string | null}, 'cursor'>
& FetchMoreOptions<getRepos>) 
    => Promise<ApolloQueryResult<getRepos>>; 
};
 

const updateQuery = (previousResult: getRepos, options: { fetchMoreResult?: getRepos }) => {

  if (options.fetchMoreResult === undefined) {
    return previousResult;
  }

  // TODO - Check Ramda lenses as an alternative of object spread
  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      repositories: {
        ...previousResult.viewer.repositories,
        ...options.fetchMoreResult.viewer.repositories,
        edges: [
          ...(previousResult.viewer.repositories.edges !== null ? previousResult.viewer.repositories.edges : []),
          ...(options.fetchMoreResult.viewer.repositories.edges !== null ? options.fetchMoreResult.viewer.repositories.edges : [])
        ],
      },
    },
  };
};

class RepositoryList extends React.PureComponent<RepositoryListProps, {}> {

  render() {
    if (this.props.repositories.edges !== null ) {
      return (
        <>
          {this.props.repositories.edges.map((edge) => {
            if (edge !== null && edge.node !== null) {
              return (
              <div key={edge.node.id}>
                <RepositoryItem {...edge.node} />
              </div>);
            } else {
              return null;
            }
          })}
          {this.props.repositories.pageInfo.hasNextPage && (
            <Button
              primary
              onClick={() =>
                this.props.fetchMore({
                  variables : {
                    cursor: this.props.repositories.pageInfo.endCursor
                  },
                  updateQuery : updateQuery
                })
            }
            >
            More Repositories
            </Button>
            )}
        </>
      );
    } else {
      return [];
    }
  }
}

export default RepositoryList;