/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchRepos
// ====================================================

export interface searchRepos_search_nodes_Issue {
  __typename:
    | "Issue"
    | "PullRequest"
    | "User"
    | "Organization"
    | "MarketplaceListing";
}

export interface searchRepos_search_nodes_Repository_owner_User {
  __typename: "User";
  /**
   * The user's public profile name.
   */
  name: string | null;
  /**
   * The username used to login.
   */
  login: string;
  /**
   * A URL pointing to the user's public avatar.
   */
  avatarUrl: any;
}

export interface searchRepos_search_nodes_Repository_owner_Organization {
  __typename: "Organization";
  /**
   * The organization's public profile name.
   */
  name: string | null;
  /**
   * The organization's login name.
   */
  login: string;
  /**
   * A URL pointing to the organization's public avatar.
   */
  avatarUrl: any;
}

export type searchRepos_search_nodes_Repository_owner =
  | searchRepos_search_nodes_Repository_owner_User
  | searchRepos_search_nodes_Repository_owner_Organization;

export interface searchRepos_search_nodes_Repository {
  __typename: "Repository";
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The description of the repository.
   */
  description: string | null;
  /**
   * The User owner of the repository.
   */
  owner: searchRepos_search_nodes_Repository_owner;
}

export type searchRepos_search_nodes = searchRepos_search_nodes_Repository;

export interface searchRepos_search {
  __typename: "SearchResultItemConnection";
  /**
   * A list of nodes.
   */
  nodes: (searchRepos_search_nodes | null)[] | null;
}

export interface searchRepos {
  /**
   * Perform a search across resources.
   */
  search: searchRepos_search;
}

export interface searchReposVariables {
  repoName: string;
}
