import * as React from 'react';
import { Query } from 'react-apollo';
import { Loader, Message, Menu } from 'semantic-ui-react';
import RepositoryList from './Repository';
import { GET_REPOSITORIES_OF_CURRENT_USER } from './queries';
import { getRepos } from './__generated__/getRepos';



const Profile = () => (
  <Query<getRepos, {cursor: string | null}> query={GET_REPOSITORIES_OF_CURRENT_USER} notifyOnNetworkStatusChange={true}>
    {({ data, loading, error, fetchMore }) => {

      if (error) {
        return (
          <Message negative>
            <Message.Header>{error.name}</Message.Header>
            <p>{error.message} {error.extraInfo}</p>
          </Message>
        );
      }

      if (loading || !data) {
        return <Loader active inline='centered'>Loading...</Loader>;
      }

      const { viewer } = data;

      return (
        <div>
          <Menu vertical fluid borderless compact>
            <Menu.Item header>My Repositories - {viewer.name}</Menu.Item>
            <RepositoryList repositories={viewer.repositories} fetchMore={fetchMore} />
          </Menu>
        </div>
      );
    }}
  </Query>
);

export default Profile;