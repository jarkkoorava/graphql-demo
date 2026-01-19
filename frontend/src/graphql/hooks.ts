import { useMutation, useQuery } from "@apollo/client";
import { CUSTOMERS_QUERY } from "./queries";
import { CREATE_TASK_MUTATION, UPDATE_TASK_STATUS_MUTATION } from "./mutations";
import type { TaskStatus } from "../types/task";
import type { UpdateTaskStatusData, UpdateTaskStatusVars } from "./types";

export const useCustomers = (status?: TaskStatus) => {
  return useQuery(CUSTOMERS_QUERY, { variables: { status: status ?? null } });
};

export const useCreateTask = () => {
  return useMutation(CREATE_TASK_MUTATION);
};

export const useUpdateTaskStatus = () => {
  return useMutation<UpdateTaskStatusData, UpdateTaskStatusVars>(
    UPDATE_TASK_STATUS_MUTATION,
  );
};
