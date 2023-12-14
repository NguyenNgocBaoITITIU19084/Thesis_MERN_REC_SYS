import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";

import styles from "../../styles/styles";

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: "Iphone 12 promax titan blue natural",
      description: "tessssssssssssssst",
      price: 4000,
    },
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
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/* {Item Length} */}
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              3 Items In Wish List
            </h5>
          </div>

          {/* {Cart Single Items} */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle data={i} key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2" />
        <img
          src="data:image/jpeg;base64,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"
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            ${data.price}
          </h4>
        </div>
        <div>
          <BsCartPlus size={25} className="cursor-pointer" tile="Add to cart" />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
