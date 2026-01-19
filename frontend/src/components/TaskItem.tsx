import { useTaskActions } from "../context/TaskActions";
import type { Task, TaskStatus } from "../types/task";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const { toggleDone, updating } = useTaskActions();
  return (
    <>
      <li key={task.id} style={{ marginBottom: 6 }}>
        <button
          onClick={() => toggleDone(task.id, task.status as TaskStatus)}
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
    </>
  );
};

export default TaskItem;
