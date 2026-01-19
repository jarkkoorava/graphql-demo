import type { Customer } from "../types/customer";
import ProjectList from "./ProjectList";

interface Props {
  customer: Customer;
}

const CustomerItem = ({ customer }: Props) => {
  return (
    <div key={customer.id} style={{ marginBottom: 20 }}>
      <h2 style={{ marginBottom: 4 }}>
        {customer.name}{" "}
        <span style={{ fontSize: 14, fontWeight: 400 }}>
          ({customer.industry ?? "-"})
        </span>
      </h2>

      <ProjectList customer={customer} />
    </div>
  );
};

export default CustomerItem;
