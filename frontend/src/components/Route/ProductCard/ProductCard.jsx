import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiFillHeart,
} from "react-icons/ai";
import ProductDetailsCard from "../../Route/ProductDetailsCart/ProductDetailsCart";
import axios from "axios";
import { Api_version, Server_url, whishlist_end_point } from "../../../Server";
import { toast } from "react-toastify";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  const productId = data._id;

  const handleAddToWhishList = async (productId) => {
    const data = { productId };
    await axios
      .post(
        `${Server_url}${Api_version}${whishlist_end_point}/add-product`,
        data,
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.response.data.message));
    setClick(!click);
  };

  return (
    <>
      {console.log(data)}
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/products/${product_name}`}>
          <img
            src={data.images[0].link}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/preview/${data?.createdBy?._id}`}>
          <h5 className={`${styles.shop_name}`}>{data?.createdBy.name}</h5>
        </Link>
        <Link to={`/product/${productId}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
            {data.total_rating}
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6BA00"
              size={20}
            />
          </div>
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.price ? data.price + " $" : null}
              </h5>
              <h4 className={`${styles.price}`}>
                {data.actualPrice ? data.actualPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.soldOut} sold
            </span>
          </div>
        </Link>
        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              color={click ? "red" : "#333"}
              onClick={() => setClick(!click)}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              color={click ? "red" : "#333"}
              title="Add to wishlist"
              onClick={() => handleAddToWhishList(productId)}
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
