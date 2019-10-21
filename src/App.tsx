import * as React from 'react';
import { Grid, SemanticWIDTHS } from 'semantic-ui-react';
import AppHeader from './AppHeader';
import Profile from './Profile';
import 'semantic-ui-css/semantic.min.css';
import { RepoTabs } from './Tabs';

const enabledComponents = () => {
  let apps: String[] | null = null;
  if (apps !== null) {
    return apps;
  }

  apps = [];
  if (process.env.REACT_APP_ENABLE_MY_REPOS || false) {
    apps = ["RepoTabs"]
  }
  return apps;
}

const isComponentEnabled = (name: string) => {
  const components = enabledComponents();

  return components.includes(name);
}

const App = () => {

  let columnsLength: SemanticWIDTHS;

  if (isComponentEnabled("RepoTabs")) {
    columnsLength = 2
  } else {
    columnsLength = 1
  }

  return (
    <div className="App">
      <Grid divided='vertically'>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <AppHeader />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={columnsLength}>
        {isComponentEnabled("RepoTabs") &&  
        <Grid.Column width={2}>
          <Profile />
        </Grid.Column>
        }
        <Grid.Column width={14}>
          <RepoTabs />
        </Grid.Column>
        </Grid.Row>
      </Grid>

    </div>
  );
};

export default App;

