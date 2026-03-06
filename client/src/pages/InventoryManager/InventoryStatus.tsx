import React from "react";
import { FaBox, FaTruck, FaCheckCircle, FaClipboardCheck } from "react-icons/fa";
import { motion } from "framer-motion";

interface InventoryStatusProps {
  name: string;
  supplier: string;
  arrival: string;
  status: "packaged" | "shipped" | "arrived" | "processing";
  from: string;
  to: string;
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({
  name,
  supplier,
  arrival,
  status,
  from,
  to,
}) => {
  // Calculate width based on status
  const getProgressWidth = () => {
    switch (status) {
      case "processing":
        return "16%";
      case "packaged":
        return "50%";
      case "shipped":
        return "80%";
      case "arrived":
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 transform transition-transform hover:scale-[1.02] relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-yellow-500/20 transition-colors duration-500"></div>

      <div className="flex flex-col md:flex-row justify-between items-start mb-8 relative z-10 gap-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Item tracking</p>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">{name}</h2>
          <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold mt-3 uppercase tracking-wider">
            {status}
          </span>
        </div>
        <div className="md:text-right bg-gray-900/50 p-4 rounded-xl border border-white/5 w-full md:w-auto">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Supplier</p>
          <h3 className="text-base font-bold text-white mb-3">{supplier}</h3>

          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Expected Delivery</p>
          <h3 className="text-lg font-bold text-green-400 flex items-center md:justify-end">
            <FaClipboardCheck className="mr-2 opacity-75" />
            {arrival}
          </h3>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mb-8 py-4 relative z-10">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex flex-col items-center">
            <div className={`p-2 rounded-full mb-2 ${status !== 'processing' ? 'bg-amber-500/20 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-gray-800 text-gray-500 border border-white/10'}`}>
              <FaBox className="text-sm" />
            </div>
            <p className={`text-xs font-bold uppercase tracking-wider ${status !== 'processing' ? "text-amber-500" : "text-gray-500"}`}>
              Packaged
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className={`p-2 rounded-full mb-2 ${(status === "shipped" || status === "arrived") ? 'bg-yellow-400/20 text-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]' : 'bg-gray-800 text-gray-500 border border-white/10'}`}>
              <FaTruck className="text-sm" />
            </div>
            <p className={`text-xs font-bold uppercase tracking-wider ${(status === "shipped" || status === "arrived") ? "text-yellow-400" : "text-gray-500"}`}>
              Shipped
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className={`p-2 rounded-full mb-2 ${status === "arrived" ? 'bg-green-400/20 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.3)]' : 'bg-gray-800 text-gray-500 border border-white/10'}`}>
              <FaCheckCircle className="text-sm" />
            </div>
            <p className={`text-xs font-bold uppercase tracking-wider ${status === "arrived" ? "text-green-400" : "text-gray-500"}`}>
              Arrived
            </p>
          </div>
        </div>

        <div className="flex items-center relative py-2">
          {/* Track Background */}
          <div className="w-full h-1.5 bg-gray-800/80 rounded-full border border-white/5 absolute"></div>

          {/* Progress fill */}
          <motion.div
            className="h-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full absolute shadow-[0_0_15px_rgba(250,204,21,0.5)] border border-yellow-300/20"
            initial={{ width: "0%" }}
            animate={{ width: getProgressWidth() }}
            transition={{ duration: 1, ease: "easeOut" }}
          ></motion.div>

          {/* Location Vehicle Tracker */}
          <motion.div
            className="absolute h-8 w-8 bg-gray-900 border-2 border-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.6)] -ml-4 z-20"
            initial={{ left: "0%" }}
            animate={{ left: getProgressWidth() }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-sm relative top-[-1px]">
              {status === "arrived" ? "✨" : "🚚"}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Location Origin & Destination */}
      <div className="flex justify-between items-center bg-gray-900/40 p-4 rounded-xl border border-white/5 mt-4 relative z-10">
        <div>
          <p className="text-[10px] uppercase text-gray-500 tracking-widest font-bold mb-1">Origin</p>
          <p className="text-sm font-semibold text-gray-200">{from}</p>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent flex-1 mx-6 relative">
          <div className="absolute right-0 top-1/2 -mt-1 w-2 h-2 border-t-2 border-r-2 border-gray-600 rotate-45"></div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase text-gray-500 tracking-widest font-bold mb-1">Destination</p>
          <p className="text-sm font-semibold text-gray-200">{to}</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryStatus;
