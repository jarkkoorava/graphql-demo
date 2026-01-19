import type { Task } from "./task";

export interface ProjectOption {
  id: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}
