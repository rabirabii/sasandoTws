import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ArtistProtectedRoute = ({ children }) => {
  const { isLoading, isMusisi } = useSelector((state) => state.musisi);
  if (isLoading === true) {
    return "Loading...";
  } else {
    if (!isMusisi) {
      return <Navigate to={`/artist-login`} replace />;
    }
    return children;
  }
};

export default ArtistProtectedRoute;
