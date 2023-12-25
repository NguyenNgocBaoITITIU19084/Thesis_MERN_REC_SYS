import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";

import styles from "../../styles/styles";

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: "Xiaomi Fan White Remote",
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
