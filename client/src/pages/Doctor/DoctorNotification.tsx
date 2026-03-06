import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaCalendarAlt,
  FaFlask,
  FaPrescriptionBottle,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { socket } from "../../socket";

const DoctorNotification = () => {
  const initialNotifications = {
    appointment: [
      {
        title: "Upcoming Appointment",
        message: "You have an appointment with John Doe at 3:00 PM today.",
      },
      {
        title: "Rescheduled Appointment",
        message:
          "The appointment with Sarah Smith has been rescheduled to 2:30 PM tomorrow.",
      },
    ],
    test: [
      {
        title: "New Lab Test Results",
        message: "Lab results for patient Emily Davis are now available.",
      },
    ],
    administrative: [
      {
        title: "Prescription Request",
        message:
          "Patient Emma Thompson has requested a refill for their prescription.",
      },
    ],
    reminder: [
      {
        title: "Prescription Renewal Reminder",
        message:
          "Reminder: The prescription for patient Mark Anderson expires in 5 days.",
      },
    ],
  };

  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeCategory, setActiveCategory] = useState("appointment");
  const [unreadNotifications, setUnreadNotifications] = useState({
    appointment: initialNotifications.appointment.length,
    test: initialNotifications.test.length,
    administrative: initialNotifications.administrative.length,
    reminder: initialNotifications.reminder.length,
  });

  useEffect(() => {
    socket.on("new-notification", (notification) => {
      const { type } = notification;

      // Add the new notification to the correct category
      setNotifications((prev) => ({
        ...prev,
        [type]: [notification, ...prev[type]],
      }));

      // Increment unread notifications count for that category
      setUnreadNotifications((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    });

    return () => {
      socket.off("new-notification");
    };
  }, []);

  const markAsRead = (category: string) => {
    setUnreadNotifications((prev) => ({
      ...prev,
      [category]: 0,
    }));
  };

  const renderNotifications = (category: string) => {
    return notifications[category as keyof typeof notifications].map((notification, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl relative overflow-hidden group hover:bg-white/10 transition-colors"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 to-amber-600"></div>
        <h3 className="text-lg font-bold text-white mb-2 ml-2">
          {notification.title}
        </h3>
        <p className="text-sm text-gray-400 ml-2">{notification.message}</p>
      </motion.div>
    ));
  };

  return (
    <div className="space-y-6 relative h-full w-full">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full z-0"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Notifications Center
          </h1>
          <p className="text-gray-400 text-sm mt-1">Review your latest updates and alerts</p>
        </div>
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <FaBell className="text-2xl text-yellow-500 animate-pulse" />
          </div>
          {Object.values(unreadNotifications).reduce((a, b) => a + b, 0) > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-[#0B0F19]"></span>
            </span>
          )}
        </div>
      </div>

      {/* Notification Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 relative z-10">
        <button
          className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center space-x-2 ${activeCategory === "appointment"
              ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          onClick={() => {
            setActiveCategory("appointment");
            markAsRead("appointment");
          }}
        >
          <FaCalendarAlt className={activeCategory === "appointment" ? "text-gray-900" : "text-gray-500"} />
          <span>Appointments</span>
          {unreadNotifications.appointment > 0 && (
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${activeCategory === "appointment" ? "bg-gray-900 text-yellow-500" : "bg-yellow-500/20 text-yellow-500"}`}>
              {unreadNotifications.appointment}
            </span>
          )}
        </button>

        <button
          className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center space-x-2 ${activeCategory === "test"
              ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          onClick={() => {
            setActiveCategory("test");
            markAsRead("test");
          }}
        >
          <FaFlask className={activeCategory === "test" ? "text-gray-900" : "text-gray-500"} />
          <span>Lab Tests</span>
          {unreadNotifications.test > 0 && (
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${activeCategory === "test" ? "bg-gray-900 text-yellow-500" : "bg-yellow-500/20 text-yellow-500"}`}>
              {unreadNotifications.test}
            </span>
          )}
        </button>

        <button
          className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center space-x-2 ${activeCategory === "administrative"
              ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          onClick={() => {
            setActiveCategory("administrative");
            markAsRead("administrative");
          }}
        >
          <FaPrescriptionBottle className={activeCategory === "administrative" ? "text-gray-900" : "text-gray-500"} />
          <span>Administrative</span>
          {unreadNotifications.administrative > 0 && (
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${activeCategory === "administrative" ? "bg-gray-900 text-yellow-500" : "bg-yellow-500/20 text-yellow-500"}`}>
              {unreadNotifications.administrative}
            </span>
          )}
        </button>

        <button
          className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center space-x-2 ${activeCategory === "reminder"
              ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          onClick={() => {
            setActiveCategory("reminder");
            markAsRead("reminder");
          }}
        >
          <FaClock className={activeCategory === "reminder" ? "text-gray-900" : "text-gray-500"} />
          <span>Reminders</span>
          {unreadNotifications.reminder > 0 && (
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${activeCategory === "reminder" ? "bg-gray-900 text-yellow-500" : "bg-yellow-500/20 text-yellow-500"}`}>
              {unreadNotifications.reminder}
            </span>
          )}
        </button>
      </div>

      {/* Display Notifications */}
      <div className="grid grid-cols-1 gap-4 relative z-10 max-w-4xl">
        {notifications[activeCategory as keyof typeof notifications].length > 0 ? (
          renderNotifications(activeCategory)
        ) : (
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center backdrop-blur-xl">
            <FaBell className="mx-auto text-4xl text-gray-600 mb-4" />
            <p className="text-gray-400 font-medium tracking-wide">No new notifications in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorNotification;
