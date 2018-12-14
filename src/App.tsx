import * as React from 'react';
import { Grid, Tab } from 'semantic-ui-react';
import AppHeader from './AppHeader';
import Profile from './Profile';
import 'semantic-ui-css/semantic.min.css';
import { panes } from './Tabs';

const App = () => {
  return (
    <div className="App">
      <Grid divided='vertically'>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <AppHeader />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
        <Grid.Column width={2}>
          <Profile />
        </Grid.Column>
        <Grid.Column width={14}>
          <Tab panes={panes} />
        </Grid.Column>
        </Grid.Row>
      </Grid>

    </div>
  );
};

export default App;

