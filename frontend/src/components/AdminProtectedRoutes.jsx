import { useContext } from "react";
import { InventoryContext } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";
import { RouteLogin } from "../helpers/RouteName";

const AdminProtectedRoutes = () => {
  const { user, loading } = useContext(InventoryContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && user.role === "Admin") {
    return <Outlet />;
  }
  return <Navigate to={RouteLogin} />;
};

export default AdminProtectedRoutes;
