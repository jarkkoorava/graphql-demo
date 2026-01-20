import type { TaskStatus } from "../types/task";

type StatusFilterValue = TaskStatus | "ALL";

interface Props {
  statusFilter: StatusFilterValue;
  setStatusFilter: (value: StatusFilterValue) => void;
}

const StatusFilter = ({ statusFilter, setStatusFilter }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-100 shadow-sm border border-gray-200 mb-4">
      <div className="flex items-center justify-between bg-slate-900 px-4 py-2 text-white">
        <div className="font-semibold">Task filter</div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-200">Show tasks:</span>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as StatusFilterValue)
            }
            className="rounded-md bg-slate-800 px-2 py-1 text-sm text-white
                       border border-white/20
                       focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <option value="ALL">All tasks</option>
            <option value="TODO">Tasks not done</option>
            <option value="IN_PROGRESS">Tasks in progress</option>
            <option value="DONE">Tasks done</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;
