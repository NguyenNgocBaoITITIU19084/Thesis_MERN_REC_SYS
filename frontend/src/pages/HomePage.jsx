import React from "react";
import Header from "../components/layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Category from "../components/Route/Category/Category";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import Event from "../components/Event/Event";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts";
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Category />
      <BestDeals />
      <Event />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;