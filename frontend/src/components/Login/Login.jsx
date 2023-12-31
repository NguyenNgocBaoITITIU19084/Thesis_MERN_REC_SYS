import { React, useState, useEffect } from "react";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import styles from "../../styles/styles";
import axios from "axios";
import { Api_version, Server_url, auth_end_point } from "../../Server";
import { successLogin } from "../../redux/features/auths/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const dispatch = useDispatch();

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
      setAddRequestStatus("idle");
    };
  }, []);

  // const decodedJwt = (accessToken) => {
  //   const user = jwtDecode(accessToken);
  //   return user;
  // };
  // const loginHandler = async (e) => {
  //   e.preventDefault();
  //   if (!email || !password) {
  //     return toast.error("Missing value");
  //   }
  //   const data = { email, password };
  //   if (email && password && addRequestStatus === "idle") {
  //     try {
  //       setAddRequestStatus("pending");
  //       await dispatch(LoginByUser(data))
  //         .unwrap()
  //         .then((data) => {
  //           toast.success("successfully Login");
  //           // console.log("from login button", data);
  //           const { accessToken } = data.data;
  //           const user = decodedJwt(accessToken);
  //           // setAuth({ roles: user.roles, accessToken });
  //           setEmail("");
  //           setPassword("");
  //           navigate(from, { replace: true });
  //         })
  //         .catch((error) => toast.error(error.message));
  //     } catch (err) {
  //       console.error("Error from Sign up page ", err);
  //     } finally {
  //       setAddRequestStatus("idle");
  //     }
  //   }
  // };
  const loginHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${Server_url}${Api_version}${auth_end_point}/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Success Login");
        dispatch(successLogin());
        navigate("/");
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={onEmailChange}
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={onPasswordChange}
                ></input>
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {" "}
                  Remember me{" "}
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {" "}
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                onClick={loginHandler}
              >
                Login
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
