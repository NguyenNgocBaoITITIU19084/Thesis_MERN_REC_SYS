import React, { useState } from "react";
import styles from "../../styles/styles";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Api_version,
  Server_url,
  profile_end_point,
  cartList_end_point,
} from "../../Server";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [inforShipping, setInforShipping] = useState(null);
  const [orderData, setOrderData] = useState([]);

  const navigate = useNavigate();

  const paymentSubmit = () => {
    //   // update local storage with the updated orders array
    localStorage.setItem("latestOrder", JSON.stringify(inforShipping));
    localStorage.setItem("orderData", JSON.stringify(orderData));
    navigate("/payment");
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo setInforShipping={setInforShipping} />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <div className="flex flex-col">
            <ProductOrderData
              setOrderData={setOrderData}
              orderData={orderData}
            />
          </div>
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({ setInforShipping }) => {
  const [profile, setProfile] = useState();

  const [lastName, setLastName] = useState();
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState(
    profile?.profile?.phoneNumber[0]
  );
  const [address, setAddress] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [option, setOption] = useState(false);

  const [shippedPhone, setShippedPhone] = useState();
  const [shippedAddress, setShippedAddress] = useState();

  const finishShippingInfor = () => {
    if (option) {
      const shippingInfor = {
        lastName,
        firstName,
        email,
        phoneNumber,
        address,
        selectedCountry,
        selectedState,
        selectedCity,
        shippedAddress,
        shippedPhone,
      };
      setInforShipping(shippingInfor);
    } else {
      const shippingInfor = {
        lastName,
        firstName,
        email,
        phoneNumber,
        address,
        selectedCountry,
        selectedState,
        selectedCity,
      };
      setInforShipping(shippingInfor);
    }
    toast.success("Finish Shipping Infor");
  };

  useEffect(() => {
    async function fetchUserProfile() {
      await axios
        .get(`${Server_url}${Api_version}${profile_end_point}/`, {
          withCredentials: true,
        })
        .then((res) => {
          const data = res?.data?.data;
          setProfile(data);
          setLastName(data?.profile?.lastName);
          setFirstName(data?.profile?.firstName);
          setPhoneNumber(data?.profile?.phoneNumber[0]);
          setEmail(data?.email);
        })
        .catch((err) => toast.error("Failed Load Profile"));
    }
    fetchUserProfile();
    return () => {
      setProfile();
    };
  }, []);

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              required
              className={`${styles.input} !w-[95%]`}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              required
              className={`${styles.input} !w-[95%]`}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={phoneNumber}
              className={`${styles.input} !w-[95%]`}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
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
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <Select
              options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
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
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
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
          <div className="w-[50%]">
            <label className="block pb-2">Address</label>
            <input
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className={`${styles.button}  w-[150px] 800px:w-[280px] mt-10 text-[18px] cursor-pointer inline-block text-zinc-50`}
        onClick={() => setOption(!option)}
      >
        Choose From saved address
      </h5>
      {option && (
        <div>
          <p>Phone Number</p>
          {profile?.profile?.phoneNumber.length &&
            profile?.profile?.phoneNumber.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="radio"
                  value={item}
                  className={`mr-3`}
                  onClick={() => setShippedPhone(item)}
                  name="phoneNumber"
                />
                <h2>{item}</h2>
              </div>
            ))}
          <p>Phone Number</p>
          {profile?.profile?.address.length &&
            profile?.profile?.address.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="radio"
                  value={item}
                  className={`mr-3`}
                  onClick={() => setShippedAddress(item)}
                  name="address"
                />
                <h2>{item}</h2>
              </div>
            ))}
        </div>
      )}
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={() => finishShippingInfor()}
      >
        <h5 className="text-white">Finish</h5>
      </div>
    </div>
  );
};

const ProductOrderData = ({ setOrderData, orderData }) => {
  const [cartList, setCartList] = useState([]);
  const [subtotal, setSubtotal] = useState();
  useEffect(() => {
    async function fetchCartList() {
      await axios
        .get(`${Server_url}${Api_version}${cartList_end_point}/get-cart-list`, {
          withCredentials: true,
        })
        .then((res) => {
          let subPrice = 0;
          res.data.data.cartList.forEach((item) => {
            subPrice += item.productId.price * item.quantity;
          });
          setSubtotal(subPrice);
          setCartList([...res.data.data.cartList]);
        })
        .catch((err) => toast.error(err.response.data.message));
    }
    fetchCartList();
  }, []);

  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      {" "}
      <div className="w-full border-t">
        {cartList &&
          cartList.map((i, index) => (
            <CartSingle
              data={i}
              key={i._id}
              setCartList={setCartList}
              setSubtotal={setSubtotal}
              subtotal={subtotal}
              setOrderData={setOrderData}
              orderData={orderData}
            />
          ))}
      </div>
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subtotal}</h5>
      </div>
      <br />
      {/* <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]"></h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3"></h5> */}
      <br />
      {/* <form>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form> */}
    </div>
  );
};
const CartSingle = ({
  data,
  setCartList,
  setSubtotal,
  subtotal,
  setOrderData,
  orderData,
}) => {
  const [value, setValue] = useState(data.quantity);
  const totalPrice = data.productId.price * value;
  const price = data.productId.price;
  useEffect(() => {
    setOrderData([...orderData, data?.productId, data?.quantity]);
  }, []);
  const handleAddProductToCartList = async (productId) => {
    await axios
      .patch(
        `${Server_url}${Api_version}${cartList_end_point}/increasing-product`,
        { productId },
        { withCredentials: true }
      )
      .then((res) => {
        res.data.data.cartList.map((item, index) => {
          if (item.productId === productId) {
            return setValue(item.quantity);
          }
        });
        let subPrice = 0;
        res.data.data.cartList.forEach((item) => {
          subPrice += price * item.quantity;
        });
        setSubtotal(subPrice);
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  const handleRemoveProductFromCartList = async (productId) => {
    await axios
      .patch(
        `${Server_url}${Api_version}${cartList_end_point}/remove-product`,
        { productId },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setCartList([
          ...res.data.data.cartList.filter(
            (item, index) => item.productId !== productId
          ),
        ]);
        setSubtotal(subtotal - totalPrice);
        toast.success("Success Remove Product");
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  const handleDecreasingProduct = async (productId) => {
    await axios
      .patch(
        `${Server_url}${Api_version}${cartList_end_point}/decreasing-product`,
        { productId },
        { withCredentials: true }
      )
      .then((res) => {
        res.data.data.cartList.map((item) => {
          if (item.productId === productId) {
            return setValue(item.quantity);
          }
        });
        let subPrice = 0;
        res.data.data.cartList.forEach((item) => {
          subPrice += price * item.quantity;
        });
        setSubtotal(subPrice);
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => handleAddProductToCartList(data.productId._id)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => handleDecreasingProduct(data.productId._id)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${data.productId.images[0].link}`}
          alt=""
          className="w-[80px] h-[80px] ml-2 object-contain"
        />
        <div className="pl-[5px]">
          <Link to={`/product/${data.productId._id}`}>
            <h1>
              {data.productId.name.length > 16
                ? data.productId.name.slice(0, 15) + "..."
                : data.productId.name}
            </h1>
          </Link>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.productId.price}*{value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            ${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => handleRemoveProductFromCartList(data.productId._id)}
        />
      </div>
    </div>
  );
};
export default Checkout;
