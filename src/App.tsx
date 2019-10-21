import * as React from 'react';
import { Grid, SemanticWIDTHSNUMBER } from 'semantic-ui-react';
import AppHeader from './AppHeader';
import Profile from './Profile';
import 'semantic-ui-css/semantic.min.css';
import { RepoTabs } from './Tabs';
import { enabledComponents, isComponentEnabled } from './FeatureFlag';

const App = () => {

  const columnsLength = 1 + enabledComponents().length as SemanticWIDTHSNUMBER
  const repoTabsLength = 16 - enabledComponents().length * 2 as SemanticWIDTHSNUMBER;

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
        <Grid.Column width={repoTabsLength}>
          <RepoTabs />
        </Grid.Column>
        </Grid.Row>
      </Grid>

    </div>
  );
};

export default App;

