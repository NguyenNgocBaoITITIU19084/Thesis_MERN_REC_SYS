import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import Loader from "../../components/layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  LogOutByUser,
  successLogOut,
} from "../../redux/features/auths/authSlice";
import { clearProfile } from "../../redux/features/profile/profilesSlice";
import {
  clearStoreProfile,
  selectStore,
} from "../../redux/features/store/storeSlice";
import { Api_version, Server_url, store_end_point } from "../../Server";
const ShopInfo = ({ isOwner }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const isStore = useSelector(selectStore);
  const seller = isStore.store;

  const [detail, setDetail] = useState();
  useEffect(() => {
    async function fetchProductsByStoreId(id) {
      await axios
        .get(`${Server_url}${Api_version}${store_end_point}/get-detail/${id}`)
        .then((res) => {
          console.log("not authen", res);
          setDetail(res.data.data);
        })
        .catch((err) => console.log(err));
    }
    async function fetchProductsAuthenticated() {
      await axios
        .get(`${Server_url}${Api_version}${store_end_point}/`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("authen", res);
          setDetail(res.data.data.store);
        })
        .catch((err) => console.log(err));
    }
    if (isOwner) {
      fetchProductsAuthenticated();
    } else {
      fetchProductsByStoreId(id);
    }
  }, []);

  const logoutHandler = () => {
    dispatch(LogOutByUser()).then(() => {
      dispatch(clearProfile({}));
      dispatch(successLogOut());
      dispatch(clearStoreProfile());
      toast.success("Successfully Logout");
      // window.location.reload(true);
      navigate("/");
    });
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {console.log("detailllllllllllllllllllll", detail)}
          <div className="w-full py-5">
            <div className="w-full flex item-center justify-center">
              <img
                src={`${detail?.avatar[0].link}`}
                alt=""
                className="w-[200px] h-[200px] rounded-full border-[3px] border-[#0eae88] object-contain"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{detail?.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {detail?.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            {detail?.address.map((addr, i) => {
              return (
                <h4 className="text-[#000000a6]" key={i}>
                  {addr}
                </h4>
              );
            })}
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            {detail?.phoneNumber.map((phone, i) => {
              return (
                <h4 className="text-[#000000a6]" key={i}>
                  {phone}
                </h4>
              );
            })}
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            {/* <h4 className="text-[#000000a6]">{products && products.length}</h4> */}
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Ratings</h5>
            {/* <h4 className="text-[#000000b0]">{averageRating}/5</h4> */}
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">
              {detail?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
