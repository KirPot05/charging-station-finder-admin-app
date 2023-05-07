import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import Badge from "./Badge";

function DataTable({ columns }) {
  return (
    <div className="w-full mt-5">
      {/* Table header */}
      <div className="grid grid-cols-5 gap-x-3 text-sm my-2 px-5">
        {columns.map((col, idx) => (
          <p key={idx} className="flex items-center text-gray-500">
            {idx === 0 && <input type="checkbox" className="mr-3" />}
            <span className="font-semibold"> {col} </span>
            <ChevronUpDownIcon className="h-5 w-5 ml-2" />
          </p>
        ))}
      </div>

      {/* Table body */}
      {Array.from({ length: 6 }).map((_, id) => (
        <div
          key={id}
          className="py-3 px-5 grid grid-cols-5 gap-x-3 font-semibold text-sm even:bg-slate-100"
        >
          <p className="space-x-2">
            <input type="checkbox" />
            <span> {"MO63592DR" + (id + 1)} </span>
          </p>
          <p>08.04.2021</p>
          <p>Code 5928MD01</p>
          <p className="flex items-center">
            {" "}
            <Badge content="Completed" />{" "}
          </p>
          <p>$2500.00</p>
        </div>
      ))}
    </div>
  );
}

export default DataTable;
