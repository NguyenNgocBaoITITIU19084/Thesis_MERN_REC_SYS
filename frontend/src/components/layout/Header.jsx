import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAllCategories,
  fecthCategories,
  selectLoadingState,
} from "../../redux/features/categories/categoriesSlice";

import {
  selectAllBrands,
  selectBrandLoadingState,
  fecthBrands,
} from "../../redux/features/brands/brandsSlice";

import { productData } from "../../static/data";
import styles from "../../styles/styles";
import Navbar from "./Navbar";
import Cart from "../Cart/Cart";
import OptionList from "./OptionList";
import {
  selectProfile,
  selectProfileLoadingState,
  fetchProfileByUser,
} from "../../redux/features/profile/profilesSlice";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { selectAccessAuth } from "../../redux/features/auths/authSlice.js";
const Header = ({ activeHeading }) => {
  const dispatch = useDispatch();

  const categories = useSelector(selectAllCategories);
  const categoryStatus = useSelector(selectLoadingState);
  const profile = useSelector(selectProfile);
  const brands = useSelector(selectAllBrands);
  const brandStatus = useSelector(selectBrandLoadingState);
  const token = useSelector(selectAccessAuth);
  const { accessToken } = token;
  const profileStatus = useSelector(selectProfileLoadingState);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);

  const [openCartList, setOpenCartList] = useState(false);
  const [openWhishList, setOpenWishList] = useState(false);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fecthCategories());
    }
    if (categoryStatus === "idle") {
      dispatch(fecthBrands());
    }
    if (profileStatus === "idle" && accessToken) {
      dispatch(fetchProfileByUser(accessToken));
    }
  }, [profileStatus, categoryStatus, brandStatus, dispatch]);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      );
    setSearchData(filteredProducts);
  };
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e)}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${Product_name}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.image_Url[0].url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button}`}>
            <Link to="/seller">
              <h1 className="text-[#fff] flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* {categories} */}
          <div className="flex justify-between">
            <OptionList data={brands} title={"Brands"} />
            <OptionList data={categories} title={"Categories"} />
          </div>

          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCartList(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
              {token.accessToken ? (
                <div>
                  <Link to="/profile">
                    <img
                      src={`${
                        profile?.profile?.avatar
                          ? profile?.profile?.avatar
                          : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                      }`}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full border-[3px] border-[#0eae88]"
                    />
                  </Link>
                </div>
              ) : (
                <div className="relative cursor-pointer mr-[15px]">
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                </div>
              )}
            </div>
            {/* {Open Cart List Popup} */}
            {openCartList ? <Cart setOpenCartList={setOpenCartList} /> : null}
            {/* wishlist popup */}
            {openWhishList ? (
              <Wishlist setOpenWishlist={setOpenWishList} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
