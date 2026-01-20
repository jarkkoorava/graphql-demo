import type { Project } from "../types/project";
import { TaskList } from "./TaskList";

interface Props {
  project: Project;
}

const ProjectItem = ({ project }: Props) => {
  return (
    <div className="overflow-hidden rounded-md bg-slate-100 shadow-sm border border-gray-200 mb-4">
      <h3
        className="flex justify-between bg-slate-700
       px-4 py-2 text-white"
      >
        Project: {project.name}
      </h3>

      {project.tasks.length === 0 ? (
        <div>No tasks for this project</div>
      ) : (
        <ul>
          <TaskList project={project} />
        </ul>
      )}
    </div>
  );
};

export default ProjectItem;
