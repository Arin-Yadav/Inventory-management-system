import { useContext } from "react";
import { InventoryContext } from "../context/Context";
import { Link } from "react-router-dom";
import {
  RouteCategories,
  RouteProducts,
  RouteStockmovements,
  RouteSuppliers,
  RouteUsers,
} from "../helpers/RouteName";

const Dashboard = () => {
  const { products, suppliers, categories, stockmovements, user, allUsers } =
    useContext(InventoryContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Products */}
        <Link to={RouteProducts}>
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700">Products</h2>
            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {products.length}
            </p>
            <p className="text-sm text-gray-500">Total items in inventory</p>
          </div>
        </Link>

        {/* Suppliers */}
        <Link to={RouteSuppliers}>
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700">Suppliers</h2>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {suppliers.length}
            </p>
            <p className="text-sm text-gray-500">Active suppliers</p>
          </div>
        </Link>

        {/* Categories */}
        <Link to={RouteCategories}>
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {categories.length}
            </p>
            <p className="text-sm text-gray-500">Organized product groups</p>
          </div>
        </Link>

        {/* Stock Movements */}
        <Link to={RouteStockmovements}>
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700">
              Stock Movements
            </h2>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {stockmovements.length}
            </p>
            <p className="text-sm text-gray-500">Recent transactions</p>
          </div>
        </Link>

        {user.role === "Admin" && (
          <Link to={RouteUsers}>
            <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-700">Users</h2>
              <p className="mt-2 text-3xl font-bold text-red-600">
                {allUsers.length}
              </p>
              <p className="text-sm text-gray-500">All Users</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
