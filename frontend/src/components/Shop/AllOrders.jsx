import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";
import { Server_url, Api_version, order_end_point } from "../../Server";
import { toast } from "react-toastify";
const AllOrders = () => {
  const [isLoading, setIsLoading] = useState();
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      await axios
        .get(`${Server_url}${Api_version}${order_end_point}/get-all-orders`, {
          withCredentials: true,
        })
        .then((res) => {
          const data = res.data.data;
          setOrders([...data]);
          data.forEach((item) => {
            let totalPrice = 0;

            item.orderList.forEach((product) => {
              console.log(
                (totalPrice =
                  totalPrice + product.productId.price * product.quantity)
              );
              setTotal([...total, totalPrice]);
            });
          });
        })
        .catch((err) => toast.error(err.response.data.message));
    }
    fetchOrders();
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
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item?._id,
        itemsQty: item?.orderItems?.length,
        total: "US$ " + Math.floor(Math.random() * (10000 - 1000 + 1) + 1000),
        status: item?.status,
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllOrders;
