import type { TaskStatus } from "../types/task";

export const nextStatus = (current: TaskStatus): TaskStatus => {
  switch (current) {
    case "TODO":
      return "IN_PROGRESS";
    case "IN_PROGRESS":
      return "DONE";
    case "DONE":
      return "TODO";
    default:
      return "TODO";
  }
};

export const priorityClass = (priority: "LOW" | "MEDIUM" | "HIGH") => {
  switch (priority) {
    case "LOW":
      return "text-green-400 font-semibold";
    case "MEDIUM":
      return "text-yellow-400 font-semibold";
    case "HIGH":
      return "text-red-400 font-semibold";
  }
};

export const priorityText = (priority: "LOW" | "MEDIUM" | "HIGH") => {
  switch (priority) {
    case "LOW":
      return "Low priority";
    case "MEDIUM":
      return "Medium priority";
    case "HIGH":
      return "High priority";
  }
};

export const statusText = (status: "TODO" | "IN_PROGRESS" | "DONE") => {
  switch (status) {
    case "TODO":
      return "Task is not done";
    case "DONE":
      return "Task is done";
    case "IN_PROGRESS":
      return "Task is in progress";
  }
};
