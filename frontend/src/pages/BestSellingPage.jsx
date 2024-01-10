import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { productData } from "../static/data";
import axios from "axios";
import { Api_version, Server_url } from "../Server";

const BestSellingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchCollaborative() {
      await axios
        .get(
          `${Server_url}${Api_version}/recommend/recommend-collaborative-based/`,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setData([...res.data.data]);
        })
        .catch((err) => console.log(err));
    }
    fetchCollaborative();
  }, []);
  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestSellingPage;
