import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LoginPage,
  SignUpPage,
  HomePage,
  FAQPage,
  EventsPage,
  ProductsPage,
  BestSellingPage,
  ProductDetailsPage,
  ProfilePage,
  Layout,
  RequiredAuth,
} from "./Routes.js";

const App = () => {
  return (
    <Routes>
      <Route path="/outlet" element={<Layout />} />
      <Route path="/" element={<HomePage />} />

      <Route element={<RequiredAuth />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:name" element={<ProductDetailsPage />} />
      <Route path="/best-selling" element={<BestSellingPage />} />
    </Routes>
  );
};

export default App;
