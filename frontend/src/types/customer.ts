import type { Project } from "./project";

export interface Customer {
  id: string;
  name: string;
  industry?: string | null;
  projects: Project[];
}
