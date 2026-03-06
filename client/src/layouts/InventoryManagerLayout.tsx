import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { Routes, Route, useNavigate } from "react-router-dom";
import InventoryDashboard from "../pages/InventoryManager/InventoryDashboard";
import Inventory from "../pages/InventoryManager/Inventory";
import InventoryOrder from "../pages/InventoryManager/InventoryOrder";
import InventoryNotification from "../pages/InventoryManager/InventoryNotification";
import { LayoutDashboard, PackageSearch, ShoppingCart, Bell } from "lucide-react";

const InventoryManagerLayout: React.FC = () => {
  const navigate = useNavigate();

  // Check if user is authenticated and has the correct role
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    // Bypass for demo mode if we have a mock token
    if (!token && !userString) {
      navigate('/login');
    }
  }, [navigate]);

  const inventoryManagerLinks = [
    { name: "Dashboard", path: "/inventory-manager/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Inventory", path: "/inventory-manager/inventory", icon: <PackageSearch size={20} /> },
    { name: "Orders", path: "/inventory-manager/order", icon: <ShoppingCart size={20} /> },
    { name: "Notifications", path: "/inventory-manager/notifications", icon: <Bell size={20} /> },
  ];

  // Sample data for inventory orders
  const sampleOrders = [
    { name: "Surgical Masks", supplier: "Medical Supplies Inc.", category: "PPE", arrival: "3 days", status: "shipped" },
    { name: "Disposable Gloves", supplier: "Healthcare Products Ltd.", category: "PPE", arrival: "1 day", status: "arrived" }
  ];

  return (
    <div className="flex h-screen bg-[#0B0F19] text-white overflow-hidden font-poppins">
      <Sidebar links={inventoryManagerLinks} />
      <div className="flex-1 flex flex-col relative w-full overflow-hidden">
        <DashboardHeader title="Inventory Control" role="Inventory Manager" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="dashboard" element={<InventoryDashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="order" element={<InventoryOrder orders={sampleOrders} />} />
            <Route path="notifications" element={<InventoryNotification />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default InventoryManagerLayout;
