import React from "react";
import RecentActivityCard from "../../cards/RecentActivityCard";

const RecentActivity = () => {
  return (
    <section className=" p-5 dark:bg-dark-secondary bg-white rounded-xl h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl dark:text-white text-black font-medium">Activity</h2>
        <button className="text-lg font-semibold dark:text-dark-text-primary   text-black">
          View All
        </button>
      </div>
      <div className="mt-5 ">
        {Array.from({ length: 5 }).map((_, index) => (
          <RecentActivityCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;
