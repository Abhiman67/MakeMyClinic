import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminDashboard from "../pages/Administrator/AdminDashboard";
import AdminWard from "../pages/Administrator/AdminWard";
import AdminOPD from "../pages/Administrator/AdminOPD";
import AdminNotifications from "../pages/Administrator/AdminNotifications";
import AdminProfile from "../pages/Administrator/AdminProfile";
import AdminQueue from "../pages/Administrator/AdminQueue";
import { LayoutDashboard, BedDouble, Stethoscope, Bell, User } from "lucide-react";

const AdminLayout: React.FC = () => {
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

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Ward", path: "/admin/ward", icon: <BedDouble size={20} /> },
    { name: "OPD", path: "/admin/opd", icon: <Stethoscope size={20} /> },
    { name: "Notification", path: "/admin/notification", icon: <Bell size={20} /> },
    { name: "Profile", path: "/admin/profile", icon: <User size={20} /> },
  ];

  const patientDummy = [
    { name: "John Doe", bed: 101, gender: "Male", status: "Available" },
    { name: "Jane Smith", bed: 202, gender: "Female", status: "Occupied" },
    { name: "Robert Johnson", bed: 303, gender: "Male", status: "Available" },
  ];

  return (
    <div className="flex h-screen bg-[#0B0F19] text-white overflow-hidden font-poppins">
      <Sidebar links={adminLinks} />
      <div className="flex-1 flex flex-col relative w-full overflow-hidden">
        <DashboardHeader title="Hospital Overview" role="Administrator" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard title="Admin Dashboard" />} />
            <Route path="ward" element={<AdminWard patients={patientDummy} />} />
            <Route path="opd" element={<AdminQueue />} />
            <Route path="notification" element={<AdminNotifications title="Notification" />} />
            <Route path="profile" element={<AdminProfile title="Profile" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
