import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAllCategories } from "../../../redux/features/categories/categoriesSlice";
import styles from "../../../styles/styles";
import { brandingData } from "../../../static/data";
import { Server_url, Api_version, category_end_point } from "../../../Server";
import axios from "axios";

const Category = () => {
  const navigate = useNavigate();
  const categories = useSelector(selectAllCategories);

  const [categoriesData, setCategoriesData] = useState([]);
  useEffect(() => {
    async function fetchAllCategories() {
      await axios
        .get(`${Server_url}${Api_version}${category_end_point}/`)
        .then((res) => {
          console.log(res);
          const check = res?.data?.data;
          if (check.length) {
            setCategoriesData([...check.slice(0, 10)]);
          }
        })
        .catch((err) => console.log(err));
    }
    fetchAllCategories();
    return () => {
      setCategoriesData([]);
    };
  }, []);
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i?.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i?.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i?.name}`);
              };
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                  key={i._id}
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className={`text-[18px] leading-[1.3]`}>{i?.name}</h5>
                  <img
                    src={i?.images[0]?.link}
                    className="w-[120px] object-cover"
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Category;
