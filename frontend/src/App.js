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
import {
  ShopHomePage,
  DashBoardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllCoupouns,
  ShopSettingsPage,
} from "./ShopRoutes.js";
import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardProducts,
} from "./AdminRoutes.js";
import ProtectedRoute from "./components/Route/ProtectedRoutes/ProtectedRoute.jsx";
import SellerProtectedRoute from "./components/Route/ProtectedRoutes/SellerProtectedRoute.jsx";
import {
  clearProfile,
  fetchProfile,
} from "./redux/features/profile/profilesSlice.js";
import { useDispatch } from "react-redux";
import {
  selectAccessAuth,
  successLogOut,
} from "./redux/features/auths/authSlice.js";
import {
  fetchStore,
  clearStoreProfile,
} from "./redux/features/store/storeSlice.js";
import { useSelector } from "react-redux";

const ROLE = {
  ADMIN: "admin",
  GUEST: "guest",
  SUPPLIER: "supplier",
};
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAccessAuth);
  useEffect(async () => {
    if (isAuthenticated === true) {
      try {
        await dispatch(fetchProfile())
          .unwrap()
          .then((res) => {})
          .catch((err) => {
            toast.error("Error loading profile");
          });
        await dispatch(fetchStore())
          .unwrap()
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
      return () => {
        dispatch(clearProfile({}));
        dispatch(successLogOut());
        dispatch(clearStoreProfile());
      };
    }
  }, [isAuthenticated]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:name" element={<ProductDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          {/* {Shop Route} */}
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <DashBoardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-create"
            element={
              <ProtectedRoute>
                <ShopCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupouns"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupouns />
              </SellerProtectedRoute>
            }
          />
        </Route>
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin-users" element={<AdminDashboardUsers />} />
        <Route path="/admin-sellers" element={<AdminDashboardSellers />} />
        <Route path="/admin-orders" element={<AdminDashboardOrders />} />
        <Route path="/admin-products" element={<AdminDashboardProducts />} />
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
