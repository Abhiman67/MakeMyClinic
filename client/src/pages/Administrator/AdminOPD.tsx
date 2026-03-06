import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  FiUsers,
  FiUserCheck,
  FiClock,
  FiUser,
  FiPlusCircle,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { motion } from "framer-motion";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminOPD: React.FC = () => {
  // Chart configurations for Dark Mode
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "rgba(255, 255, 255, 0.7)" },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "rgba(255, 255, 255, 0.5)" },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "rgba(255, 255, 255, 0.5)" },
      },
    },
  };

  const lineChartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Patients",
        data: [50, 60, 70, 80, 60, 70, 90, 100, 110, 120, 90, 100],
        fill: true,
        backgroundColor: "rgba(234, 179, 8, 0.1)", // yellow-500/10
        borderColor: "rgba(234, 179, 8, 1)", // yellow-500
        tension: 0.4,
        pointBackgroundColor: "rgba(234, 179, 8, 1)",
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "ICU",
        data: [40, 50, 70, 60, 80, 60],
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 4,
      },
      {
        label: "OPD",
        data: [60, 70, 80, 90, 50, 40],
        backgroundColor: "rgba(234, 179, 8, 0.8)", // yellow-500
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="space-y-6 relative h-full w-full">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/10 blur-[100px] pointer-events-none rounded-full z-0"></div>

      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          OPD Management
        </h1>
        <p className="text-gray-400 text-sm mt-1">Monitor outpatient department metrics</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {[
          { title: "Active Doctors", value: "998", icon: <FiUser />, color: "text-blue-400", bg: "bg-blue-400/10" },
          { title: "Total Patients", value: "1,072", icon: <FiUsers />, color: "text-purple-400", bg: "bg-purple-400/10" },
          { title: "Attended Today", value: "72", icon: <FiCheckCircle />, color: "text-green-400", bg: "bg-green-400/10" },
          { title: "Pending Queue", value: "618", icon: <FiClock />, color: "text-amber-500", bg: "bg-amber-500/10" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl relative overflow-hidden group hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-gray-400 font-medium text-sm">{stat.title}</h3>
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
            </div>
            <div className={`absolute -bottom-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
              {React.cloneElement(stat.icon as React.ReactElement, { size: 80 })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
            Patient Growth Trend
          </h3>
          <div className="h-72">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <div className="w-2 h-6 bg-amber-500 rounded-full mr-3"></div>
            ICU vs OPD Admission Flow
          </h3>
          <div className="h-72">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">

        {/* Next Appointments Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <FiClock className="mr-3 text-yellow-500" /> Upcoming Priority Appointments
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-80">
            {[
              { name: "Bernardo Galaviz", doctor: "Dr. Cristina Groves", time: "7:00 PM", status: "Waiting" },
              { name: "Emily Chen", doctor: "Dr. Aarav Mehta", time: "7:15 PM", status: "Triage" },
              { name: "Marcus Johnson", doctor: "Dr. Sarah Lee", time: "7:30 PM", status: "Delayed" },
            ].map((apt, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 px-6 border-b border-white/5 hover:bg-white/5 transition-colors group">
                <div>
                  <p className="font-bold text-white group-hover:text-amber-400 transition-colors">{apt.name}</p>
                  <p className="text-sm text-gray-400 mt-1">With {apt.doctor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{apt.time}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${apt.status === 'Waiting' ? 'bg-amber-500/20 text-amber-400' : apt.status === 'Triage' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Management Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <FiAlertCircle className="mr-3 text-amber-500" /> Resource Allocation Locks
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300 font-medium">OPD Capacity</span>
                <span className="text-amber-400 font-bold">12%</span>
              </div>
              <div className="bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: "12%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300 font-medium">New Patient Registrations</span>
                <span className="text-green-400 font-bold">71%</span>
              </div>
              <div className="bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: "71%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300 font-medium">Laboratory Test Flow</span>
                <span className="text-blue-400 font-bold">42%</span>
              </div>
              <div className="bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminOPD;
