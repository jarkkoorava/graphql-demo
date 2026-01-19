import { TaskActionsContext } from "./TaskActions";
import type { TaskActionsContextValue } from "./TaskActions";

export const TaskActionsProvider = ({
  value,
  children,
}: {
  value: TaskActionsContextValue;
  children: React.ReactNode;
}) => {
  return (
    <TaskActionsContext.Provider value={value}>
      {children}
    </TaskActionsContext.Provider>
  );
};
