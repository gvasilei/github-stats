/* tslint:disable */
// This file was automatically generated and should not be edited.

import { SubscriptionState } from "./globalTypes";

// ====================================================
// GraphQL query operation: getRepos
// ====================================================

export interface getRepos_viewer_repositories_edges_node_primaryLanguage {
  __typename: "Language";
  /**
   * The name of the current language.
   */
  name: string;
}

export interface getRepos_viewer_repositories_edges_node_owner {
  __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  login: string;
  /**
   * The HTTP URL for the owner.
   */
  url: any;
}

export interface getRepos_viewer_repositories_edges_node_stargazers {
  __typename: "StargazerConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface getRepos_viewer_repositories_edges_node_watchers {
  __typename: "UserConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface getRepos_viewer_repositories_edges_node {
  __typename: "Repository";
  id: string;
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The HTTP URL for this repository
   */
  url: any;
  /**
   * The description of the repository rendered to HTML.
   */
  descriptionHTML: any;
  /**
   * The primary language of the repository's code.
   */
  primaryLanguage: getRepos_viewer_repositories_edges_node_primaryLanguage | null;
  /**
   * The User owner of the repository.
   */
  owner: getRepos_viewer_repositories_edges_node_owner;
  /**
   * A list of users who have starred this starrable.
   */
  stargazers: getRepos_viewer_repositories_edges_node_stargazers;
  /**
   * Returns a boolean indicating whether the viewing user has starred this starrable.
   */
  viewerHasStarred: boolean;
  /**
   * A list of users watching the repository.
   */
  watchers: getRepos_viewer_repositories_edges_node_watchers;
  /**
   * Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
   */
  viewerSubscription: SubscriptionState | null;
}

export interface getRepos_viewer_repositories_edges {
  __typename: "RepositoryEdge";
  /**
   * The item at the end of the edge.
   */
  node: getRepos_viewer_repositories_edges_node | null;
}

export interface getRepos_viewer_repositories_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface getRepos_viewer_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of edges.
   */
  edges: (getRepos_viewer_repositories_edges | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: getRepos_viewer_repositories_pageInfo;
}

export interface getRepos_viewer {
  __typename: "User";
  /**
   * The username used to login.
   */
  login: string;
  /**
   * The user's public profile name.
   */
  name: string | null;
  /**
   * A list of repositories that the user owns.
   */
  repositories: getRepos_viewer_repositories;
}

export interface getRepos {
  /**
   * The currently authenticated user.
   */
  viewer: getRepos_viewer;
}

export interface getReposVariables {
  cursor?: string | null;
}
