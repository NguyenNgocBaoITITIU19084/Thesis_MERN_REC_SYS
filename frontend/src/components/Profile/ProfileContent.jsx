import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { Country, State, City } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  Api_version,
  Server_url,
  profile_end_point,
  cloudinary_end_point,
  auth_end_point,
} from "../../Server";

const ProfileContent = ({ active }) => {
  const END_POINT = `${Server_url}${Api_version}${profile_end_point}/`;

  const [startDate, setStartDate] = useState(new Date());
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState();
  const [point, setPoint] = useState();

  useEffect(() => {
    async function fetchUserProfile() {
      await axios
        .get(`${END_POINT}`, { withCredentials: true })
        .then((res) => {
          const profile = res.data.data;
          setFirstName(profile.profile.firstName);
          setLastName(profile.profile.lastName);
          setEmail(profile.email);
          setPhoneNumber(profile.profile.phoneNumber[0]);
          setAddress(profile.profile.address[0]);
          setGender(profile.profile.gender);
          setPoint(profile.profile.points);
          setAge(profile.profile.age);
          setAvatar([...profile.profile.avatar]);
        })
        .catch((err) => {
          toast.error("Failed To Loading Profile");
          console.log(err);
        });
    }
    fetchUserProfile();
    return () => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      age,
      avatar,
    };
    console.log("submit data", data);
    await axios
      .patch(`${END_POINT}update-profile`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("ressss", res);
        toast.success("Success Upload Profile");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    var formData = new FormData();

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar((old) => [...old, reader.result]);
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
        const resImg = res.data.data;
        setAvatar(resImg);
        toast.success("Success Upload Images");
      })
      .catch((err) => {
        toast.error("Fail to Upload Images");
      });
  };

  return (
    <div className="w-full">
      {
        //  profile page
        active === 1 && (
          <>
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src={`${
                    avatar.length
                      ? avatar[0].link
                      : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                  }`}
                  className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                  alt=""
                />
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera />
                  </label>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="w-full px-5">
              <form aria-required={true}>
                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">First Name</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Last Name</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                      required
                      value={email}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Age</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Date of Birth</label>
                    <DatePicker
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2 mt-9">
                      Points: <span className="text-red-700">{point}</span>{" "}
                    </label>
                  </div>
                </div>
                <input
                  onClick={handleSubmit}
                  className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                  required
                  value="Update"
                  type="submit"
                />
              </form>
            </div>
          </>
        )
      }

      {
        // ORDER PAGE
        active === 2 && (
          <>
            <AllOrders />
          </>
        )
      }
      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  //   const { user } = useSelector((state) => state.user);
  //   const { orders } = useSelector((state) => state.order);
  const orders = [
    {
      _id: "6580492b6daa6fbe43dff812",
      orderItems: [
        {
          name: "Iphone 14 promax",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getAllOrdersOfUser(user._id));
  //   }, []);

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
        total: "US$ " + item?.totalPrice,
        status: item?.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  //   const { user } = useSelector((state) => state.user);
  //   const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const orders = [
    {
      _id: "6580492b6daa6fbe43dff812",
      status: "Success",
      orderItems: [
        {
          name: "Iphone 14 promax",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing refund",
    },
  ];
  //   useEffect(() => {
  //     dispatch(getAllOrdersOfUser(user._id));
  //   }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.orderStatus === "Processing refund");

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

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item?._id,
        itemsQty: 1,
        total: "US$ " + item?.totalPrice,
        status: item?.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};
const TrackOrder = () => {
  // const { user } = useSelector((state) => state.user);
  // const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const orders = [
    {
      _id: "13123132213",
      orderItems: [
        {
          name: "Iphone 14 promax",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing refund",
    },
  ];
  // useEffect(() => {
  //   dispatch(getAllOrdersOfUser(user._id));
  // }, []);

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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
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
        itemsQty: item?.orderItems.length,
        total: "US$ " + item?.totalPrice,
        status: item?.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Password Is not match");
    }
    const data = { password: oldPassword, newPassword };
    console.log("dataaa", data);
    await axios
      .patch(
        `${Server_url}${Api_version}${auth_end_point}/reset-password`,
        data,
        { withCredentials: true }
      )
      .then((res) => {
        setOldPassword("");
        setNewPassword("");
        setNewPassword("");
        toast.success("Success Change Password");
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form aria-required className="flex flex-col items-center">
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
              onClick={passwordChangeHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
const Address = () => {
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [listAddress, setListAddress] = useState([]);

  useEffect(() => {
    async function fetchUserProfile() {
      await axios
        .get(`${Server_url}${Api_version}${profile_end_point}/`, {
          withCredentials: true,
        })
        .then((res) => {
          const addr = res.data.data.profile.address;
          const phoneList = res.data.data.profile.phoneNumber;
          let data = [];
          addr.forEach((address, index) => {
            data.push({ address, phoneNumber: phoneList[index] });
          });
          setListAddress([...data]);
        })
        .catch((err) => toast.error(err.response.data.message));
    }
    fetchUserProfile();
    return () => {
      setListAddress([]);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !selectedCountry ||
      !selectedCity ||
      !selectedState ||
      !phoneNumber ||
      !address
    ) {
      return toast.error("Please Provide All Fields");
    }
    const finalAddr =
      `${address}, ${selectedState.name}, ${selectedCity.name}, ${selectedCountry.name}`.toLocaleLowerCase();
    const data = { address: finalAddr, phoneNumber };
    await axios
      .patch(
        `${Server_url}${Api_version}${profile_end_point}/add-phone-address`,
        data,
        { withCredentials: true }
      )
      .then((res) => {
        setAddress("");
        setPhoneNumber("");
        setOpen(false);
        toast.success("Success Create New Address");
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const handleDelete = async (idx) => {
    const newAddressList = listAddress.filter((item, index) => index !== idx);
    let phoneNumber = [];
    let address = [];
    newAddressList.forEach((item, index) => {
      phoneNumber.push(item.phoneNumber);
      address.push(item.address);
    });
    const data = { address, phoneNumber };
    await axios
      .patch(
        `${Server_url}${Api_version}${profile_end_point}/update-profile`,
        data,
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Success Delete Address");
        setListAddress(listAddress.filter((item, index) => index !== idx));
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <Select
                      options={Country.getAllCountries()}
                      getOptionLabel={(options) => {
                        return options["name"];
                      }}
                      getOptionValue={(options) => {
                        return options["name"];
                      }}
                      value={selectedCountry}
                      onChange={(item) => {
                        setSelectedCountry(item);
                      }}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <Select
                      options={State?.getStatesOfCountry(
                        selectedCountry?.isoCode
                      )}
                      getOptionLabel={(options) => {
                        return options["name"];
                      }}
                      getOptionValue={(options) => {
                        return options["name"];
                      }}
                      value={selectedState}
                      onChange={(item) => {
                        setSelectedState(item);
                      }}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Province</label>
                    <Select
                      options={City.getCitiesOfState(
                        selectedState?.countryCode,
                        selectedState?.isoCode
                      )}
                      getOptionLabel={(options) => {
                        return options["name"];
                      }}
                      getOptionValue={(options) => {
                        return options["name"];
                      }}
                      value={selectedCity}
                      onChange={(item) => {
                        setSelectedCity(item);
                      }}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                      value="Create New Address"
                      onClick={(e) => handleSubmit(e)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {listAddress &&
        listAddress.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="pl-8 flex flex-col">
              <h1 className="font-bold text-blue-700">
                Address: <span className="text-black">{item.address}</span>{" "}
              </h1>
              <h1 className="font-bold text-blue-700">
                Phone Number:{" "}
                <span className="text-black">{item.phoneNumber}</span>
              </h1>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(index)}
              />
            </div>
          </div>
        ))}

      {listAddress.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};
const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment method
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/2560px-Visa.svg.png"
            alt=""
          />
          <h5>Bao Nguyen Ngoc</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>123 **** *** *** ***</h6>
          <h5 className="p;-6">09/2023</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;
