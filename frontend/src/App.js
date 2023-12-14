import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  HomePage,
  FAQPage,
  EventsPage,
  ProductsPage,
  BestSellingPage,
  ProductDetailsPage,
} from "./Routes.js";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
