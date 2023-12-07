import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuth } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuth) {
      toast.error("You have to Login to access Protected Route");
      return <Navigate to="/sign-in" replace />;
    }
    return children;
  }
};

export default ProtectedRoute;
