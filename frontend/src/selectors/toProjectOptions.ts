import type { ProjectOption } from "../types/project";
import type { Customer } from "../types/customer";

export const toProjectOptions = (customers: Customer[]): ProjectOption[] => {
  const opts: ProjectOption[] = [];

  for (const customer of customers) {
    for (const project of customer.projects) {
      opts.push({
        id: project.id,
        label: `${customer.name} / ${project.name}`,
      });
    }
  }
  return opts;
};
