import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { selectAccessAuth } from "../../redux/features/auths/authSlice";
const RequireAuth = ({ allowedRoles }) => {
  // const { auth } = useAuth();
  const auth = useSelector(selectAccessAuth);
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
