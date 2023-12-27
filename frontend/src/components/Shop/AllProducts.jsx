import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { RxCross1 } from "react-icons/rx";
import {
  selectAllProductsStore,
  selectStoreProductsLoadingState,
  fecthProductsByStoreSide,
  deleteProductById,
  clearError,
  clearStoreProduct,
} from "../../redux/features/products/storeProductSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { Api_version, Server_url, product_end_point } from "../../Server";
const AllProducts = () => {
  const dispatch = useDispatch();

  const [openView, setOpenView] = useState(false);
  const [productId, setProductId] = useState();

  const productsStore = useSelector(selectAllProductsStore);
  const productsStroreStatus = useSelector(selectStoreProductsLoadingState);

  useEffect(() => {
    if (productsStroreStatus === "idle") {
      dispatch(fecthProductsByStoreSide());
    }
    return () => {};
  }, [dispatch, productsStroreStatus]);

  const handleDelete = (id) => {
    try {
      dispatch(deleteProductById(id))
        .unwrap()
        .then((res) => toast.success("Success Delete Product"))
        .catch((err) => toast.error("Failed to Delete Product"));
    } catch (error) {}
    window.location.reload();
  };

  const handleOpenView = (id) => {
    setOpenView(true);
    setProductId(id);
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
      minWidth: 50,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button>
              <AiOutlineEye
                size={20}
                onClick={() => handleOpenView(params.id)}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 50,
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
          {openView ? (
            <ViewDetail setOpen={setOpenView} productId={productId} />
          ) : null}
        </div>
      )}
    </>
  );
};

export default AllProducts;
const ViewDetail = ({ setOpen, productId }) => {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [actualPrice, setActualPrice] = useState();
  const [description, setDescription] = useState();
  const [soldOut, setSoldOut] = useState();
  const [rating, setRating] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [updatedAt, setUpdatedAt] = useState();
  const [images, setImages] = useState([]);
  useEffect(() => {
    async function fetchProductById(productId) {
      const response = await axios
        .get(`${Server_url}${Api_version}${product_end_point}/${productId}`)
        .then((res) => {
          const { data } = res.data;
          let dataTime =
            data &&
            data.createdAt.slice(11, 19) + " " + data.createdAt.slice(0, 10);
          let updatedTime =
            data &&
            data.updatedAt.slice(11, 19) + " " + data.updatedAt.slice(0, 10);

          let img = [];
          data.images.forEach((item) => {
            img.push(item);
          });
          console.log(data);
          setProductName(data && data.name);
          setPrice(data && data.price);
          setActualPrice(data && data.actualPrice);
          setDescription(data && data.description);
          setSoldOut(data && data.soldOut);
          setRating(data && data.total_rating);
          setUpdatedAt(updatedTime);
          setCreatedAt(dataTime);
          setImages([...img]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchProductById(productId);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center ">
      <div className="w-[90%] 800px:w-[40%] h-[100vh] bg-white rounded-md shadow p-4 overflow-auto">
        <div className="w-full flex justify-end">
          <RxCross1
            size={30}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <h5 className="text-[30px] font-Poppins text-center">Product Detail</h5>
        {/* product detail */}
        <form>
          <br />
          <div>
            <label className="pb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={productName}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Product Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={price}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Product Actual Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={actualPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setActualPrice(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Product Actual Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={actualPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setActualPrice(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              cols="30"
              required
              rows="5"
              type="text"
              name="description"
              value={description}
              className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your product description..."
            ></textarea>
          </div>
          <br />
          <div>
            <label className="pb-2">
              Total Sold Out <span className="text-red-500">{soldOut}</span>
            </label>
            <label className="pb-2 ml-9">
              Total Product's Rating{" "}
              <span className="text-red-500">{rating}</span>
            </label>
          </div>
          <br />
          <div>
            <label className="pb-2">
              Created At: <span className="text-red-500">{createdAt}</span>
            </label>
            <label className="pb-2 ml-4">
              Update At: <span className="text-red-500">{updatedAt}</span>
            </label>
          </div>
          <br />
          <div>
            <label className="pb-2">Product Images</label>
            <div className="w-full flex items-center flex-wrap">
              {images &&
                images.map((image, index) => (
                  <div className="relative">
                    <img
                      src={image.link}
                      key={index}
                      alt=""
                      className="h-[120px] w-[120px] object-cover m-2"
                    />
                    <div className="w-full flex justify-end absolute top-2 right-2 text-red-600">
                      <RxCross1 size={20} className="cursor-pointer" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Update Detail"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
