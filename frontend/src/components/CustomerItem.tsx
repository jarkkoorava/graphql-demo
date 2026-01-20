import type { Customer } from "../types/customer";
import ProjectList from "./ProjectList";

interface Props {
  customer: Customer;
}

const CustomerItem = ({ customer }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-100 shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between bg-slate-900 px-4 py-2 text-white">
        <div className="font-semibold">{customer.name}</div>
        <div className="text-sm">{customer.industry ?? "-"}</div>
      </div>

      <div className="p-4 text-gray-900">
        <ProjectList customer={customer} />
      </div>
    </div>
  );
};

export default CustomerItem;
