import React, { useEffect, useState } from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  LogOutByUser,
  successLogOut,
} from "../../redux/features/auths/authSlice";
import { clearProfile } from "../../redux/features/profile/profilesSlice";
import { clearStoreProfile } from "../../redux/features/store/storeSlice";
import axios from "axios";
import { Api_version, Server_url } from "../../Server";
const ProfileSidebar = ({ setActive, active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState();
  useEffect(() => {
    async function fecthIsAdmin() {
      await axios
        .get(`${Server_url}${Api_version}/auth/is-admin`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setAdmin(res.data.data);
        })
        .catch((err) => console.log(err));
    }
    fecthIsAdmin();
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
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>
      {/* <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </div> */}

      {/* <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div> */}

      {/* <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Track Order
        </span>
      </div> */}

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Address
        </span>
      </div>
      {admin && (
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(10)}
        >
          <TbAddressBook size={20} color={active === 10 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 10 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            <Link to="/admin/dashboard">Admin Dash Board</Link>
          </span>
        </div>
      )}
      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
