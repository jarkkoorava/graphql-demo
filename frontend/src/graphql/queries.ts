import { gql } from "@apollo/client";

export const CUSTOMERS_QUERY = gql`
  query Customers($status: TaskStatus) {
    customers {
      id
      name
      industry
      projects {
        id
        name
        tasks(status: $status) {
          __typename
          id
          title
          status
          priority
        }
      }
    }
  }
`;
