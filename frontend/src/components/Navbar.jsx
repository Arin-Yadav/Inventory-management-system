import { useNavigate } from "react-router-dom";
import { RouteLogin } from "../helpers/RouteName";

export default function Navbar() {
  const navigate = useNavigate();
  const user = { name: "Arin", role: "Admin" }; // later from AuthContext

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(RouteLogin);
  };

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3">
      <h1 className="text-lg font-semibold">Inventory Management System</h1>
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
    </header>
  );
}
