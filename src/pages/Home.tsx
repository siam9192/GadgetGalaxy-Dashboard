import Overview from "../components/sections/Home/Overview";
import RecentActivity from "../components/sections/Home/RecentActivity";
import RecentOrders from "../components/sections/Home/RecentOrders";
import Statistics from "../components/sections/Home/Statistics";
import TopSellingProducts from "../components/sections/Home/TopSellingProducts";

const Home = () => {
  return (
    <div>
      <Overview />
      <div className="md:mt-10 mt-6 grid lg:grid-cols-6 grid-cols-1  gap-10">
        <div className="lg:col-span-4">
          <Statistics />
        </div>
        <div className="lg:col-span-2">
          <TopSellingProducts />
        </div>
      </div>
      <div className="md:mt-10 mt-6 grid lg:grid-cols-6 grid-cols-1  gap-10">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="lg:col-span-4">
          <Statistics />
        </div>
      </div>
    </div>
  );
};

export default Home;
