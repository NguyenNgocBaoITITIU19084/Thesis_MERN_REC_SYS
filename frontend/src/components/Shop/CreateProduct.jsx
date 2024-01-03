import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fecthCategories,
  selectAllCategories,
  selectLoadingState,
} from "../../redux/features/categories/categoriesSlice";
import {
  fecthBrands,
  selectAllBrands,
  selectBrandLoadingState,
} from "../../redux/features/brands/brandsSlice";
import {
  selectAllDiscounts,
  selectDiscountState,
  clearDiscountList,
  clearError,
  fecthDiscounts,
} from "../../redux/features/discounts/discountsSlice.js";
import { createProduct } from "../../redux/features/products/productsSlice.js";
import { Server_url, Api_version, cloudinary_end_point } from "../../Server.js";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoriesData = useSelector(selectAllCategories);
  const cateStatus = useSelector(selectLoadingState);

  const brandsData = useSelector(selectAllBrands);
  const brandStatus = useSelector(selectBrandLoadingState);

  const discountStatus = useSelector(selectDiscountState);
  const discountsData = useSelector(selectAllDiscounts);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [actualPrice, setActualPrice] = useState();
  const [description, setDescription] = useState("");
  const [imagesResponse, setImagesResponse] = useState([]);
  const [images, setImages] = useState([]);
  const [discountApplied, setDiscountApplied] = useState();
  const [categories, setCategories] = useState();
  const [brand, setBrand] = useState("");
  const [requestStatus, setRequestStatus] = useState(false);

  useEffect(() => {
    if (discountStatus === "idle") {
      dispatch(fecthDiscounts());
    }
    if (brandStatus === "idle") {
      dispatch(fecthBrands());
    }
    if (cateStatus === "idle") {
      dispatch(fecthCategories());
    }
    return () => {
      clearError();
      clearDiscountList();
    };
  }, [dispatch, discountStatus]);

  const onCreateProductClicked = (e) => {
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

    if (requestStatus === false) {
      try {
        setRequestStatus(true);
        dispatch(createProduct(data))
          .unwrap()
          .then((result) => {
            toast.success("Success Created Product!");
            setName("");
            setPrice();
            setActualPrice();
            setDescription("");
            setImages([]);
            setDiscountApplied();
            setCategories();
            setBrand();
            navigate("/dashboard-products");
          })
          .catch((err) => {
            toast.error(err);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setRequestStatus(false);
      }
    }
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

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
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
            <option value="Choose a brand">Choose a discount Applied</option>
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
            Price (With Discount) <span className="text-red-500">*</span>
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
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
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
              onClick={onCreateProductClicked}
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
