import React from "react";
import DashboardHeader from "../../components/Shop/layout/DashBoardHeader";
import DashboardSideBar from "../../components/Shop/layout/DashboardSideBar";
import AllOrders from "../../components/Shop/AllOrders.jsx";

const ShopAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
