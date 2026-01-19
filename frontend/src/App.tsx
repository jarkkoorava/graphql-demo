import "./App.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";

const CUSTOMERS = gql`
  query Customers {
    customers {
      id
      name
      industry
      projects {
        id
        name
        tasks {
          id
          title
          status
          priority
        }
      }
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      status
      priority
    }
  }
`;

const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($input: UpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
      id
      title
      status
      priority
    }
  }
`;

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

const App = () => {
  const { data, loading, error, refetch } = useQuery(CUSTOMERS);

  const [createTask, { loading: creating }] = useMutation(CREATE_TASK);
  const [updateTaskStatus, { loading: updating }] =
    useMutation(UPDATE_TASK_STATUS);

  const [selectProjectId, setSelectProjectId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");

  const projectOptions = useMemo(() => {
    const customers = data?.customers ?? [];
    const opts: Array<{ id: string; label: string }> = [];
    for (const c of customers) {
      for (const p of c.projects) {
        opts.push({ id: p.id, label: `${c.name} / ${p.name}` });
      }
    }
    return opts;
  }, [data]);

  async function onCreateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!selectProjectId || !title.trim()) return;

    await createTask({
      variables: {
        input: {
          projectId: selectProjectId,
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
    });

    await refetch();
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      style={{
        padding: 16,
        fontFamily: "system-ui, sans-serif",
        maxWidth: 900,
      }}
    >
      <h1 style={{ marginTop: 0 }}>Consultant Planner</h1>

      <form
        onSubmit={onCreateTask}
        style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}
      >
        <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>
          Quick add task
        </h2>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <label>
            Project{" "}
            <select
              value={selectProjectId}
              onChange={(e) => setSelectProjectId(e.target.value)}
              style={{ marginLeft: 6 }}
            >
              <option value="">Select...</option>
              {projectOptions.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Title{" "}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write title here"
              style={{ marginLeft: 6 }}
            />
          </label>

          <label>
            Priority{" "}
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              style={{ marginLeft: 6 }}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={creating || !selectProjectId || !title.trim()}
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>
      </form>

      <hr style={{ margin: "16px 0" }} />

      {data.customers.map((customer: any) => (
        <div key={customer.id} style={{ marginBottom: 20 }}>
          <h2 style={{ marginBottom: 4 }}>
            {customer.name}{" "}
            <span style={{ fontSize: 14, fontWeight: 400 }}>
              ({customer.industry ?? "-"})
            </span>
          </h2>

          {customer.projects.map((project: any) => (
            <div key={project.id} style={{ marginLeft: 16, marginTop: 10 }}>
              <h3 style={{ margin: "8px 0" }}>{project.name}</h3>

              {project.tasks.length === 0 ? (
                <div style={{ marginLeft: 16, opacity: 0.7 }}>No tasks</div>
              ) : (
                <ul style={{ marginTop: 6 }}>
                  {project.tasks.map((task: any) => (
                    <li key={task.id} style={{ marginBottom: 6 }}>
                      <button
                        onClick={() =>
                          toggleDone(task.id, task.status as TaskStatus)
                        }
                        disabled={updating}
                        style={{ marginRight: 8 }}
                      >
                        {task.status === "DONE" ? "undo" : "done"}
                      </button>
                      <strong>{task.title}</strong>{" "}
                      <span style={{ opacity: 0.75 }}>
                        - {task.status} / {task.priority}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
