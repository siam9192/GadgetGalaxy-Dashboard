import CountUp from "react-countup";
import { IconType } from "react-icons/lib";
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";

interface IProps {
  data: {
    title: string;
    icon: IconType;
    value: number;
    progress: number;
  };
}
const OverviewCard = ({ data }: IProps) => {
  return (
    <div className="md:p-5 p-3 dark:bg-dark-secondary bg-white rounded-xl dark:shadow-xl">
      <div className="flex md:flex-row flex-col md:items-center gap-2">
        <span className="text-2xl dark:text-dark-text-primary text-black ">
          <data.icon />
        </span>
        <p className="font-medium dark:text-dark-text-primary text-gray-700">{data.title}</p>
      </div>
      <div
        className="
    mt-4 "
      >
        <div className="flex  flex-wrap  justify-between items-center">
          <h1 className=" text-2xl md:text-4xl dark:text-white text-black font-semibold font-primary  ">
            <CountUp start={0} end={data.value} duration={1} />
          </h1>
          {data.progress > 0 ? (
            <div className=" size-fit flex items-center  px-2 py-1 rounded-full    bg-primary text-white font-semibold ">
              <span className="text-lg">
                <MdKeyboardDoubleArrowUp />
              </span>
              <span className="text-[0.7rem]">
                +
                <CountUp start={0} end={data.progress} duration={1} />%
              </span>
            </div>
          ) : (
            <div className=" size-fit flex items-center  px-0.5 py-1 rounded-full   bg-info text-white font-semibold ">
              <span className="text-lg">
                <MdKeyboardDoubleArrowDown />
              </span>
              <span className="text-[0.7rem]">
                <CountUp start={0} end={data.progress} duration={1} />%
              </span>
            </div>
          )}
        </div>
        {data.progress > 0 ? (
          <p className="mt-3 text-green-500 font-medium text-sm">
            +{120} increased than last month
          </p>
        ) : (
          <p className="mt-3 text-red-500 font-medium md:text-sm text-[0.7rem]">
            -{120} decreased than last month
          </p>
        )}
      </div>
    </div>
  );
};

export default OverviewCard;
