import React, { useEffect } from "react";
import styles from "../../../styles/styles";
import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  fecthProducts,
  selectProductsLoadingState,
  selectProductsErrorState,
} from "../../../redux/features/products/productsSlice";

const FeaturedProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const productStatus = useSelector(selectProductsLoadingState);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fecthProducts());
    }
  }, [fecthProducts, dispatch]);
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {console.log(products)}
          {products &&
            products.map((i, index) => {
              return <ProductCard data={i} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
