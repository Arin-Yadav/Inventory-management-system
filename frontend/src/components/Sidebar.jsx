import { Link } from "react-router-dom";
import {
  RouteCategories,
  RouteIndex,
  RouteProducts,
  RouteStockmovements,
  RouteSuppliers,
} from "../helpers/RouteName";

export default function Sidebar({ isSidebaropen}) {
  return (
    <aside
      className={`w-64 h-[calc(100vh-4rem)] fixed md:sticky left-0 top-16 pt-5 bg-white border-t border-gray-200 overflow-y-auto shadow-md transform transition-transform duration-300 ${isSidebaropen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
      {/* <div className="text-xl font-bold border-b h-16 flex items-center">IMS</div> */}
      <nav className="space-y-2 px-4">
        <Link to={RouteIndex} className="block p-2 rounded hover:bg-blue-100">
          Dashboard
        </Link>
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
