import React from "react";
import DashBoardHeader from "../../components/Shop/layout/DashBoardHeader.jsx";
import DashboardSideBar from "../../components/Shop/layout/DashboardSideBar.jsx";

const DashBoardPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        {/* <DashboardHero /> */}
      </div>
    </div>
  );
};

export default DashBoardPage;
