import React from "react";
import AdminHeader from "../../components/Admin/layout/AdminHeader.jsx";
import AdminSideBar from "../../components/Admin/layout/AdminSideBar.jsx";
import AllBrands from "../../components/Admin/AllBrands.jsx";
const AdminDashboardBrand = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={7} />
          </div>
          <AllBrands />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardBrand;
