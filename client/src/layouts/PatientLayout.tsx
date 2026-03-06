import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { Routes, Route, useNavigate } from "react-router-dom";
import PatientHistory from '../pages/Patient/PatientHistory';
import PatientProfile from '../pages/Patient/PatientProfile';
import Map from '../pages/Patient/Map';
import PatientNotification from '../pages/Patient/PatientNotification';
import { Map as MapIcon, FileText, User, Bell } from "lucide-react";

const PatientLayout: React.FC = () => {
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

  const patientLinks = [
    { name: 'Map', path: '/patient/map', icon: <MapIcon size={20} /> },
    { name: 'Medical History', path: '/patient/medical-history', icon: <FileText size={20} /> },
    { name: 'Profile', path: '/patient/profile', icon: <User size={20} /> },
    { name: 'Notification', path: '/patient/notification', icon: <Bell size={20} /> },
  ];

  return (
    <div className="flex w-full h-screen bg-[#0B0F19] text-white overflow-hidden font-poppins">
      <Sidebar links={patientLinks} />
      <div className="flex-1 flex flex-col relative w-full overflow-hidden">
        <DashboardHeader title="Patient Portal" role="Patient" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="map" element={<Map />} />
            <Route path="medical-history" element={<PatientHistory />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="notification" element={<PatientNotification />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
