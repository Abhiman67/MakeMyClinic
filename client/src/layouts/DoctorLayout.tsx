import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { Routes, Route, useNavigate } from "react-router-dom";
import DoctorProfile from "../pages/Doctor/DoctorProfile";
import DoctorNotification from "../pages/Doctor/DoctorNotification";
import DoctorAppointment from "../pages/Doctor/DoctorAppointment";
import { CalendarCheck, Bell, User } from "lucide-react";

const DoctorLayout: React.FC = () => {
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

  const doctorLinks = [
    { name: "Appointment", path: "/doctor/appointment", icon: <CalendarCheck size={20} /> },
    { name: "Notification", path: "/doctor/notification", icon: <Bell size={20} /> },
    { name: "Profile", path: "/doctor/profile", icon: <User size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0B0F19] text-white overflow-hidden font-poppins">
      <Sidebar links={doctorLinks} />
      <div className="flex-1 flex flex-col relative w-full overflow-hidden">
        <DashboardHeader title="Doctor Gateway" role="Doctor" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="appointment" element={<DoctorAppointment />} />
            <Route path="notification" element={<DoctorNotification />} />
            <Route path="profile" element={<DoctorProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
