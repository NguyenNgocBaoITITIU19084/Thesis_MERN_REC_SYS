import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";

import styles from "../../styles/styles";
import axios from "axios";
import { Api_version, Server_url, whishlist_end_point } from "../../Server";
import { toast } from "react-toastify";

const Wishlist = ({ setOpenWishlist }) => {
  const [whishList, setWhishList] = useState([]);
  useEffect(() => {
    async function fetchWhishListByUser() {
      await axios
        .get(
          `${Server_url}${Api_version}${whishlist_end_point}/get-whish-list`,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setWhishList([...res.data.data.productId]);
        })
        .catch((err) => console.log(err));
    }
    fetchWhishListByUser();
    return () => {
      setWhishList([]);
    };
  }, []);

  const handleRemoveToWhishList = async (productId) => {
    await axios
      .patch(
        `${Server_url}${Api_version}${whishlist_end_point}/remove-product`,
        { productId },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setWhishList([...res.data.data.productId]);
        toast.success("Success Remove Product From WhishList");
      })
      .catch((err) => console.log(err));
  };
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
              {whishList.length} Items In Wish List
            </h5>
          </div>

          {/* {Cart Single Items} */}
          <br />
          <div className="w-full border-t">
            {whishList &&
              whishList.map((i, index) => (
                <CartSingle
                  data={i}
                  key={index}
                  handleRemoveToWhishList={handleRemoveToWhishList}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, handleRemoveToWhishList }) => {
  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        <RxCross1
          onClick={() => handleRemoveToWhishList(data._id)}
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
        />
        <img
          src={data.images[0].link}
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name.length > 15 ? data.name.slice(0, 15) : data.name}</h1>
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
