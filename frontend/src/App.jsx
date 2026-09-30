import { Route, Routes } from "react-router-dom";
import {
  RouteCategories,
  RouteCategoriesForm,
  RouteIndex,
  RouteLogin,
  RouteProducts,
  RouteProductsForm,
  RouteRegister,
  RouteStockmovements,
  RouteStockmovementsForm,
  RouteSuppliers,
  RouteSuppliersForm,
} from "./helpers/RouteName";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import Stockmovements from "./pages/Stockmovements";
import Layout from "./pages/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./pages/Register";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";
import SupplierForm from "./components/SupplierForm";
import StockmovementForm from "./components/StockmoventForm";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path={RouteIndex} element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path={RouteSuppliers} element={<Suppliers />} />
            <Route path={RouteSuppliersForm} element={<SupplierForm />} />
            <Route path={RouteProducts} element={<Products />} />
            <Route path={RouteProductsForm} element={<ProductForm />} />
            <Route path={RouteCategories} element={<Categories />} />
            <Route path={RouteCategoriesForm} element={<CategoryForm />} />
            <Route path={RouteStockmovements} element={<Stockmovements />} />
            <Route path={RouteStockmovementsForm} element={<StockmovementForm />} />
          </Route>
        </Route>
        <Route path={RouteLogin} element={<Login />} />
        <Route path={RouteRegister} element={<Register />} />
        <Route path={RouteProducts} element={<Products />} />
      </Routes>
    </div>
  );
};

export default App;
