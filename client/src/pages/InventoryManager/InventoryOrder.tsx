import React, { useState } from "react";
import MedicineTrack from "./InventoryStatus";
import { FaTimes, FaSearch, FaFilter, FaMapMarkerAlt } from "react-icons/fa";

interface InventoryOrderProps {
  orders?: {
    name: string;
    supplier: string;
    category: string;
    arrival: string;
    status: string;
  }[];
}

const orders = [
  {
    name: "Aspirin",
    supplier: "Wellness Meds",
    category: "Medicine",
    arrival: "4 days",
    status: "arrived",
  },
  {
    name: "Amoxicillin",
    supplier: "CarePlus Pharmacy",
    category: "Antibiotic",
    arrival: "2 days",
    status: "shipped",
  },
  {
    name: "Metformin",
    supplier: "Diabetes Care",
    category: "Medicine",
    arrival: "6 days",
    status: "processing",
  },
];

const InventoryOrder: React.FC<InventoryOrderProps> = () => {
  const [selectedOrder, setSelectedOrder] = useState<
    null | any
  >(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleTrackClick = (order: any) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  // Filter orders based on search query and selected category
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? order.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0F19] text-gray-100 p-6 sm:p-10 font-sans overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/4 w-full max-w-2xl h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
              Inventory Orders & Tracking
            </h2>
            <p className="text-gray-400 text-sm mt-1">Manage active orders, stock requests, and tracking status</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="flex flex-wrap gap-3">
            <button className="py-2.5 px-6 font-bold tracking-wide bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 rounded-xl hover:from-yellow-400 hover:to-amber-500 transition duration-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              Active Orders
            </button>
            <button className="py-2.5 px-6 font-bold tracking-wide bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition duration-300">
              Archived
            </button>
            <button className="py-2.5 px-6 font-bold tracking-wide bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition duration-300">
              Manage Suppliers
            </button>
          </div>

          {/* Search and Category */}
          <div className="flex items-center space-x-3 w-full lg:w-auto">
            <div className="relative w-full lg:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all shadow-inner"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <button
              className={`py-3 px-6 font-bold tracking-wide rounded-xl flex items-center gap-2 border transition-all duration-300 ${selectedCategory ? "bg-amber-500/20 text-amber-500 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]" : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"}`}
              onClick={() => handleCategoryChange("Medicine")}
            >
              <FaFilter className={selectedCategory ? "text-amber-500" : "text-gray-500"} />
              {selectedCategory ? "Filtered" : "Filter Meds"}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs tracking-wider uppercase text-gray-400 bg-gray-900/40">
                  <th className="px-6 py-4 font-semibold">Order Item Name</th>
                  <th className="px-6 py-4 font-semibold">Supplier</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Expected Arrival</th>
                  <th className="px-6 py-4 font-semibold">Current Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">No orders matched your search criteria.</td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-white group-hover:text-amber-400 transition-colors">{order.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{order.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium">
                          {order.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold tracking-wide text-gray-300">{order.arrival}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 border rounded-full text-xs font-bold uppercase tracking-wider ${order.status === "arrived" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                            order.status === "shipped" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                              "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleTrackClick(order)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/20 text-amber-500 font-semibold rounded-lg hover:bg-amber-500 hover:text-gray-900 transition duration-300 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                        >
                          <FaMapMarkerAlt /> Live Track
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Overlay for Track */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="relative flex flex-col items-center">
              {/* Medicine Tracking Info Card (Handles its own design layout) */}
              <div className="animate-fade-in-up">
                <MedicineTrack
                  name={selectedOrder.name}
                  supplier={selectedOrder.supplier}
                  arrival={selectedOrder.arrival}
                  status={
                    selectedOrder.status as "packaged" | "shipped" | "arrived" | "processing"
                  }
                  from="Central Distribution Hub"
                  to="Local Hospital Pharmacy"
                />
              </div>

              {/* Outer Close Button */}
              <button
                className="mt-6 flex justify-center items-center h-12 w-12 bg-white/10 hover:bg-red-500 text-gray-300 hover:text-white rounded-full transition-colors backdrop-blur-sm"
                onClick={closeModal}
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryOrder;
