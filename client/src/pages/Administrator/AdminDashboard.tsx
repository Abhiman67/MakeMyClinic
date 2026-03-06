import React from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import {
  FiSearch,
  FiPlus,
  FiUsers,
  FiActivity,
  FiShoppingBag,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const AdminDashboard: React.FC = () => {
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
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Opd Consultations",
        data: [120, 190, 130, 250, 220, 300, 280],
        fill: true,
        backgroundColor: "rgba(234, 179, 8, 0.1)", // yellow-500/10
        borderColor: "rgba(234, 179, 8, 1)", // yellow-500
        tension: 0.4,
        pointBackgroundColor: "rgba(234, 179, 8, 1)",
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General"],
    datasets: [
      {
        data: [30, 20, 15, 25, 10],
        backgroundColor: [
          "#eab308", // yellow-500
          "#f59e0b", // amber-500
          "#d97706", // amber-600
          "#fbbf24", // yellow-400
          "#fcd34d", // yellow-300
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Income (k)",
        data: [12, 19, 15, 25, 22, 30, 28],
        backgroundColor: "rgba(234, 179, 8, 0.8)", // yellow-500
        borderRadius: 4,
      },
      {
        label: "Expenses (k)",
        data: [8, 10, 12, 15, 12, 18, 15],
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="space-y-6 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 blur-[100px] pointer-events-none rounded-full"></div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">System Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time hospital performance</p>
        </div>

        <div className="flex w-full sm:w-auto space-x-3 items-center">
          <div className="relative flex-1 sm:flex-none">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search metrics..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 rounded-xl focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 outline-none transition-all backdrop-blur-md"
            />
          </div>
          <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-gray-900 font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-yellow-500/20 transition-all">
            <FiPlus />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {[
          { title: "Total Patients", value: "2,405", trend: "+12.5%", icon: <FiUsers /> },
          { title: "Available Beds", value: "45/120", trend: "-5.2%", icon: <FiActivity /> },
          { title: "Monthly Revenue", value: "$124,500", trend: "+18.2%", icon: <FiTrendingUp /> },
          { title: "Inventory Alerts", value: "12 Items", trend: "Needs Restock", icon: <FiShoppingBag /> },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl relative overflow-hidden group hover:bg-white/10 transition-colors"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              {React.cloneElement(stat.icon as React.ReactElement, { size: 60 })}
            </div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-gray-400 font-medium text-sm">{stat.title}</h3>
              <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-1">{stat.value}</h2>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : stat.trend.startsWith('-') ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-1 lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl"
        >
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
            <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
            Patient Influx (OPD)
          </h2>
          <div className="h-72">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl flex flex-col"
        >
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
            <div className="w-2 h-6 bg-amber-500 rounded-full mr-3"></div>
            Department Load
          </h2>
          <div className="h-64 flex-1 flex items-center justify-center relative">
            <Doughnut data={doughnutChartData} options={{ ...chartOptions, maintainAspectRatio: false }} />
            {/* Inner Circle text for doughnut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
              <span className="text-3xl font-bold text-white">5</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Active</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
            <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
            Revenue vs Expenses View
          </h2>
          <div className="h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-0 rounded-2xl backdrop-blur-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <FiStar className="mr-3 text-yellow-500" /> Top Performing Treatments
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[
              { name: "General Checkup", rate: "98%", score: "4.9", trend: "up" },
              { name: "Dental Scaling", rate: "92%", score: "4.7", trend: "up" },
              { name: "Blood Test Panel", rate: "88%", score: "4.5", trend: "down" },
              { name: "X-Ray Imaging", rate: "85%", score: "4.6", trend: "up" },
              { name: "Physiotherapy Session", rate: "80%", score: "4.4", trend: "down" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 px-6 border-b border-white/5 hover:bg-white/5 transition-colors">
                <div>
                  <h4 className="text-white font-medium">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">Satisfaction: {item.score}/5.0</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-white block">{item.rate}</span>
                  <span className={`text-xs ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {item.trend === 'up' ? '▲ Trending' : '▼ Dropping'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
