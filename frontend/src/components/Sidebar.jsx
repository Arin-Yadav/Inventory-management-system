import { Link, useNavigate } from "react-router-dom";
import {
  RouteCategories,
  RouteIndex,
  RouteLogin,
  RouteProducts,
  RouteStockmovements,
  RouteSuppliers,
  RouteUsers,
} from "../helpers/RouteName";
import { useContext } from "react";
import { InventoryContext } from "../context/Context";

export default function Sidebar({ isSidebaropen, setIsSidebaropen }) {
  const { user, token } = useContext(InventoryContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(RouteLogin);
  };

  return (
    <aside
      className={`w-64 h-[calc(100vh-4rem)] fixed md:sticky left-0 top-16 pt-5 bg-white border-t border-gray-200 overflow-y-auto shadow-md transform transition-transform duration-300 ${isSidebaropen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
      <div className="text-gray-700 px-6 py-2 border-b border-gray-200 md:hidden">
        {user.name} ({user.role})
      </div>
      <div className="space-y-2 px-4 mt-5">
        <Link
          onClick={() => setIsSidebaropen(false)}
          to={RouteIndex}
          className="block p-2 rounded hover:bg-blue-100">
          Dashboard
        </Link>
        <Link
          onClick={() => setIsSidebaropen(false)}
          to={RouteProducts}
          className="block p-2 rounded hover:bg-blue-100">
          Products
        </Link>
        <Link
          onClick={() => setIsSidebaropen(false)}
          to={RouteSuppliers}
          className="block p-2 rounded hover:bg-blue-100">
          Suppliers
        </Link>
        <Link
          onClick={() => setIsSidebaropen(false)}
          to={RouteCategories}
          className="block p-2 rounded hover:bg-blue-100">
          Categories
        </Link>
        <Link
          onClick={() => setIsSidebaropen(false)}
          to={RouteStockmovements}
          className="block p-2 rounded hover:bg-blue-100">
          Stock Movements
        </Link>
        {user.role === "Admin" && (
          <Link
            onClick={() => setIsSidebaropen(false)}
            to={RouteUsers}
            className="block p-2 rounded hover:bg-blue-100">
            Users
          </Link>
        )}
      </div>
      <div className="px-4 absolute bottom-0 py-2 w-full md:hidden">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-1 w-full rounded cursor-pointer hover:bg-red-600">
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-green-500 text-white py-1 w-full rounded cursor-pointer hover:bg-green-600">
            Login
          </button>
        )}
      </div>
    </aside>
  );
}
