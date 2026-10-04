import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Layout() {
  const [isSidebaropen, setIsSidebaropen] = useState(false)
  return (
    <div>
      <Navbar isSidebaropen={isSidebaropen} setIsSidebaropen={setIsSidebaropen} />

      <div className="flex mt-16">
        <Sidebar isSidebaropen={isSidebaropen} setIsSidebaropen={setIsSidebaropen} />

        {/* Main content */}
        <main className="min-w-0 flex-1 p-6">
          <Outlet /> {/* renders nested routes */}
        </main>
      </div>
    </div>
  );
}
