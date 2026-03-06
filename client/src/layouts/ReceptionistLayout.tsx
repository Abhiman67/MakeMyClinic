import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { Routes, Route, useNavigate } from "react-router-dom";
import ReceptionistRegistration from '../pages/Receptionist/ReceptionistRegistration';
import { LayoutDashboard } from "lucide-react";

const ReceptionistLayout: React.FC = () => {
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

  const initialRegistrations = [
    {
      name: "Saswat Kumar Dash",
      date: "10/10/2024",
      gender: "female",
      register: "10:30 a.m.",
      visit: "10:30 a.m.",
    },
    // Other entries...
  ];

  const receptionistLinks = [
    { name: 'Dashboard', path: '/receptionist/dashboard', icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0B0F19] text-white overflow-hidden font-poppins">
      <Sidebar links={receptionistLinks} />
      <div className="flex-1 flex flex-col relative w-full overflow-hidden">
        <DashboardHeader title="Front Desk" role="Receptionist" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="dashboard" element={<ReceptionistRegistration registrations={initialRegistrations} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default ReceptionistLayout;
