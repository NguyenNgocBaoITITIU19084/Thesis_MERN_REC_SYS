import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { HiOutlineUserGroup } from "react-icons/hi";
import Loader from "../layout/Loader";
import {
  Server_url,
  Api_version,
  store_end_point,
  product_end_point,
  auth_end_point,
  category_end_point,
} from "../../Server";
import axios from "axios";
import { toast } from "react-toastify";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";

const AdminDashboardMain = () => {
  const [loading, setLoading] = useState(false);
  const [sellersData, setSellersData] = useState([]);
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function fetchAllSellers() {
      await axios
        .get(`${Server_url}${Api_version}${store_end_point}/get-all`, {
          withCredentials: true,
        })
        .then((res) => {
          setSellersData([...res.data.data]);
        })
        .catch((err) => toast.error("Failed Load Users"));
    }
    async function fetchAllProductsByAdmin() {
      await axios
        .get(
          `${Server_url}${Api_version}${product_end_point}/get-products-admin`,
          { withCredentials: true }
        )
        .then((res) => {
          setProducts([...res.data.data]);
        })
        .catch((err) => toast.error("Failed Load Products"));
    }
    async function fetchAllUsers() {
      await axios
        .get(`${Server_url}${Api_version}${auth_end_point}/get-all-users`, {
          withCredentials: true,
        })
        .then((res) => {
          setUserData([...res.data.data]);
        })
        .catch((err) => toast.error("Failed Load Users"));
    }
    async function fetchAllCategories() {
      await axios
        .get(`${Server_url}${Api_version}${category_end_point}/`)
        .then((res) => {
          console.log(res);
          const check = res?.data?.data;
          if (check.length) {
            setCategory([...check]);
          }
        })
        .catch((err) => console.log(err));
    }
    fetchAllCategories();
    fetchAllUsers();
    fetchAllUsers();
    fetchAllSellers();
    fetchAllProductsByAdmin();
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const adminOrders = [];

  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push();
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            {/* <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Total Earning
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                $ {adminBalance}
              </h5>
            </div> */}

            {/* <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Sellers
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {sellersData && sellersData.length}
              </h5>
              <Link to="/admin-sellers">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
              </Link>
            </div> */}
          </div>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <HiOutlineUserGroup size={30} className="mr-2" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Total Users
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {userData && userData.length}
              </h5>
              <Link to="/admin-users">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Users Infor</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <BsHandbag size={30} className="mr-2" fill="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Products
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {products && products.length}
              </h5>
              <Link to="/admin-products">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <MdOutlineLocalOffer
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Categories
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {category && category.length}
              </h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
              </Link>
            </div>
          </div>
          <br />
          {/* <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={4}
              disableSelectionOnClick
              autoHeight
            />
          </div> */}
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
