/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPRs
// ====================================================

export interface getPRs_repository_pullRequests_nodes_author {
  __typename: "Organization" | "User" | "Bot";
  /**
   * The username of the actor.
   */
  login: string;
}

export interface getPRs_repository_pullRequests_nodes_assignees_nodes {
  __typename: "User";
  /**
   * The user's public profile name.
   */
  name: string | null;
  /**
   * The HTTP URL for this user
   */
  url: any;
}

export interface getPRs_repository_pullRequests_nodes_assignees {
  __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  nodes: (getPRs_repository_pullRequests_nodes_assignees_nodes | null)[] | null;
}

export interface getPRs_repository_pullRequests_nodes_reviewRequests_nodes_requestedReviewer_Team {
  __typename: "Team";
}

export interface getPRs_repository_pullRequests_nodes_reviewRequests_nodes_requestedReviewer_User {
  __typename: "User";
  id: string;
  /**
   * A URL pointing to the user's public avatar.
   */
  avatarUrl: any;
  /**
   * The user's public profile name.
   */
  name: string | null;
}

export type getPRs_repository_pullRequests_nodes_reviewRequests_nodes_requestedReviewer = getPRs_repository_pullRequests_nodes_reviewRequests_nodes_requestedReviewer_Team | getPRs_repository_pullRequests_nodes_reviewRequests_nodes_requestedReviewer_User;

export interface getPRs_repository_pullRequests_nodes_reviewRequests_nodes {
  __typename: "ReviewRequest";
  /**
   * The reviewer that is requested.
   */
  requestedReviewer: getPRs_repository_pullRequests_nodes_reviewRequests_nodes_requestedReviewer | null;
}

export interface getPRs_repository_pullRequests_nodes_reviewRequests {
  __typename: "ReviewRequestConnection";
  /**
   * A list of nodes.
   */
  nodes: (getPRs_repository_pullRequests_nodes_reviewRequests_nodes | null)[] | null;
}

export interface getPRs_repository_pullRequests_nodes_reviews_nodes_author {
  __typename: "Organization" | "User" | "Bot";
  /**
   * The username of the actor.
   */
  login: string;
}

export interface getPRs_repository_pullRequests_nodes_reviews_nodes {
  __typename: "PullRequestReview";
  /**
   * The actor who authored the comment.
   */
  author: getPRs_repository_pullRequests_nodes_reviews_nodes_author | null;
}

export interface getPRs_repository_pullRequests_nodes_reviews {
  __typename: "PullRequestReviewConnection";
  /**
   * A list of nodes.
   */
  nodes: (getPRs_repository_pullRequests_nodes_reviews_nodes | null)[] | null;
}

export interface getPRs_repository_pullRequests_nodes {
  __typename: "PullRequest";
  /**
   * Identifies the pull request title.
   */
  title: string;
  /**
   * Identifies the date and time when the object was created.
   */
  createdAt: any;
  /**
   * The HTTP URL for this pull request.
   */
  url: any;
  /**
   * The actor who authored the comment.
   */
  author: getPRs_repository_pullRequests_nodes_author | null;
  /**
   * A list of Users assigned to this object.
   */
  assignees: getPRs_repository_pullRequests_nodes_assignees;
  /**
   * A list of review requests associated with the pull request.
   */
  reviewRequests: getPRs_repository_pullRequests_nodes_reviewRequests | null;
  /**
   * A list of reviews associated with the pull request.
   */
  reviews: getPRs_repository_pullRequests_nodes_reviews | null;
}

export interface getPRs_repository_pullRequests {
  __typename: "PullRequestConnection";
  /**
   * A list of nodes.
   */
  nodes: (getPRs_repository_pullRequests_nodes | null)[] | null;
}

export interface getPRs_repository {
  __typename: "Repository";
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * A list of pull requests that have been opened in the repository.
   */
  pullRequests: getPRs_repository_pullRequests;
}

export interface getPRs {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  repository: getPRs_repository | null;
}

export interface getPRsVariables {
  owner: string;
  repo: string;
}
