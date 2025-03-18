import React from "react";
import { AiFillProduct } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { TbCoinTaka } from "react-icons/tb";
import { TiGroup } from "react-icons/ti";
import OverviewCard from "../../cards/OverviewCard";

const Overview = () => {
  const data = [
    {
      title: "Total Orders",
      icon: IoCartOutline,
      value: 3783,
      progress: -49,
    },
    {
      title: "Total Products",
      icon: AiFillProduct,
      value: 3783,
      progress: 23,
    },
    {
      title: "Total Transactions",
      icon: TbCoinTaka,
      value: 3783,
      progress: 23,
    },
    {
      title: "Users",
      icon: TiGroup,
      value: 3783,
      progress: 23,
    },
  ];
  return (
    <section className="grid lg:grid-cols-4  grid-cols-2 md:gap-5 gap-2">
      {data.map((item, index) => (
        <OverviewCard data={item} key={index} />
      ))}
    </section>
  );
};

export default Overview;
