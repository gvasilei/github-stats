import * as React from 'react';
import { Query } from 'react-apollo';
import { Loader, Message, Menu } from 'semantic-ui-react';
import RepositoryList from './Repository';
import { GET_REPOSITORIES_OF_CURRENT_USER } from './queries';
import { getRepos } from './__generated__/getRepos';


class ProfileQuery extends Query<getRepos, {cursor: string | null}> {}

const Profile = () => (
  <ProfileQuery query={GET_REPOSITORIES_OF_CURRENT_USER} notifyOnNetworkStatusChange={true}>
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
          {viewer.name} - {viewer.login}
          <Menu vertical fluid borderless compact>
            <RepositoryList repositories={viewer.repositories} fetchMore={fetchMore} />
          </Menu>
        </div>
      );
    }}
  </ProfileQuery>
);

export default Profile;