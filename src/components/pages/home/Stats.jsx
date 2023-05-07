import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Area } from "../../../components/global/charts/Area";
import { BarChart } from "../../../components/global/charts/Bar";
import Badge from "./Badge";

function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col space-y-6">
        {/* Total Income */}
        <div className="bg-white p-3 space-y-3 rounded shadow">
          <div className="flex items-center justify-between text-gray-500">
            <h4 className="font-semibold"> Total Income </h4>
            <EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer" />
          </div>
          <p className="flex items-center space-x-2">
            {" "}
            <span className="text-4xl font-semibold"> $124,563.00 </span>
            <Badge content="+6.9%" />
          </p>

          <div className="bg-gray-300 h-1 w-full relative">
            <div className="absolute top-0 w-2/3 h-1 bg-secondary"></div>
          </div>
          <p className="text-gray-400 text-sm">Yearly Goal</p>
        </div>

        {/* New Users */}
        <div className="bg-white p-3 space-y-3 rounded shadow">
          <div className="flex items-center justify-between text-gray-500">
            <h4 className="font-semibold"> New Users </h4>
            <EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer" />
          </div>
          <div className="flex items-center space-x-2">
            {" "}
            <span className="text-4xl font-semibold"> 94.2% </span>
            <Badge content="+6.9%" />
          </div>

          <BarChart />
        </div>
      </div>

      {/* Balance */}
      <div className="bg-white">
        <div className="p-4 flex items-center justify-between">
          <h4 className="font-semibold text-2xl">Balance</h4>
          <select className="border-2 text-gray-600 text-sm px-3 py-1 rounded cursor-pointer outline-none">
            <option value="">Weekly</option>
            <option value="">Monthly</option>
            <option value=""> Yearly </option>
          </select>
        </div>

        <hr />

        <div className="flex items-center justify-between p-4">
          <div className="border-2 p-3 rounded">
            <h5 className="text-gray-500 text-sm font-semibold">Earnings</h5>
            <div className="flex items-center space-x-2">
              <p className="font-semibold text-3xl">43.41%</p>
              <Badge content="+2.5%" />
            </div>
          </div>

          <div className="border-2 p-3 rounded">
            <h5 className="text-gray-500 text-sm font-semibold">Sales Value</h5>
            <div className="flex items-center space-x-2">
              <p className="font-semibold text-3xl">$95,522</p>
              <Badge content="+13.5%" />
            </div>
          </div>
        </div>

        <Area />
      </div>
    </div>
  );
}

export default Stats;
