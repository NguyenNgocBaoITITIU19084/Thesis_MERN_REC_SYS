import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";

import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import { Api_version, Server_url, discount_end_point } from "../../Server";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const [description, setDescription] = useState();
  const [persentDiscount, setPersentDiscount] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    async function fecthDiscountByStore() {
      setIsLoading(true);
      await axios
        .get(`${Server_url}${Api_version}${discount_end_point}/by-store`, {
          withCredentials: true,
        })
        .then((res) => {
          const discount = res.data.data;
          setCoupouns([...discount]);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setIsLoading(false);
        });
    }
    fecthDiscountByStore();
    return () => {
      setCoupouns([]);
    };
  }, []);

  const openUpdateWindownclicked = (id) => {
    setOpenUpdate(true);
    setData(coupouns.filter((item) => item._id === id));
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    await axios
      .delete(`${Server_url}${Api_version}${discount_end_point}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCoupouns(coupouns.filter((item) => item._id !== id));
        setIsLoading(false);
        toast.success("Success Delete Discount");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { code, description, persentDiscount };
    await axios
      .post(`${Server_url}${Api_version}${discount_end_point}/`, data, {
        withCredentials: true,
      })
      .then((res) => {
        setCode("");
        setDescription("");
        setPersentDiscount(null);
        toast.success("Successfully Create Discount");
        setCoupouns([res.data.data, ...coupouns]);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleUpdateSubmit = async (discountID, data) => {
    try {
      await axios
        .patch(
          `${Server_url}${Api_version}${discount_end_point}/${discountID}`,
          data,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const updateData = res.data.data;
          coupouns.forEach((item) => {
            if (item._id === updateData._id) {
              item.code = updateData.code;
              item.persentDiscount = updateData.persentDiscount;
              item.description = updateData.description;
            }
          });
          toast.success("Success Update Discount");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "persentDiscount",
      headerName: "Persent Discount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "isActive",
      headerName: "Status",
      minWidth: 100,
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
                onClick={() => openUpdateWindownclicked(params.id)}
              />
            </Button>
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

  coupouns &&
    coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.code,
        persentDiscount: item.persentDiscount + " %",
        isActive: item.isActive,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full mx-8 pt-1 mt-10 bg-white">
            <div className="w-full flex justify-end">
              <div
                className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
                onClick={() => setOpen(true)}
              >
                <span className="text-white">Create Coupon Code</span>
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
                    Create Coupon Code
                  </h5>
                  {/* create coupoun code */}
                  <form aria-required={true}>
                    <br />
                    <div>
                      <label className="pb-2">
                        Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={code}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter your coupon code name..."
                      />
                    </div>
                    <br />
                    <div>
                      <label className="pb-2">
                        Discount Percentenge{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="value"
                        value={persentDiscount}
                        required
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setPersentDiscount(e.target.value)}
                        placeholder="Enter your coupon code value..."
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
                      <input
                        onClick={(e) => handleSubmit(e)}
                        type="submit"
                        value="Create"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
          {openUpdate ? (
            <UpdateDiscountWindow
              setOpenUpdate={setOpenUpdate}
              data={data}
              handleUpdateSubmit={handleUpdateSubmit}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default AllCoupons;

const UpdateDiscountWindow = ({ setOpenUpdate, data, handleUpdateSubmit }) => {
  const [discountId, setDiscountId] = useState();
  const [code, setCode] = useState();
  const [description, setDescription] = useState();
  const [persentDiscount, setPersentDiscount] = useState(null);

  useEffect(() => {
    data.forEach((item) => {
      setDiscountId(item._id);
      setCode(item.code);
      setDescription(item.description);
      setPersentDiscount(item.persentDiscount);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { code, description, persentDiscount };
    handleUpdateSubmit(discountId, data);
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
            Update Coupon Code
          </h5>
          {/* create coupoun code */}
          <form aria-required={true}>
            <br />
            <div>
              <label className="pb-2">
                Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={code}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your coupon code name..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Discount Percentenge <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="value"
                value={persentDiscount}
                required
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setPersentDiscount(e.target.value)}
                placeholder="Enter your coupon code value..."
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
              <input
                onClick={(e) => handleSubmit(e)}
                type="submit"
                value="Update Discount"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
