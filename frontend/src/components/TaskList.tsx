import type { Project } from "../types/project";
import type { Task } from "../types/task";
import TaskItem from "./TaskItem";
import { v4 as uuidv4 } from "uuid";

interface Props {
  project: Project;
}

export const TaskList = ({ project }: Props) => {
  return (
    <>
      {project.tasks.map((task: Task) => (
        <TaskItem key={uuidv4()} task={task} />
      ))}
    </>
  );
};
