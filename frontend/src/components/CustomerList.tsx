import type { Customer } from "../types/customer";
import CustomerItem from "./CustomerItem";
import { v4 as uuidv4 } from "uuid";

interface Props {
  data: Customer[];
}

const CustomerList = ({ data }: Props) => {
  return (
    <>
      {data.map((customer: Customer) => (
        <CustomerItem key={uuidv4()} customer={customer} />
      ))}
    </>
  );
};

export default CustomerList;
