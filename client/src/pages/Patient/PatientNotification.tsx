import React, { useEffect, useState } from "react";
import { socket } from "../../socket";
import {
  FaSearch,
  FaHospital,
  FaUserMd,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaBell,
  FaClock,
  FaFileInvoiceDollar,
  FaWalking
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import PaymentModal from "./PaymentModal";

// Define the options for the time period dropdown
const timePeriodOptions = [
  { label: "Today", value: 1440 },
  { label: "Next 7 Days", value: 10080 },
  { label: "Next 30 Days", value: 43200 },
  { label: "All Upcoming", value: Infinity },
];

// Sample appointment data
const appointmentsData = [
  {
    id: 1,
    doctor: "Dr. Anna Grace",
    hospital: "Apollo Hospital",
    department: "Cardiology",
    status: "Confirmed",
    scheduledOn: "2024-11-20T22:30:00",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    doctor: "Dr. John Doe",
    hospital: "City Hospital",
    department: "Neurology",
    status: "Pending",
    scheduledOn: "2024-11-21T14:00:00",
    img: "https://via.placeholder.com/100",
  },
];

// Utility to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const PatientNotification: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appointments, setAppointments] = useState(appointmentsData);
  const [editingAppointmentId, setEditingAppointmentId] = useState<number | null>(null);
  const [newScheduledDate, setNewScheduledDate] = useState<string>("");

  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [activeAlertId, setActiveAlertId] = useState<number | null>(null);

  // Notification Alerts Data
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "Queue",
      title: "Queue Update: Almost your turn!",
      message: "There are only 2 patients ahead of you for Dr. Anna Grace.",
      time: "10 mins ago",
      icon: <FaWalking className="text-amber-500 text-xl" />,
      read: false,
    },
    {
      id: 2,
      type: "Billing",
      title: "Invoice Generated",
      message: "Please pay the consultation fee of $50 for your recent visit.",
      time: "2 hours ago",
      icon: <FaFileInvoiceDollar className="text-cyan-400 text-xl" />,
      read: false,
    },
    {
      id: 3,
      type: "System",
      title: "Appointment Approved",
      message: "Your request for Dr. John Doe on Nov 21 has been approved.",
      time: "1 day ago",
      icon: <FaCheckCircle className="text-green-400 text-xl" />,
      read: true,
    }
  ]);

  const markAlertAsRead = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const handlePayClick = (id: number, amount: number) => {
    setPaymentAmount(amount);
    setActiveAlertId(id);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    if (activeAlertId) {
      markAlertAsRead(activeAlertId);
      // Show a success notification or something similar if needed
    }
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  useEffect(() => {
    socket.on("UserTicket", (data: any) => {
      setAppointments((prevAppointments) => [data, ...prevAppointments]);
    });

    socket.on("reject-patient-request", (patient: any) => {
      // Handle rejection visually here if needed
    });

    return () => {
      socket.off("UserTicket");
    };
  }, []);

  const filterAppointments = () => {
    const lowerQuery = searchQuery.toLowerCase();
    const currentTime = new Date();

    return appointments.filter((appointment) => {
      const scheduledTime = new Date(appointment.scheduledOn);
      const differenceInMinutes =
        (scheduledTime.getTime() - currentTime.getTime()) / 60000;

      const matchesQuery =
        appointment.doctor.toLowerCase().includes(lowerQuery) ||
        appointment.hospital.toLowerCase().includes(lowerQuery) ||
        appointment.department.toLowerCase().includes(lowerQuery);

      const matchesTimePeriod =
        selectedPeriod === null || differenceInMinutes <= selectedPeriod;

      return matchesQuery && matchesTimePeriod && scheduledTime > currentTime; // Only show future
    });
  };

  const filteredAppointments = filterAppointments();

  const handleRescheduleClick = (
    appointmentId: number,
    currentDate: string
  ) => {
    setEditingAppointmentId(appointmentId);
    // Convert to ISO string for datetime-local input
    const isoDate = new Date(currentDate).toISOString().slice(0, 16);
    setNewScheduledDate(isoDate);
  };

  const handleSaveDate = (appointmentId: number) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, scheduledOn: newScheduledDate }
          : appointment
      )
    );
    setEditingAppointmentId(null);
  };

  const handleCancel = () => {
    setEditingAppointmentId(null);
  };

  return (
    <div className="space-y-6 relative h-full w-full max-w-5xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full z-0"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 relative z-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
            <FaBell className="mr-3 text-yellow-500" />
            Live Notifications
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track your upcoming appointments and status updates</p>
        </div>
      </div>

      {/* Controls Container */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl relative z-10 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search doctors, hospitals, specalties..."
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaClock className="text-gray-500" />
            </div>
            <select
              className="w-full pl-10 pr-10 py-3 bg-gray-900/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all appearance-none cursor-pointer"
              onChange={(e) => setSelectedPeriod(e.target.value ? Number(e.target.value) : null)}
              value={selectedPeriod || ""}
            >
              <option value="">All Upcoming Time Remaining</option>
              {timePeriodOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-900">
                  {option.label}
                </option>
              ))}
            </select>
            {/* Custom Arrow because appearance-none removes it */}
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts & Notifications Section */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            Recent Alerts
            {unreadCount > 0 && (
              <span className="ml-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount} New</span>
            )}
          </h2>
          <button className="text-xs text-amber-500 font-semibold hover:text-amber-400 transition" onClick={() => setAlerts(alerts.map(a => ({ ...a, read: true })))}>Mark all as read</button>
        </div>

        <div className="space-y-3">
          {alerts.map((alert, idx) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl border flex items-start gap-4 transition-all relative overflow-hidden group ${alert.read ? 'bg-white/5 border-white/5 opacity-70 hover:opacity-100' : 'bg-gradient-to-r from-gray-900 to-gray-800 border-white/10 shadow-lg'}`}
            >
              {!alert.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>}
              <div className={`p-3 rounded-lg ${alert.read ? 'bg-gray-800' : 'bg-gray-800/80 ring-1 ring-white/10'}`}>
                {alert.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold ${alert.read ? 'text-gray-300' : 'text-white'}`}>{alert.title}</h3>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <p className="text-sm text-gray-400">{alert.message}</p>

                {alert.type === "Billing" && !alert.read && (
                  <button
                    onClick={() => handlePayClick(alert.id, 50.00)}
                    className="mt-3 text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-cyan-500 hover:text-gray-900 transition flex items-center gap-2"
                  >
                    Pay Now <FaFileInvoiceDollar />
                  </button>
                )}
              </div>
              {!alert.read && (
                <button onClick={() => markAlertAsRead(alert.id)} className="text-gray-500 hover:text-white p-2" title="Mark as read">
                  <FaTimesCircle />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-4 relative z-10">Upcoming Appointments</h2>

      {/* Display Filtered Appointments */}
      <div className="space-y-4 relative z-10">
        <AnimatePresence>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl backdrop-blur-xl relative overflow-hidden group hover:bg-white/10 transition-colors"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-500 to-amber-600"></div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ml-2">
                  {/* Left Info */}
                  <div className="flex items-center gap-5 w-full lg:w-auto">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full blur opacity-40"></div>
                      <img
                        src={appointment.img}
                        alt={appointment.doctor}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#0B0F19] object-cover relative z-10"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h2 className="text-xl font-bold text-white">
                          {appointment.doctor}
                        </h2>
                        <span
                          className={`lg:hidden px-2.5 py-1 rounded-full text-xs font-bold flex items-center ${appointment.status === "Confirmed"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            }`}
                        >
                          {appointment.status === "Confirmed" ? <FaCheckCircle className="mr-1.5" /> : <FaTimesCircle className="mr-1.5" />}
                          {appointment.status}
                        </span>
                      </div>

                      <div className="space-y-1 mt-2">
                        <p className="text-gray-300 text-sm flex items-center font-medium">
                          <FaHospital className="text-amber-500 mr-2 w-4" />
                          {appointment.hospital}
                        </p>
                        <p className="text-gray-400 text-sm flex items-center">
                          <FaUserMd className="text-gray-500 mr-2 w-4" />
                          {appointment.department}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Info & Actions */}
                  <div className="flex flex-col lg:items-end w-full lg:w-auto mt-4 lg:mt-0 pt-4 lg:pt-0 border-t border-white/10 lg:border-t-0">
                    {/* Desktop Status Badge */}
                    <span
                      className={`hidden lg:flex px-3 py-1 rounded-full text-xs font-bold items-center mb-3 ${appointment.status === "Confirmed"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        }`}
                    >
                      {appointment.status === "Confirmed" ? <FaCheckCircle className="mr-1.5" /> : <FaTimesCircle className="mr-1.5" />}
                      {appointment.status}
                    </span>

                    <div className="flex items-center text-gray-200 font-medium bg-black/30 px-4 py-2 rounded-xl border border-white/5 mb-4">
                      <FaCalendarAlt className="text-yellow-500 mr-2.5" />
                      {formatDate(appointment.scheduledOn)}
                    </div>

                    {editingAppointmentId === appointment.id ? (
                      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <input
                          type="datetime-local"
                          className="px-4 py-2 bg-gray-900 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                          value={newScheduledDate}
                          onChange={(e) => setNewScheduledDate(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <button
                            className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-gray-900 font-semibold px-4 py-2 rounded-xl transition-all shadow-[0_0_10px_rgba(34,197,94,0.3)] text-sm"
                            onClick={() => handleSaveDate(appointment.id)}
                          >
                            Save
                          </button>
                          <button
                            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium px-4 py-2 rounded-xl transition-all text-sm"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="w-full lg:w-auto bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-gray-900 font-semibold px-6 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center space-x-2"
                        onClick={() => handleRescheduleClick(appointment.id, appointment.scheduledOn)}
                      >
                        <FaCalendarAlt />
                        <span>Request Reschedule</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 border border-white/10 p-10 rounded-2xl text-center backdrop-blur-xl"
            >
              <FaBell className="mx-auto text-4xl text-gray-600 mb-4" />
              <p className="text-gray-400 font-medium tracking-wide">No upcoming appointments or notifications.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showPaymentModal && (
        <PaymentModal
          amount={paymentAmount}
          closeModal={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default PatientNotification;
