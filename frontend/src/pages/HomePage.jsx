import React from "react";
import Header from "../components/layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Category from "../components/Route/Category/Category.jsx";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Category />
      <BestDeals />
    </div>
  );
};

export default HomePage;
