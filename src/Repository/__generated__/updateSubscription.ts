/* tslint:disable */
// This file was automatically generated and should not be edited.

import { SubscriptionState } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateSubscription
// ====================================================

export interface updateSubscription_updateSubscription_subscribable {
  __typename: "Issue" | "Repository" | "PullRequest" | "Commit" | "Team";
  id: string;
  /**
   * Check if the viewer is able to change their subscription status for the repository.
   */
  viewerCanSubscribe: boolean;
  /**
   * Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
   */
  viewerSubscription: SubscriptionState | null;
}

export interface updateSubscription_updateSubscription {
  __typename: "UpdateSubscriptionPayload";
  /**
   * The input subscribable entity.
   * 
   * **Upcoming Change on 2019-01-01 UTC**
   * **Description:** Type for `subscribable` will change from `Subscribable!` to `Subscribable`.
   * **Reason:** In preparation for an upcoming change to the way we report
   * mutation errors, non-nullable payload fields are becoming nullable.
   */
  subscribable: updateSubscription_updateSubscription_subscribable;
}

export interface updateSubscription {
  /**
   * Updates the state for subscribable subjects.
   */
  updateSubscription: updateSubscription_updateSubscription | null;
}

export interface updateSubscriptionVariables {
  id: string;
  state: SubscriptionState;
}
