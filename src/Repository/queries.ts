import gql from "graphql-tag";

export const STAR_REPOSITORY = gql`
  mutation addStar($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const UNSTAR_REPOSITORY = gql`
  mutation removeStar($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const UPDATE_SUBSCRIPTION = gql`
  mutation updateSubscription($id: ID!, $state: SubscriptionState!) {
    updateSubscription(input: { subscribableId: $id, state: $state }) {
      subscribable {
        id
        viewerCanSubscribe
        viewerSubscription
      }
    }
  }
`;
