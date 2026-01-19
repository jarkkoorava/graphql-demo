import { gql } from "@apollo/client";

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      status
      priority
    }
  }
`;

export const UPDATE_TASK_STATUS_MUTATION = gql`
  mutation UpdateTaskStatus($input: UpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
      id
      title
      status
      priority
    }
  }
`;
