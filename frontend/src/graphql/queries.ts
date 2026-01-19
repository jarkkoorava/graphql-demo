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
          id
          title
          status
          priority
        }
      }
    }
  }
`;
