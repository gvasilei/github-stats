import * as React from 'react';
import { Card, Button, Menu } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';

import { getRepos_viewer_repositories_edges_node } from '../__generated__/getRepos';
import { addStar } from './__generated__/addStar';
import { removeStar } from './__generated__/removeStar';
import { updateSubscription } from './__generated__/updateSubscription';
import { SubscriptionState } from '../__generated__/globalTypes';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { REPOSITORY_FRAGMENT } from '../Repository';
import { STAR_REPOSITORY, UNSTAR_REPOSITORY, UPDATE_SUBSCRIPTION } from './queries';

const handleAddStar = (client: DataProxy, mutationResult: FetchResult<{data: addStar}>) => {
  if (mutationResult.data !== undefined) {
    const repository = client.readFragment<getRepos_viewer_repositories_edges_node>({
      id: `Repository:${mutationResult.data.addStar.starrable.id}`,
      fragment: REPOSITORY_FRAGMENT,
    });

    const totalCount = repository === null 
      ? 1 
      : repository.stargazers.totalCount + 1;

    client.writeFragment({
      id: `Repository:${mutationResult.data.addStar.starrable.id}`,
      fragment: REPOSITORY_FRAGMENT,
      data: {
        ...repository,
        stargazers: {
          // TODO - remove !
          ...repository!.stargazers,
          totalCount,
        },
      },
    });
  }
};

const handleRemoveStar = (client: DataProxy, mutationResult: FetchResult<{data: removeStar}>) => {
  if (mutationResult.data !== undefined) {
    const repository = client.readFragment<getRepos_viewer_repositories_edges_node>({
      id: `Repository:${mutationResult.data.removeStar.starrable.id}`,
      fragment: REPOSITORY_FRAGMENT,
    });

    const totalCount = repository === null 
      ? 0 
      : repository.stargazers.totalCount - 1;

    client.writeFragment({
      id: `Repository:${mutationResult.data.removeStar.starrable.id}`,
      fragment: REPOSITORY_FRAGMENT,
      data: {
        ...repository,
        stargazers: {
          // TODO - remove !
          ...repository!.stargazers,
          totalCount,
        },
      },
    });
  }
};

const handleUpdateSubscription = (client: DataProxy, mutationResult: FetchResult<{data: updateSubscription}>) => {
  console.log(mutationResult);
};



const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred
}: getRepos_viewer_repositories_edges_node) => {

  const addToStats = (event: React.MouseEvent<HTMLButtonElement>) => {
    let repos: string | null = localStorage.getItem('repos');

    if (repos === null) {
      localStorage.setItem('repos', event.currentTarget.value);
    } else {
      localStorage.setItem('repos', repos + "," + event.currentTarget.value);
    }

    window.location.reload();
  };

  const contentDescription = <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />;
  return (
  <Menu.Item as={Card}>
    <Card.Content>
      <Card.Header>
        <a href={url} target='_blank'>{name}</a>
      </Card.Header>
    </Card.Content>
    <Card.Content description={contentDescription} />
    <Card.Content extra>
      {!viewerHasStarred ? (
      <Mutation mutation={STAR_REPOSITORY} variables={{id}} update={handleAddStar}>
        {(addStarFn, { data, loading, error}) => (
          <Button
            onClick={(e) => addStarFn()}
            content='Star'
            icon='star'
            label={{ as: 'a', basic: true, content: stargazers.totalCount }}
            labelPosition='right'
          />
        )}    
      </Mutation>
      ) : (
      <Mutation mutation={UNSTAR_REPOSITORY} variables={{id}} update={handleRemoveStar}>
        {(removeStarFn, { data, loading, error}) => (
          <Button 
            onClick={(e) => removeStarFn()}
            content='Unstar'
            icon='star'
            label={{ as: 'a', basic: true, content: stargazers.totalCount }}
            labelPosition='right'
          />
        )}    
      </Mutation> 
      ) 
      }
      {viewerSubscription === null || viewerSubscription !== SubscriptionState.SUBSCRIBED ? (
        <Mutation mutation={UPDATE_SUBSCRIPTION} variables={{id: id, state: SubscriptionState.SUBSCRIBED}} update={handleUpdateSubscription}>
          {(updateSubscriptionFn, { data, loading, error}) => (
          <Button
            onClick={(e) => updateSubscriptionFn()}
            content='Watch'
            icon='eye'
            label={{ as: 'a', basic: true, content: watchers.totalCount }}
            labelPosition='right'
          />
          )}
        </Mutation>
      ) : (
        <Mutation mutation={UPDATE_SUBSCRIPTION} variables={{id: id, state: SubscriptionState.UNSUBSCRIBED}} update={handleUpdateSubscription}>
          {(updateSubscriptionFn, { data, loading, error}) => (
          <Button
            onClick={(e) => updateSubscriptionFn()}
            content='Unwatch'
            icon='eye'
            label={{ as: 'a', basic: true, content: watchers.totalCount }}
            labelPosition='right'
          />
          )}
        </Mutation>
      )}
      <Button content='Add to Stats' icon='plus' labelPosition='left' value={`${owner.login},${name}`} onClick={addToStats}/>

    </Card.Content>
  </Menu.Item>
  );
};

export default RepositoryItem;