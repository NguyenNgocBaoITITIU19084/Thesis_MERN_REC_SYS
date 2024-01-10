import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import axios from "axios";
import { Api_version, Server_url, product_end_point } from "../../Server";

const SuggestedProduct = ({ data }) => {
  const [products, setProducts] = useState();

  useEffect(() => {
    async function fecthContentBased() {
      await axios(
        `${Server_url}${Api_version}/recommend/recommend-content-based/${data?.name}`
      )
        .then((res) => {
          setProducts([...res.data.data]);
        })
        .catch((err) => console.log(err));
    }
    fecthContentBased();
  }, []);

  return (
    <div>
      {products ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {products &&
              products.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
