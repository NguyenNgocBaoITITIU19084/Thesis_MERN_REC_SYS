import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../../../components/layout/Loader";
import {
  selectStore,
  selectStoreLoadingState,
} from "../../../redux/features/store/storeSlice";
const SellerProtectedRoute = ({ children }) => {
  const status = useSelector(selectStoreLoadingState);
  const isStore = useSelector(selectStore);
  const isSeller = isStore.store;
  if (status === "loading") {
    return <Loader />;
  } else {
    if (!isSeller) {
      return <Navigate to={`/`} replace />;
    }
    return children;
  }
};

export default SellerProtectedRoute;
