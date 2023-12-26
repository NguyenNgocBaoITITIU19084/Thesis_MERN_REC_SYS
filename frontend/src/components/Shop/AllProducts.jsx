import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import {
  selectAllProductsStore,
  selectStoreProductsLoadingState,
  fecthProductsByStoreSide,
  deleteProductById,
} from "../../redux/features/products/storeProductSlice";
import { toast } from "react-toastify";
const AllProducts = () => {
  const dispatch = useDispatch();

  const productsStore = useSelector(selectAllProductsStore);
  const productsStroreStatus = useSelector(selectStoreProductsLoadingState);

  useEffect(() => {
    if (productsStroreStatus === "idle") {
      dispatch(fecthProductsByStoreSide());
    }
  }, [dispatch, productsStroreStatus]);

  const handleDelete = (id) => {
    console.log(id);
    try {
      dispatch(deleteProductById(id))
        .unwrap()
        .then((res) => toast.success("Success Delete Product"))
        .catch((err) => toast.error("Failed to Delete Product"));
    } catch (error) {}
    window.location.reload();
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "actualPrice",
      headerName: "Actual Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  productsStore &&
    productsStore.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "$" + item.price,
        actualPrice: item.actualPrice,
        sold: item?.soldOut,
      });
    });

  return (
    <>
      {productsStroreStatus === "loading" ? (
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

export default AllProducts;
