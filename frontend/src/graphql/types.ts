import type { TaskStatus } from "../types/task";

export interface UpdateTaskStatusData {
  updateTaskStatus: {
    __typename: "Task";
    id: string;
    status: TaskStatus;
  };
}

export interface UpdateTaskStatusVars {
  input: {
    taskId: string;
    status: TaskStatus;
  };
}
