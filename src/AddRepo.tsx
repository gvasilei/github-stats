import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Search, SearchResultData } from 'semantic-ui-react';
import { SEARCH_REPOS } from './queries';
import { searchRepos, searchRepos_search_nodes, searchRepos_search_nodes_Repository } from './__generated__/searchRepos';
import isNotNull from './Utils';
import { RepoQueryVariables } from './Tabs';
import { loadState, saveState } from './localStorageService';


type AddRepoState = {
  input: string
  query: string
  loading: boolean
  results: searchRepos_search_nodes_Repository[]
  displayResults: Array<{title: string, description?: string, image?: URL, key: string}>
  searchTimeout: number | undefined
};

export default class AddRepo extends React.Component<{}, AddRepoState> {
  constructor(props: {}) {
    super(props);
    this.state = { 
      input : '',
      query : '',
      loading : false,
      results: [],
      displayResults : [],
      searchTimeout : undefined
    };
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent() {

    if (this.state.searchTimeout !== undefined) {
      clearTimeout(this.state.searchTimeout);
    }

    this.setState({ 
      input : '',
      query : '',
      loading : false,
      displayResults : []
    });
  }

  handleInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ input : e.currentTarget.value });
  }

  // TODO - save also repo id
  handleResultSelect = (e: React.MouseEvent<HTMLElement>, data: SearchResultData) => {
    this.setState({query : data.result.title});

    const repo = this.state.results.find((r) => r.name === data.result.title);
    if (repo !== undefined) {
      const repos = loadState<RepoQueryVariables[]>();
      const repoToAdd: RepoQueryVariables = {owner: repo.owner.login, name: repo.name};
      if (repos === undefined) {
        saveState<RepoQueryVariables[]>([repoToAdd]);
      } else {
        repos.push(repoToAdd);
        saveState<RepoQueryVariables[]>(repos);
      }

      window.location.reload();
    }
  }

  handleSearchChange = (client: ApolloClient<InMemoryCache>, query: string | undefined) => {

    if (query === undefined || query === '') {
      this.resetComponent();
      return;
    }

    const timeout = setTimeout(this.doQuery, 500, client, query);

    if (this.state.searchTimeout !== undefined) {
      clearTimeout(this.state.searchTimeout);
    }
    this.setState({ query: query, loading: true, searchTimeout: timeout });
  }

  private doQuery = async (client: ApolloClient<InMemoryCache>, query: string | undefined) => {
    const { data, errors } = await client.query<searchRepos>({
      query: SEARCH_REPOS,
      variables: { repoName: query}
    });

    this.setState({ loading: false });

    if (errors !== undefined) {
      console.log(errors);
      return;
    }
    
    const res = data.search.nodes === null ? [] : data.search.nodes;
    const filteredResults = res.filter(isNotNull).filter((res: searchRepos_search_nodes): res is searchRepos_search_nodes_Repository => true);

    this.setState({
      results : filteredResults,
      displayResults : filteredResults
        .map(r => ({title: r.name, key: `res-${r.name}`, description: r.description || '', image: r.owner.avatarUrl || ''})) 
    });
  }

  render() {
    console.log(this.state.displayResults);
    return (
      <div>
        <br/>
        <ApolloConsumer>
        {(client) => {

          return (
            <Search 
              loading={this.state.loading}
              value={this.state.query}
              onSearchChange={(e, data) => this.handleSearchChange(client, data.value)}
              results={this.state.displayResults}
              onResultSelect={this.handleResultSelect}
            />
          );
        }}
        </ApolloConsumer>
      </div>
    );
  }
}


