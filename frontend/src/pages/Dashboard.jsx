import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-y-auto">
          <Outlet /> {/* renders nested routes */}
        </main>
      </div>
    </div>
  );
}
