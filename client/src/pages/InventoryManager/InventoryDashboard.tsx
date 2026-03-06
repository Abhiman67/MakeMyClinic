import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaPills,
  FaClock,
  FaDollarSign,
  FaArrowRight,
  FaBrain,
} from "react-icons/fa";

const InventoryDashboard: React.FC = () => {
  // Dummy Data for Medicines
  const medicineData = [
    {
      name: "Paracetamol",
      stock: 120,
      expiration: "2025-12-01",
      status: "In Stock",
      depletionRate: "Normal",
    },
    {
      name: "Amoxicillin",
      stock: 80,
      expiration: "2024-11-01",
      status: "In Stock",
      depletionRate: "High",
    },
    {
      name: "Ibuprofen",
      stock: 45,
      expiration: "2023-08-15",
      status: "Low Stock",
      depletionRate: "Critical (3 days)",
    },
    {
      name: "Metformin",
      stock: 30,
      expiration: "2024-05-30",
      status: "Low Stock",
      depletionRate: "Critical (2 days)",
    },
    {
      name: "Aspirin",
      stock: 200,
      expiration: "2026-02-01",
      status: "In Stock",
      depletionRate: "Slow",
    },
  ];

  const lowStockAlerts = medicineData.filter((medicine) => medicine.stock < 50);

  // Dummy data for the past 6 months' profit
  const profitData = [
    { month: "April", profit: 1200 },
    { month: "May", profit: 900 },
    { month: "June", profit: 1400 },
    { month: "July", profit: 1500 },
    { month: "August", profit: 1100 },
    { month: "September", profit: 1600 },
  ];

  // Dummy data for the past 6 months' medicine supplied
  const suppliedData = [
    { month: "April", supplied: 600 },
    { month: "May", supplied: 450 },
    { month: "June", supplied: 700 },
    { month: "July", supplied: 750 },
    { month: "August", supplied: 500 },
    { month: "September", supplied: 800 },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#0B0F19] text-gray-100 p-6 sm:p-10 font-sans overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-1/4 w-full max-w-2xl h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
              Inventory Dashboard
            </h2>
            <p className="text-gray-400 text-sm mt-1">Real-time overview of medicines, stock levels, and supply trends</p>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-green-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="text-green-400 bg-green-500/10 p-4 rounded-xl">
              <FaPills className="text-3xl" />
            </div>
            <div className="ml-5 z-10">
              <div className="text-gray-400 font-medium text-xs uppercase tracking-wider">Total Medicines</div>
              <div className="text-gray-100 font-bold text-3xl mt-1 tracking-tight">{medicineData.length}</div>
              <div className="text-green-400 text-xs mt-1 font-medium bg-green-500/10 inline-block px-2 py-0.5 rounded-full">+5 New</div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-red-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="text-red-500 bg-red-500/10 p-4 rounded-xl animate-pulse ring-2 ring-red-500/30">
              <FaBrain className="text-3xl" />
            </div>
            <div className="ml-5 z-10 w-full">
              <div className="text-gray-400 font-medium text-xs uppercase tracking-wider flex items-center gap-2">
                Predictive Depletion
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest">Active</span>
              </div>
              <div className="flex items-end justify-between w-full mt-1">
                <div className="text-red-400 font-bold text-3xl tracking-tight">{lowStockAlerts.length} <span className="text-sm font-medium text-gray-400 block -mt-1">Items critically low</span></div>
                <button className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 py-1.5 flex items-center gap-2 rounded-lg transition-colors mb-1 shadow-lg shadow-black/20">Review <FaArrowRight /></button>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="text-amber-500 bg-amber-500/10 p-4 rounded-xl">
              <FaClock className="text-3xl" />
            </div>
            <div className="ml-5 z-10">
              <div className="text-gray-400 font-medium text-xs uppercase tracking-wider">Expired Medicines</div>
              <div className="text-gray-100 font-bold text-3xl mt-1 tracking-tight">0</div>
              <div className="text-amber-500/80 text-xs mt-1 font-medium bg-amber-500/10 inline-block px-2 py-0.5 rounded-full">All clear</div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="text-cyan-400 bg-cyan-500/10 p-4 rounded-xl">
              <FaDollarSign className="text-3xl" />
            </div>
            <div className="ml-5 z-10">
              <div className="text-gray-400 font-medium text-xs uppercase tracking-wider">Stock Value</div>
              <div className="text-gray-100 font-bold text-3xl mt-1 tracking-tight">$12.5k</div>
              <div className="text-cyan-400 text-xs mt-1 font-medium bg-cyan-500/10 inline-block px-2 py-0.5 rounded-full">+3% MoM</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Medicine Inventory */}
          <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center">
                <div className="w-1.5 h-6 bg-yellow-500 rounded-full mr-3 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                Medicine Inventory
              </h3>
              <button className="text-xs font-semibold text-yellow-500 hover:text-white transition-colors">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-xs tracking-wider uppercase text-gray-500 bg-gray-900/40">
                    <th className="px-6 py-3 font-semibold">Medicine Name</th>
                    <th className="px-6 py-3 font-semibold">Stock</th>
                    <th className="px-6 py-3 font-semibold">Expiration Date</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {medicineData.map((medicine, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-white group-hover:text-yellow-400 transition-colors">{medicine.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300 font-medium">{medicine.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm flex flex-col">
                        {medicine.expiration}
                        <span className={`text-xs mt-1 font-bold ${medicine.depletionRate.includes('Critical') ? 'text-red-400' : medicine.depletionRate === 'High' ? 'text-amber-500' : 'text-gray-500'}`}>
                          Pred: {medicine.depletionRate}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${medicine.status === "Low Stock"
                          ? "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                          : "bg-green-500/10 text-green-400 border-green-500/20"
                          }`}>
                          {medicine.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-red-500/5">
              <h3 className="text-lg font-bold text-white flex items-center">
                <div className="w-1.5 h-6 bg-red-500 rounded-full mr-3 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                Low Stock Alerts
              </h3>
              <button className="text-xs font-semibold text-red-400 bg-red-500/10 px-3 py-1 rounded-full hover:bg-red-500/20 transition-colors">Reorder All</button>
            </div>

            <div className="overflow-x-auto flex-1 bg-[url('/noise.png')] bg-repeat opacity-[0.98]">
              <table className="min-w-full text-left border-collapse h-full">
                <thead>
                  <tr className="border-b border-white/5 text-xs tracking-wider uppercase text-gray-400 bg-gray-900/40">
                    <th className="px-6 py-3 font-semibold">Critical Items</th>
                    <th className="px-6 py-3 font-semibold text-right">Current Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {lowStockAlerts.map((medicine, index) => (
                    <tr key={index} className="hover:bg-red-500/5 transition-colors group border-l-2 border-transparent hover:border-red-500">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-red-100 flex items-center gap-2">
                          <FaBrain className="text-red-500 text-sm animate-pulse" />
                          {medicine.name}
                        </div>
                        <div className="text-xs text-red-400/70 mt-1 flex items-center">
                          <FaClock className="mr-1" />
                          Predicted to deplete in: <span className="font-bold text-red-400 ml-1">{medicine.depletionRate.replace('Critical (', '').replace(')', '')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap flex flex-col items-end justify-center">
                        <span className="text-red-400 font-bold bg-gray-900/80 px-4 py-1.5 rounded-lg border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]">{medicine.stock} units</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bar Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Profit by Month Bar Chart */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <div className="w-1.5 h-6 bg-cyan-500 rounded-full mr-3 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
              Monthly Return ($)
            </h3>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                  <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                  <Tooltip
                    cursor={{ fill: '#ffffff0a' }}
                    contentStyle={{
                      backgroundColor: "rgba(11, 15, 25, 0.9)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#2dd4bf", fontWeight: "bold" }}
                  />
                  <Bar dataKey="profit" fill="url(#colorProfit)" radius={[6, 6, 0, 0]} />
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={1} />
                      <stop offset="95%" stopColor="#0f766e" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Medicine Supplied by Month Bar Chart */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <div className="w-1.5 h-6 bg-yellow-500 rounded-full mr-3 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
              Medicines Supplied
            </h3>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={suppliedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                  <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: '#ffffff0a' }}
                    contentStyle={{
                      backgroundColor: "rgba(11, 15, 25, 0.9)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#f59e0b", fontWeight: "bold" }}
                  />
                  <Bar dataKey="supplied" fill="url(#colorSupplied)" radius={[6, 6, 0, 0]} />
                  <defs>
                    <linearGradient id="colorSupplied" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={1} />
                      <stop offset="95%" stopColor="#b45309" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InventoryDashboard;
