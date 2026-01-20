import { useTaskActions } from "../context/TaskActions";
import type { Task, TaskStatus } from "../types/task";
import {
  nextStatus,
  priorityClass,
  priorityText,
  statusText,
} from "../utils/utils";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const { toggleDone, updating } = useTaskActions();
  const next = nextStatus(task.status as TaskStatus);
  return (
    <li className="p-2 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">
            {task.title} - {statusText(task.status)}{" "}
          </span>
        </div>

        <div className="text-sm">
          <span className={priorityClass(task.priority)}>
            {priorityText(task.priority)}
          </span>
        </div>
      </div>
      <button
        className="rounded-sm px-2 py-1 bg-slate-300 font-medium text-black"
        onClick={() => toggleDone(task.id, task.status as TaskStatus)}
        disabled={updating}
      >
        {next === "IN_PROGRESS" && "Start doing task"}
        {next === "DONE" && "Mark task done"}
        {next === "TODO" && "Reset task to not done"}
      </button>
    </li>
  );
};

export default TaskItem;
