import React from "react";

const TopSellingProducts = () => {
  return (
    <section className=" p-5 dark:bg-dark-secondary bg-white rounded-xl h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl dark:text-white text-black font-medium">Top Selling Products</h2>
      </div>
      <div className="mt-5 ">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex items-center gap-2 md:p-3 p-2 dark:hover:bg-dark-primary hover:bg-gray-100 hover:rounded-lg  ">
            <img
              src="https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-14-Pro-Deep-Purple-7300.jpg"
              alt=""
              className="size-10 rounded-md"
            />
            <div className="w-full">
              <h3 className="dark:text-white text-lg font-medium">I Phone 15 pro max</h3>
              <div className="flex items-center gap-2 w-full">
                <div className="bg-blue-50    w-full rounded-lg   ">
                  <div className="lg:h-3 h-2 bg-primary rounded-lg  w-[80%]"></div>
                </div>
                <p className="dark:text-dark-text-primary font-medium">20%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSellingProducts;
