import React from "react";

const RecentOrders = () => {
  return (
    <section className="p-5 dark:bg-dark-secondary bg-white rounded-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-xl dark:text-white text-black font-medium">Recent Orders</h2>
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
    </section>
  );
};

export default RecentOrders;
