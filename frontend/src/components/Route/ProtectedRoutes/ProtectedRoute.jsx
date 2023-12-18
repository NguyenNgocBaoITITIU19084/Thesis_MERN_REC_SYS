import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAccessAuth } from "../../../redux/features/auths/authSlice";
const ProtectedRoute = ({ children }) => {
  const { status, isAuthenticated } = useSelector(selectAccessAuth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
