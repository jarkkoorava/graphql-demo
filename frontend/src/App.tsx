import "./App.css";
import { TaskActionsProvider } from "./context/TaskActionsProvider";
import {
  useCustomers,
  useCreateTask,
  useUpdateTaskStatus,
} from "./graphql/hooks";
import { useMemo, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import CustomerList from "./components/CustomerList";
import { toProjectOptions } from "./selectors/toProjectOptions";
import type { FormEvent } from "react";
import type { TaskPriority, TaskStatus } from "./types/task";

const App = () => {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");
  const statusVar = statusFilter === "ALL" ? undefined : statusFilter;
  const { data, loading, error, refetch } = useCustomers(statusVar);

  const [createTask, { loading: creating }] = useCreateTask();
  const [updateTaskStatus, { loading: updating }] = useUpdateTaskStatus();

  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");

  const projectOptions = useMemo(() => {
    const customers = data?.customers ?? [];
    return toProjectOptions(customers);
  }, [data]);

  async function onCreateTask(e: FormEvent) {
    e.preventDefault();
    if (!selectedProjectId || !title.trim()) return;

    await createTask({
      variables: {
        input: {
          projectId: selectedProjectId,
          title: title.trim(),
          priority,
        },
      },
    });

    await refetch();

    setTitle("");
    setPriority("MEDIUM");
  }

  async function toggleDone(taskId: string, current: TaskStatus) {
    const next: TaskStatus = current === "DONE" ? "TODO" : "DONE";

    await updateTaskStatus({
      variables: {
        input: {
          taskId,
          status: next,
        },
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
      <div
        style={{
          padding: 16,
          fontFamily: "system-ui, sans-serif",
          maxWidth: 900,
        }}
      >
        <h1 style={{ marginTop: 0 }}>Consultant Planner</h1>

        <label style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          Task status:
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as TaskStatus | "ALL")
            }
          >
            <option value="ALL">ALL</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </label>

        <AddTaskForm
          onCreateTask={onCreateTask}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          projectOptions={projectOptions}
          title={title}
          setTitle={setTitle}
          priority={priority}
          setPriority={setPriority}
          creating={creating}
        />

        <hr style={{ margin: "16px 0" }} />

        <CustomerList data={data.customers ?? []} />
      </div>
    </TaskActionsProvider>
  );
};

export default App;
