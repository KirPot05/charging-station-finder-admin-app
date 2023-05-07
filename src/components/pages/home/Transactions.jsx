import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import DataTable from "./DataTable";

function Transactions() {
  const columns = [
    "Invoice ID",
    "Date",
    "Description",
    "Status",
    "Descriptions",
  ];

  return (
    <div className="mt-10 bg-white">
      <div className="flex items-center justify-between p-5">
        <h4 className="text-2xl font-semibold">Recent Transactions</h4>
        <button className="flex items-center space-x-2 bg-primary p-2 rounded text-white text-sm">
          <ArrowUpTrayIcon className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      <div className="space-x-4 border-b-2 px-5">
        <button className="p-2 font-semibold focus:text-primary focus:border-b-2 focus:border-primary">
          {" "}
          Incoming{" "}
        </button>
        <button className="p-2 font-semibold focus:text-primary border-b-2 border-white focus:border-primary">
          {" "}
          Invoices{" "}
        </button>
      </div>

      <DataTable columns={columns} />
    </div>
  );
}

export default Transactions;
