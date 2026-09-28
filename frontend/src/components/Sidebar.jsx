import { Link } from "react-router-dom";
import {
  RouteCategories,
  RouteProducts,
  RouteStockmovements,
  RouteSuppliers,
} from "../helpers/RouteName";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6 text-xl font-bold border-b">IMS Dashboard</div>
      <nav className="p-4 space-y-2">
        <Link
          to={RouteProducts}
          className="block p-2 rounded hover:bg-blue-100">
          Products
        </Link>
        <Link
          to={RouteSuppliers}
          className="block p-2 rounded hover:bg-blue-100">
          Suppliers
        </Link>
        <Link
          to={RouteCategories}
          className="block p-2 rounded hover:bg-blue-100">
          Categories
        </Link>
        <Link
          to={RouteStockmovements}
          className="block p-2 rounded hover:bg-blue-100">
          Stock Movements
        </Link>
      </nav>
    </aside>
  );
}
