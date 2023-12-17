import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectAccessAuth } from "../../redux/features/auths/authSlice";
import { jwtDecode } from "jwt-decode";
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  // const token = useSelector(selectAccessAuth);
  // const decoded = jwtDecode(token.accessToken);
  // const auth = { roles: decoded.roles, accessToken: token.accessToken };
  const location = useLocation();
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
