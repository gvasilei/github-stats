/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeStar
// ====================================================

export interface removeStar_removeStar_starrable {
  __typename: "Repository" | "Topic" | "Gist";
  id: string;
  /**
   * Returns a boolean indicating whether the viewing user has starred this starrable.
   */
  viewerHasStarred: boolean;
}

export interface removeStar_removeStar {
  __typename: "RemoveStarPayload";
  /**
   * The starrable.
   * 
   * **Upcoming Change on 2019-01-01 UTC**
   * **Description:** Type for `starrable` will change from `Starrable!` to `Starrable`.
   * **Reason:** In preparation for an upcoming change to the way we report
   * mutation errors, non-nullable payload fields are becoming nullable.
   */
  starrable: removeStar_removeStar_starrable;
}

export interface removeStar {
  /**
   * Removes a star from a Starrable.
   */
  removeStar: removeStar_removeStar | null;
}

export interface removeStarVariables {
  id: string;
}
