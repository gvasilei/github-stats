/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addStar
// ====================================================

export interface addStar_addStar_starrable {
  __typename: "Repository" | "Topic" | "Gist";
  id: string;
  /**
   * Returns a boolean indicating whether the viewing user has starred this starrable.
   */
  viewerHasStarred: boolean;
}

export interface addStar_addStar {
  __typename: "AddStarPayload";
  /**
   * The starrable.
   * 
   * **Upcoming Change on 2019-01-01 UTC**
   * **Description:** Type for `starrable` will change from `Starrable!` to `Starrable`.
   * **Reason:** In preparation for an upcoming change to the way we report
   * mutation errors, non-nullable payload fields are becoming nullable.
   */
  starrable: addStar_addStar_starrable;
}

export interface addStar {
  /**
   * Adds a star to a Starrable.
   */
  addStar: addStar_addStar | null;
}

export interface addStarVariables {
  id: string;
}
