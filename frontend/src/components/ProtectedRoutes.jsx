import { Navigate, Outlet } from "react-router-dom";
import { RouteLogin } from "../helpers/RouteName";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Outlet />;
  }
  return <Navigate to={RouteLogin} />;
};

export default ProtectedRoutes;
