import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import axios from "axios";
import { Api_version, Server_url, product_end_point } from "../Server";
import Loader from "../components/layout/Loader";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("categories");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fectchAllProducts() {
      setIsLoading(true);
      await axios
        .get(`${Server_url}${Api_version}${product_end_point}/`)
        .then((res) => {
          console.log(res.data.data);
          setProducts([...res.data.data]);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
    async function fectchAllProductsByCategory(categoryData) {
      setIsLoading(true);
      await axios
        .get(
          `${Server_url}${Api_version}${product_end_point}/get-by-category/${categoryData}`
        )
        .then((res) => {
          console.log(res.data.data);
          setProducts([...res.data.data]);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
    if (categoryData) {
      fectchAllProductsByCategory(categoryData);
    } else {
      fectchAllProducts();
    }
    return () => {};
  }, [categoryData]);
  return (
    <div>
      <Header activeHeading={3} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <br />
            <br />
            <div className={`${styles.section}`}>
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {products &&
                  products.map((i, index) => (
                    <ProductCard data={i} key={index} />
                  ))}
              </div>
              {products && products.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products Found!
                </h1>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
