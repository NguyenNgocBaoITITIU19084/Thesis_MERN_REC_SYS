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
import { ShopHomePage, DashBoardPage } from "./ShopRoutes.js";
import ProtectedRoute from "./components/Route/ProtectedRoutes/ProtectedRoute.jsx";
import SellerProtectedRoute from "./components/Route/ProtectedRoutes/SellerProtectedRoute.jsx";
import {
  clearProfile,
  fetchProfile,
} from "./redux/features/profile/profilesSlice.js";
import { useDispatch } from "react-redux";
import {
  LogOutByUser,
  selectAccessAuth,
  successLogOut,
} from "./redux/features/auths/authSlice.js";
import {
  fetchStore,
  clearStoreProfile,
} from "./redux/features/store/storeSlice.js";
import { useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAccessAuth);

  useEffect(() => {
    async function fectchAuthen() {
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
          dispatch(LogOutByUser());
        };
      }
    }
    fectchAuthen();
  }, [isAuthenticated, dispatch]);

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
            path="/shop-create"
            element={
              <ProtectedRoute>
                <ShopCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
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
