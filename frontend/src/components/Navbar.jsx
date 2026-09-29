import { useNavigate } from "react-router-dom";
import { RouteLogin } from "../helpers/RouteName";
import { Menu, X } from "lucide-react";

export default function Navbar({ isSidebaropen, setIsSidebaropen }) {
  const navigate = useNavigate();
  const user = { name: "Arin", role: "Admin" }; // later from AuthContext

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(RouteLogin);
  };

  return (
    <div className="flex items-center justify-between fixed top-0 z-50 w-full bg-white shadow px-6 h-16">
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setIsSidebaropen((prev) => !prev)}>
        {isSidebaropen ? <X /> : <Menu />}
      </button>

      <h1 className="text-lg font-semibold">IMS</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">
          {user.name} ({user.role})
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
}
