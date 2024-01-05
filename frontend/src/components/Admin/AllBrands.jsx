import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Api_version,
  Server_url,
  brand_end_point,
  cloudinary_end_point,
} from "../../Server";

const AllBrands = () => {
  const [createForm, setCreateForm] = useState(false);
  const [imagesResponse, setImagesResponse] = useState([]);
  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    async function fetchAllBrands() {
      await axios
        .get(`${Server_url}${Api_version}${brand_end_point}/`)
        .then((res) => {
          console.log(res);
          setBrands([...res?.data?.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchAllBrands();
    return () => {
      setBrands([]);
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
      .delete(`${Server_url}${Api_version}${brand_end_point}/${id}`)
      .then((res) => {
        setBrands(brands.filter((item) => item._id !== id));
        toast.success("Success Delete Category");
      })
      .catch((err) => {
        toast.error(err.reponse.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "isActive",
      headerName: "isActive",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
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
  const users = [];
  const row = [];
  brands &&
    brands.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        isActive: item.isActive,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <div className="flex justify-start items-center">
          <h3 className="text-[22px] font-Poppins pb-2">All Brands</h3>
          <div
            onClick={() => setCreateForm(true)}
            className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3 ml-4`}
          >
            <span className="text-white">Create</span>
          </div>
        </div>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        {createForm ? (
          <FormCreate
            setOpenUpdate={setCreateForm}
            handleImageChange={handleImageChange}
            images={images}
            imagesResponse={imagesResponse}
            setBrands={setBrands}
            setImages={setImages}
            brands={brands}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AllBrands;

const FormCreate = ({
  setOpenUpdate,
  handleImageChange,
  images,
  imagesResponse,
  setBrands,
  setImages,
  brands,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateBrands = async (e, imagesResponse) => {
    e.preventDefault();
    const data = { name, description, images: imagesResponse };
    await axios
      .post(`${Server_url}${Api_version}${brand_end_point}/`, data, {
        withCredentials: true,
      })
      .then((res) => {
        setBrands([res.data.data, ...brands]);
        setName("");
        setDescription("");
        setImages([]);
        setOpenUpdate(false);
        toast.success("Success Create Category");
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
        <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-auto">
          <div className="w-full flex justify-end">
            <RxCross1
              size={30}
              className="cursor-pointer"
              onClick={() => setOpenUpdate(false)}
            />
          </div>
          <h5 className="text-[30px] font-Poppins text-center">
            Create Brands
          </h5>
          {/* create coupoun code */}
          <form aria-required={true}>
            <br />
            <div>
              <label className="pb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={name}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your coupon code name..."
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
            </div>
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
                onClick={(e) => handleCreateBrands(e, imagesResponse)}
                type="submit"
                value="Submit"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
