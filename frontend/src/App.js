import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
  ShopCreatePage,
} from "./Routes.js";
import ProtectedRoute from "./components/Route/ProtectedRoutes/ProtectedRoute.jsx";
import { fetchProfile } from "./redux/features/profile/profilesSlice.js";
import { useDispatch } from "react-redux";
const ROLE = {
  ADMIN: "admin",
  GUEST: "guest",
  SUPPLIER: "supplier",
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(fetchProfile())
        .unwrap()
        .then((res) => {})
        .catch((err) => {
          toast.error("Error loading profile");
        });
      // axios
      //   .get(`${Server_url}${Api_version}${profile_end_point}/`, {
      //     withCredentials: true,
      //   })
      //   .then((res) => {
      //     toast.success("Welcome Back!");
      //   })
      //   .catch((err) => {
      //     toast.error("Error loading profile");
      //   });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:name" element={<ProductDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />4
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
