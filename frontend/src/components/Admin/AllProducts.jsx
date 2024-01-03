import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../layout/Loader";
import axios from "axios";
import styles from "../../styles/styles";
import { useState } from "react";
import {
  Api_version,
  Server_url,
  product_end_point,
  cloudinary_end_point,
  category_end_point,
  brand_end_point,
  discount_end_point,
} from "../../Server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { AiOutlinePlusCircle } from "react-icons/ai";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const [categoriesData, setCategoriesData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [discountsData, setDiscountsData] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [actualPrice, setActualPrice] = useState();
  const [description, setDescription] = useState("");
  const [imagesResponse, setImagesResponse] = useState([]);
  const [images, setImages] = useState([]);
  const [discountApplied, setDiscountApplied] = useState();
  const [categories, setCategories] = useState();
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    async function fetchAllCategories() {
      await axios
        .get(`${Server_url}${Api_version}${category_end_point}/`)
        .then((res) => {
          setCategoriesData([...res.data.data]);
        })
        .catch((err) => toast.error("Failed Load Categories"));
    }
    async function fetchAllBrands() {
      await axios
        .get(`${Server_url}${Api_version}${brand_end_point}/`)
        .then((res) => {
          setBrandsData([...res.data.data]);
        })
        .catch((err) => toast.error("Failed Load Brands"));
    }
    async function fetchAllDiscounts() {
      await axios
        .get(`${Server_url}${Api_version}${discount_end_point}/`)
        .then((res) => {
          setDiscountsData([...res.data.data]);
        })
        .catch((err) => toast.error("Failed Load Brands"));
    }
    fetchAllProductsByAdmin();
    fetchAllCategories();
    fetchAllBrands();
    fetchAllDiscounts();
    return () => {
      setProducts([]);
      setCategoriesData([]);
      setBrandsData([]);
      setDiscountsData([]);
    };
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    var formData = new FormData();

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
      formData.append("image", file);
    });
    axios
      .post(
        `${Server_url}${Api_version}${cloudinary_end_point}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        let responseArr = [];
        res.data.data.forEach((item) => {
          responseArr.push(item);
        });
        setImagesResponse([...responseArr]);
        toast.success("Success Upload Images");
      })
      .catch((err) => {
        toast.error("Fail to Upload Images");
      });
  };
  const handleDelete = async (id) => {
    await axios
      .delete(`${Server_url}${Api_version}${product_end_point}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data.data;
        setProducts(products.filter((product) => product._id !== data._id));
        toast.success("Success to Delete Product");
      })
      .catch((err) => {
        toast.error("Failed to Delete Product");
      });
  };

  const onCreateProductClicked = async (e) => {
    e.preventDefault();
    const data = {
      name,
      price,
      actualPrice,
      description,
      images: imagesResponse,
      discountApplied,
      categories,
      brand,
    };
    console.log("create product", data);
    await axios
      .post(
        `${Server_url}${Api_version}${product_end_point}/create-product-admin`,
        data,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setName("");
        setPrice();
        setActualPrice();
        setDescription("");
        setImages([]);
        setDiscountApplied();
        setCategories();
        setBrand();
        setOpen(false);
        toast.success("Success Create a New Product");
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 80,
      flex: 0.6,
    },
    {
      field: "createdBy",
      headerName: "Shop Name",
      minWidth: 160,
      flex: 0.5,
    },
    {
      field: "isActive",
      headerName: "Status",
      minWidth: 120,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "isActive") === true
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 140,
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
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </>
        );
      },
    },
    // {
    //   field: "Delete",
    //   flex: 0.8,
    //   minWidth: 50,
    //   headerName: "",
    //   type: "number",
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Button onClick={() => handleDelete(params.id)}>
    //           <AiOutlineDelete size={20} />
    //         </Button>
    //       </>
    //     );
    //   },
    // },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "$" + item.price,
        createdBy: item?.createdBy?.name ? item?.createdBy?.name : "admin",
        isActive: item.isActive,
        sold: item.soldOut,
      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <div className="w-full flex justify-end">
          <div
            className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
            onClick={() => setOpen(true)}
          >
            <span className="text-white">Create New Product</span>
          </div>
        </div>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
        {open && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
            <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-auto">
              <div className="w-full flex justify-end">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h5 className="text-[30px] font-Poppins text-center">
                Create New Product
              </h5>
              {/* create coupoun code */}
              <form>
                <br />
                <div>
                  <label className="pb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your product name..."
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
                    rows="8"
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
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full mt-2 border h-[35px] rounded-[5px]"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                  >
                    <option value="Choose a category">Choose a category</option>
                    {categoriesData &&
                      categoriesData.map((i, index) => (
                        <option value={i._id} key={index}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full mt-2 border h-[35px] rounded-[5px]"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="Choose a brand">Choose a brand</option>
                    {brandsData &&
                      brandsData.map((i, index) => (
                        <option value={i._id} key={index}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Discount Applied <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full mt-2 border h-[35px] rounded-[5px]"
                    value={discountApplied}
                    onChange={(e) => setDiscountApplied(e.target.value)}
                  >
                    <option value="Choose a brand">
                      Choose a discount Applied
                    </option>
                    {discountsData &&
                      discountsData.map((i, index) => (
                        <option value={i._id} key={index}>
                          {i.code}
                        </option>
                      ))}
                  </select>
                </div>
                <br />
                <div>
                  <label className="pb-2">Actual Price</label>
                  <input
                    type="number"
                    name="price"
                    value={actualPrice}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setActualPrice(e.target.value)}
                    placeholder="Enter your product price..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Price (With Discount){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={price}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter your product price with discount..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Upload Images <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name=""
                    id="upload"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                  />
                  <div className="w-full flex items-center flex-wrap">
                    <label htmlFor="upload">
                      <AiOutlinePlusCircle
                        size={30}
                        className="mt-3"
                        color="#555"
                      />
                    </label>
                    {images &&
                      images.map((i) => (
                        <img
                          src={i}
                          key={i}
                          alt=""
                          className="h-[120px] w-[120px] object-cover m-2"
                        />
                      ))}
                  </div>
                  <br />
                  <div>
                    <input
                      onClick={(e) => onCreateProductClicked(e)}
                      type="submit"
                      value="Create"
                      className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
