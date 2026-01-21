import { TaskActionsProvider } from "./context/TaskActionsProvider";
import { useCustomers, useUpdateTaskStatus } from "./graphql/hooks";
import { useMemo, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import CustomerList from "./components/CustomerList";
import { toProjectOptions } from "./selectors/toProjectOptions";
import type { TaskStatus } from "./types/task";
import StatusFilter from "./components/StatusFilter";
import { nextStatus } from "./utils/utils";

const App = () => {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");
  const statusVar = statusFilter === "ALL" ? undefined : statusFilter;
  const { data, loading, error, refetch } = useCustomers(statusVar);

  const [updateTaskStatus, { loading: updating }] = useUpdateTaskStatus();

  const projectOptions = useMemo(() => {
    const customers = data?.customers ?? [];
    return toProjectOptions(customers);
  }, [data]);

  async function toggleDone(taskId: string, current: TaskStatus) {
    const next = nextStatus(current);

    await updateTaskStatus({
      variables: {
        input: { taskId, status: next },
      },
      optimisticResponse: {
        updateTaskStatus: {
          __typename: "Task",
          id: taskId,
          status: next,
        },
      },
      update(cache, result) {
        const updated = result.data?.updateTaskStatus;
        if (!updated) return;

        cache.modify({
          id: cache.identify({ __typename: "Task", id: updated.id }),
          fields: {
            status() {
              return updated.status;
            },
          },
        });
      },
    });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <TaskActionsProvider value={{ toggleDone, updating }}>
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-6">
          Project task tool
        </h1>

        <AddTaskForm
          projectOptions={projectOptions}
          onTaskCreated={async () => {
            await refetch();
          }}
        />

        <StatusFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <CustomerList data={data.customers ?? []} />
      </div>
    </TaskActionsProvider>
  );
};

export default App;
