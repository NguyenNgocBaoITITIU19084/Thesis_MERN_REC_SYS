import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductDetails from "../components/Product/ProductDetails.jsx";
import { useParams } from "react-router-dom";
import { productData } from "../static/data.js";
const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  useEffect(() => {
    const data = productData.find((i) => i.name === productName);
    setData(data);
  }, []);
  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
