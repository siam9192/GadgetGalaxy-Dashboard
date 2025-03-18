import React from "react";
import { monthNames } from "../../../utils/constant";
import CustomChartBar from "../../ui/CustomChartBar";

type TData = {
  month: number;
  total: number;
};
const Statistics = () => {
  const data: TData[] = Array.from({ length: 12 }).map((_, index) => ({
    month: index + 1,
    total: Math.round(Math.random() * 10000),
  }));
  let max = Math.max(...data.map((item) => item.total));
  max = max * 0.1 + max;
  return (
    <section className=" md:p-5 p-3 dark:bg-dark-secondary bg-white rounded-xl">
      <div className="flex md:flex-row flex-col justify-between items-center">
        <h2 className="text-xl dark:text-white text-black font-medium">Product Selling</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-primary"></div>
            <p className="dark:text-dark-text-primary text-gray-800">Product Sold</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-blue-100 "></div>
            <p className="dark:text-dark-text-primary text-gray-800">Product Return</p>
          </div>
        </div>
      </div>
      <div className="p-5 h-[40vh]">
        <div className="flex  justify-between h-full">
          {data.map((item, index) => (
            <div key={index} className="h-full">
              <CustomChartBar value={item.total} max={max} />
              <p className="dark:text-dark-text-primary md:text-[1rem] text-[0.6rem] text-center">
                {monthNames[index].slice(0, 3)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center dark:text-white text-gray-900 mt-3">Month</p>
    </section>
  );
};

export default Statistics;
