import { useState } from "react";
import {
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBell,
  FaBrain
} from "react-icons/fa";

const InventoryNotification = () => {
  // Dummy notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Low Stock",
      message: "Paracetamol is running low. Only 20 units left.",
      time: "2 hours ago",
      status: "unread",
    },
    {
      id: 2,
      type: "Depletion Prediction",
      message: "AI predicts Ibuprofen stock will critically deplete in 3 days based on current ER admission rates.",
      time: "1 hour ago",
      status: "unread",
    },
    {
      id: 3,
      type: "Expired Medicine",
      message: "Amoxicillin batch #104 has expired on 2024-11-01.",
      time: "1 day ago",
      status: "unread",
    },
    {
      id: 3,
      type: "Restocked",
      message: "Amoxicillin has been restocked. 100 units added.",
      time: "3 days ago",
      status: "read",
    },
    {
      id: 4,
      type: "New Medicine",
      message: "New batch of Aspirin is available in stock.",
      time: "5 days ago",
      status: "read",
    },
  ]);

  // Handle the 'Mark as Read' button click
  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, status: "read" }
          : notification
      )
    );
  };

  // Map notification types to corresponding icons
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "Low Stock":
        return <FaExclamationTriangle className="text-yellow-500" />;
      case "Expired Medicine":
        return <FaClock className="text-red-500" />;
      case "Restocked":
        return <FaBoxOpen className="text-green-500" />;
      case "New Medicine":
        return <FaCheckCircle className="text-blue-400" />;
      case "Depletion Prediction":
        return <FaBrain className="text-purple-400 animate-pulse" />;
      default:
        return <FaBoxOpen className="text-gray-400" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0F19] text-gray-100 p-6 sm:p-10 font-sans overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-full max-w-lg h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
              <div className="w-1.5 h-8 bg-amber-500 rounded-full mr-3 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
              Inventory Alerts Center
            </h2>
            <p className="text-gray-400 text-sm mt-2 ml-4">Stay updated on stock levels and expiry tracking.</p>
          </div>

          <button className="flex items-center gap-2 py-2.5 px-6 font-bold tracking-wide bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 rounded-xl hover:from-yellow-400 hover:to-amber-500 transition duration-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <FaBell /> Notification Settings
          </button>
        </div>

        {/* Notifications Table Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs tracking-wider uppercase text-gray-400 bg-gray-900/40">
                  <th className="px-6 py-4 font-semibold">Alert Type</th>
                  <th className="px-6 py-4 font-semibold">Message Detail</th>
                  <th className="px-6 py-4 font-semibold">Time Log</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {notifications.map((notification) => (
                  <tr
                    key={notification.id}
                    className={`transition-colors group ${notification.status === "unread" ? "bg-amber-500/5 hover:bg-amber-500/10" : "hover:bg-white/5"
                      }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-900/50 rounded-lg border border-white/5 shadow-inner">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <span className="font-bold text-white tracking-wide">{notification.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-sm ${notification.status === "unread" ? "text-gray-200 font-medium" : "text-gray-400"}`}>
                        {notification.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {notification.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 flex items-center justify-center w-max text-xs font-bold uppercase tracking-wider rounded-full border ${notification.status === "unread"
                          ? "bg-amber-500/20 text-yellow-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                          : "bg-white/5 text-gray-400 border-white/10"
                          }`}
                      >
                        {notification.status === "unread" ? "Action Required" : "Acknowledged"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {notification.status === "unread" ? (
                        <button
                          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500 hover:text-gray-900 shadow-[0_0_10px_rgba(245,158,11,0.1)] transition-all"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </button>
                      ) : (
                        <span className="text-gray-600 text-sm italic pr-4">Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryNotification;
