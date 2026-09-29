import { Route, Routes } from "react-router-dom";
import {
  RouteCategories,
  // RouteHome,
  RouteIndex,
  RouteLogin,
  RouteProducts,
  RouteStockmovements,
  RouteSuppliers,
} from "./helpers/RouteName";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import Stockmovements from "./pages/Stockmovements";
import Layout from "./pages/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path={RouteIndex} element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path={RouteSuppliers} element={<Suppliers />} />
            <Route path={RouteProducts} element={<Products />} />
            <Route path={RouteCategories} element={<Categories />} />
            <Route path={RouteStockmovements} element={<Stockmovements />} />
          </Route>
        </Route>
        <Route path={RouteLogin} element={<Login />} />
        <Route path={RouteProducts} element={<Products />} />
      </Routes>
    </div>
  );
};

export default App;
