import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import axios from "axios";
import { Api_version, Server_url, product_end_point } from "../Server";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("categories");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fectchAllProducts() {
      await axios
        .get(`${Server_url}${Api_version}${product_end_point}/`)
        .then((res) => {
          console.log(res.data.data);
          setProducts([...res.data.data]);
        })
        .catch((err) => console.log(err));
    }
    fectchAllProducts();
    if (categoryData) {
    }
    return () => {};
  }, [categoryData]);
  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {products &&
            products.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {products && products.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default ProductsPage;
