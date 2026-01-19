import { createContext, useContext } from "react";
import type { TaskStatus } from "../types/task";

export const TaskActionsContext = createContext<
  TaskActionsContextValue | undefined
>(undefined);

export interface TaskActionsContextValue {
  toggleDone: (taskId: string, current: TaskStatus) => Promise<void> | void;
  updating: boolean;
}

export const useTaskActions = (): TaskActionsContextValue => {
  const context = useContext(TaskActionsContext);
  if (!context) {
    throw new Error("useTaskActions must be used within TaskActionsProvider");
  }
  return context;
};
