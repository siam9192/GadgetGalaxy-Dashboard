import React from "react";
import { useCountUp } from "react-countup";

interface IProps {
  value: number;
  max: number;
}

const CustomChartBar = ({ value, max }: IProps) => {
  return (
    <div className="bg-blue-100 flex flex-col justify-end rounded-t-lg h-full w-fit">
      <div
        className="lg:w-10 md:w-7 w-2 rounded-t-lg   bg-primary transition-all duration-100"
        style={{ height: `${(value / max) * 100}%` }}
      ></div>
    </div>
  );
};

export default CustomChartBar;
