import { useMutation, useQuery } from "@apollo/client";
import { CUSTOMERS_QUERY } from "./queries";
import { CREATE_TASK_MUTATION, UPDATE_TASK_STATUS_MUTATION } from "./mutations";
import type { TaskStatus } from "../types/task";

export const useCustomers = (status?: TaskStatus) => {
  return useQuery(CUSTOMERS_QUERY, { variables: { status: status ?? null } });
};

export const useCreateTask = () => {
  return useMutation(CREATE_TASK_MUTATION);
};

export const useUpdateTaskStatus = () => {
  return useMutation(UPDATE_TASK_STATUS_MUTATION);
};
