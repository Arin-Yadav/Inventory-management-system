import { useNavigate } from "react-router-dom";
import { RouteLogin } from "../helpers/RouteName";
import { Menu, X } from "lucide-react";
import { useContext } from "react";
import { InventoryContext } from "../context/Context";

export default function Navbar({ isSidebaropen, setIsSidebaropen }) {
  const navigate = useNavigate();
  const { user, token } = useContext(InventoryContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(RouteLogin);
  };

  return (
    <div className="flex items-center md:justify-between gap-5 md:gap-0 fixed top-0 z-50 w-full bg-white shadow px-6 h-16">
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setIsSidebaropen((prev) => !prev)}>
        {isSidebaropen ? <X /> : <Menu />}
      </button>

      <h1 className="text-lg font-semibold">IMS</h1>
      <div className="md:flex items-center space-x-4 hidden">
        <span className="text-gray-700">
          {user.name} ({user.role})
        </span>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600">
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-600">
            Login
          </button>
        )}
      </div>
    </div>
  );
}
