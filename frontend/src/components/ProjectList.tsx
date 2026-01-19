import type { Customer } from "../types/customer";
import type { Project } from "../types/project";
import ProjectItem from "./ProjectItem";
import { v4 as uuidv4 } from "uuid";

interface Props {
  customer: Customer;
}

const ProjectList = ({ customer }: Props) => {
  return (
    <>
      {customer.projects.map((project: Project) => (
        <ProjectItem key={uuidv4()} project={project} />
      ))}
    </>
  );
};

export default ProjectList;
