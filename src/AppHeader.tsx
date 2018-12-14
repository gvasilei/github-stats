import * as React from 'react';

import { Header, Icon } from 'semantic-ui-react';

export default class AppHeader extends React.PureComponent {

  public render() {
    return (  
      <Header as='h2' icon>
        <Icon name='github' />
        GitHub Statistics
        <Header.Subheader>Data and Metrics for your team</Header.Subheader>
      </Header>
    );
  }
}
