import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

import styles from "../../styles/styles";
import axios from "axios";
import { Api_version, Server_url, cartList_end_point } from "../../Server";
import { toast } from "react-toastify";
const Cart = ({ setOpenCartList }) => {
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    async function fetchCartList() {
      await axios
        .get(`${Server_url}${Api_version}${cartList_end_point}/get-cart-list`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.data.cartList);
          setCartList([...res.data.data.cartList]);
        })
        .catch((err) => toast.error(err.response.data.message));
    }
    fetchCartList();
    return () => {
      setCartList([]);
    };
  }, []);
  const cartData = [
    {
      name: "Iphone 12 promax titan blue natural",
      description: "tessssssssssssssst",
      price: 4000,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCartList(false)}
            />
          </div>
          {/* {Item Length} */}
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {cartList.length} Items In Cart
            </h5>
          </div>

          {/* {Cart Single Items} */}
          <br />
          <div className="w-full border-t">
            {cartList &&
              cartList.map((i, index) => (
                <CartSingle data={i} key={index} setCartList={setCartList} />
              ))}
          </div>
        </div>
        <div className="px-5 mb-3">
          {/* checkout buttons */}
          <Link to="/checkout">
            <div
              className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
            >
              <h1 className="text-[#fff] text-[18px] font-[600]">
                Checkout Now (USD$)
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, setCartList }) => {
  const [value, setValue] = useState(data.quantity);
  const totalPrice = data.productId.price * value;

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
        setCartList([
          ...res.data.data.cartList.filter(
            (item, index) => item.productId !== productId
          ),
        ]);
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
            <h1>{data.productId.name.slice(0, 15) + "..."}</h1>
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

export default Cart;
