import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Api_version,
  Server_url,
  store_end_point,
  cloudinary_end_point,
} from "../../Server";

const ShopSettings = () => {
  const [avatar, setAvatar] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");

  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    async function fetchStoreProfile() {
      await axios
        .get(`${Server_url}${Api_version}${store_end_point}/`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          const data = res.data.data;
          setAvatar([...data.store.avatar]);
          setName(data.store.name);
          setDescription(data.store.description);
          setAddress(data.store.address);
          setPhoneNumber(data.store.phoneNumber);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchStoreProfile();
    return () => {
      setAvatar([]);
      setName("");
      setDescription("");
      setAddress("");
      setPhoneNumber("");
      setInstagram("");
      setFacebook("");
      setEmail("");
    };
  }, []);

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

  const updateHandler = async (e) => {
    e.preventDefault();
    if (!name || !address || !phoneNumber) {
      return toast.error("Missing Fields Name Or Address Or Phone Number");
    }
    const data = {
      name,
      description,
      address,
      phoneNumber,
      instagram,
      facebook,
      email,
      avatar,
    };
    await axios
      .patch(`${Server_url}${Api_version}${store_end_point}/`, data, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Success Update Shop Detail");
      })
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={`${
                avatar.length
                  ? avatar[0].link
                  : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              }`}
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer object-contain"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
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

        {/* shop info */}
        <form aria-aria-required={true} className="flex flex-col items-center">
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <textarea
              cols="25"
              required
              rows="3"
              type="text"
              name="description"
              value={description}
              className="mt-2 appearance-none block w-[95%] pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your product description..."
            ></textarea>
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="name"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Instagram</label>
            </div>
            <input
              type="name"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Facebook</label>
            </div>
            <input
              type="name"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Email</label>
            </div>
            <input
              type="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Shop Detail"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              readOnly
              onClick={updateHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
