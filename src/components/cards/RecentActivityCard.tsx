import React from "react";

const RecentActivityCard = () => {
  return (
    <div className="md:p-3 p-2 flex items-center gap-2 ">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3001/3001758.png"
        alt=""
        className="size-10 rounded-full outline-2 outline-offset-2  outline-primary"
      />
      <div className="space-y-1">
        <h4 className="text-lg dark:text-white font-medium">John Doe</h4>
        <p className="dark:text-dark-text-primary text-gray-700 font-medium">
          Canceled A order id=37674444
        </p>
      </div>
    </div>
  );
};

export default RecentActivityCard;
