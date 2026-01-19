import type { Project } from "../types/project";
import { TaskList } from "./TaskList";

interface Props {
  project: Project;
}

const ProjectItem = ({ project }: Props) => {
  return (
    <div key={project.id} style={{ marginLeft: 16, marginTop: 10 }}>
      <h3 style={{ margin: "8px 0" }}>{project.name}</h3>

      {project.tasks.length === 0 ? (
        <div style={{ marginLeft: 16, opacity: 0.7 }}>No tasks</div>
      ) : (
        <ul style={{ marginTop: 6 }}>
          <TaskList project={project} />
        </ul>
      )}
    </div>
  );
};

export default ProjectItem;
