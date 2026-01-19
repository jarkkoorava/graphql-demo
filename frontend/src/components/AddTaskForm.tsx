import type { ProjectOption } from "../types/project";
import type { TaskPriority } from "../types/task";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onCreateTask: (e: React.FormEvent) => void;
  selectedProjectId: string;
  setSelectedProjectId: (value: string) => void;
  projectOptions: ProjectOption[];
  title: string;
  setTitle: (value: string) => void;
  priority: TaskPriority;
  setPriority: (value: TaskPriority) => void;
  creating: boolean;
}

const AddTaskForm = ({
  onCreateTask,
  selectedProjectId,
  setSelectedProjectId,
  projectOptions,
  title,
  setTitle,
  priority,
  setPriority,
  creating,
}: Props) => {
  return (
    <>
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
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              style={{ marginLeft: 6 }}
            >
              <option value="">Select...</option>
              {projectOptions.map((project) => (
                <option key={uuidv4()} value={project.id}>
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
            disabled={creating || !selectedProjectId || !title.trim()}
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTaskForm;
