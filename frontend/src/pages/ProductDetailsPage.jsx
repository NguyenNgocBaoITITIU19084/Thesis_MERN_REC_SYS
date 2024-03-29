import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductDetails from "../components/Product/ProductDetails.jsx";
import SuggestedProduct from "../components/Product/SuggestedProduct.jsx";
import axios from "axios";
import { Api_version, Server_url, product_end_point } from "../Server.js";
const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchProductById() {
      await axios
        .get(`${Server_url}${Api_version}${product_end_point}/${id}`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
    fetchProductById();
    return () => {};
  }, [id]);
  return (
    <div>
      <Header />
      <ProductDetails data={data} />

      {data ? <SuggestedProduct data={data} /> : null}

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
