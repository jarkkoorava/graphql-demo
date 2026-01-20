import { useState } from "react";
import type { ProjectOption } from "../types/project";
import type { TaskPriority } from "../types/task";

interface Props {
  onCreateTask: (e: React.FormEvent) => void;
  selectedProjectId: string;
  setSelectedProjectId: (value: string) => void;
  projectOptions: ProjectOption[];
  title: string;
  setTitle: (value: string) => void;
  priority: TaskPriority;
  setPriority: (value: TaskPriority) => void;
  creating: boolean;
}

const AddTaskForm = ({
  onCreateTask,
  selectedProjectId,
  setSelectedProjectId,
  projectOptions,
  title,
  setTitle,
  priority,
  setPriority,
  creating,
}: Props) => {
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  return (
    <form
      onSubmit={onCreateTask}
      className="overflow-hidden rounded-xl bg-slate-100 shadow-sm border border-gray-200 mb-4"
    >
      {/* Header (always visible) */}
      <div className="flex items-center justify-between bg-slate-900 px-4 py-2 text-white">
        <div className="font-semibold">Quick add task</div>

        <button
          type="button"
          onClick={() => setQuickAddOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-slate-200 hover:bg-white/10"
          aria-expanded={quickAddOpen}
          aria-controls="quick-add-body"
        >
          <span className="hidden sm:inline">
            {quickAddOpen ? "Hide" : "Show"}
          </span>
          <span className="text-lg leading-none">
            {quickAddOpen ? "▴" : "▾"}
          </span>
        </button>
      </div>

      {/* Body (collapsible) */}
      {quickAddOpen && (
        <div id="quick-add-body" className="p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
            {/* Project */}
            <div className="md:col-span-5">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Project
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="">Select a project</option>
                {projectOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="md:col-span-5">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Task name
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write task name here"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                           placeholder:text-slate-400
                           focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            {/* Priority */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as typeof priority)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="submit"
              disabled={creating || !selectedProjectId || !title.trim()}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white
                         hover:bg-slate-800
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddTaskForm;
