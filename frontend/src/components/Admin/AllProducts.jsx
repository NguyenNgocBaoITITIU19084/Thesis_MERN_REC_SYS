import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye, AiFillTool } from "react-icons/ai";
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
  const [detail, setDetail] = useState();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [buttonStatus, setButtonStatus] = useState("allProducts");

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
  const handleUpdateProduct = async (productId, data) => {
    await axios
      .patch(
        `${Server_url}${Api_version}${product_end_point}/${productId}`,
        data,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const updateData = res.data.data;
        products.forEach((product) => {
          if (product._id === updateData._id) {
            product.name = updateData.name;
            product.price = updateData.price;
            product.actualPrice = updateData.actualPrice;
            product.description = updateData.description;
            product.images = [...updateData.images];
          }
        });
        toast.success("Success to Update Product");
        setOpenUpdate(false);
      })
      .catch((err) => {
        toast.error("Failed to Update Product");
      });
  };
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

  const fetchProductAuthenticated = async () => {
    await axios
      .get(`${Server_url}${Api_version}${product_end_point}/store-side`, {
        withCredentials: true,
      })
      .then((res) => {
        setProducts([...res.data.data]);
        setButtonStatus("productAuthen");
      })
      .catch((err) => console.log(err));
  };
  async function fetchAllProductsByAdmin() {
    await axios
      .get(
        `${Server_url}${Api_version}${product_end_point}/get-products-admin`,
        { withCredentials: true }
      )
      .then((res) => {
        setButtonStatus("allProducts");
        setProducts([...res.data.data]);
      })
      .catch((err) => toast.error("Failed Load Products"));
  }

  const updateActiveProduct = async (productId) => {
    await axios
      .patch(
        `${Server_url}${Api_version}${product_end_point}/set-active-product`,
        { productId },
        { withCredentials: true }
      )
      .then((res) => {
        setProducts(
          products.map((item) => {
            if (item._id === productId) {
              item.isActive = res.data.data.isActive;
            }
            return item;
          })
        );
      })
      .catch((err) => console.log(err));
  };
  const handleOpenViewForm = (productId) => {
    setDetail(products.filter((item) => item._id === productId));
    setOpenUpdate(true);
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

  const adminColumnsProduct = [
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
      field: "Active",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => updateActiveProduct(params.id)}>
              <AiFillTool size={20} />
            </Button>
          </>
        );
      },
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
            <Button onClick={() => handleOpenViewForm(params.id)}>
              <AiOutlineEye size={20} />
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
      field: "Active",
      minWidth: 80,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => updateActiveProduct(params.id)}>
              <AiFillTool size={20} />
            </Button>
          </>
        );
      },
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
            <Button onClick={() => handleOpenViewForm(params.id)}>
              <AiOutlineEye size={20} />
            </Button>
          </>
        );
      },
    },
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
            onClick={() => fetchAllProductsByAdmin()}
          >
            <span className="text-white">All Product</span>
          </div>
          <div
            className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
            onClick={() => fetchProductAuthenticated()}
          >
            <span className="text-white">All Product Store Side</span>
          </div>
          <div
            className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
            onClick={() => setOpen(true)}
          >
            <span className="text-white">Create New Product</span>
          </div>
        </div>
        <DataGrid
          rows={row}
          columns={
            buttonStatus === "allProducts" ? columns : adminColumnsProduct
          }
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
        {openUpdate && (
          <ViewDetail
            setOpen={setOpenUpdate}
            handleUpdateProduct={handleUpdateProduct}
            detailData={detail}
          />
        )}
      </div>
    </>
  );
};

export default AllProducts;

const ViewDetail = ({
  setOpen,
  productId,
  handleUpdateProduct,
  detailData,
}) => {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [actualPrice, setActualPrice] = useState();
  const [description, setDescription] = useState();
  const [soldOut, setSoldOut] = useState();
  const [rating, setRating] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [updatedAt, setUpdatedAt] = useState();
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    detailData.forEach((data) => {
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
      setProductName(data && data.name);
      setPrice(data && data.price);
      setActualPrice(data && data.actualPrice);
      setDescription(data && data.description);
      setSoldOut(data && data.soldOut);
      setRating(data && data.total_rating);
      setUpdatedAt(updatedTime);
      setCreatedAt(dataTime);
      setImages([...img]);
    });
  }, [detailData]);

  const handleFormUpdate = (e, productId) => {
    e.preventDefault();

    const data = {
      name: productName,
      price,
      actualPrice,
      description,
      brand,
      categories,
      images,
    };
    handleUpdateProduct(productId, data);
  };

  const onDeleteImageClicked = (link) => {
    const res = images.filter((image) => image.link !== link);
    setImages([...res]);
  };
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
                    <div
                      className="w-full flex justify-end absolute top-2 right-2 text-red-600"
                      onClick={() => onDeleteImageClicked(image.link)}
                    >
                      <RxCross1 size={20} className="cursor-pointer" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
};
