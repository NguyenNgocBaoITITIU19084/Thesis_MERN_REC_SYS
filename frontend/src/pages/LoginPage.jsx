import React, { useEffect } from "react";
import Login from "../components/Login/Login";
import { selectAccessAuth } from "../redux/features/auths/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const { isAuthenticated } = useSelector(selectAccessAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
