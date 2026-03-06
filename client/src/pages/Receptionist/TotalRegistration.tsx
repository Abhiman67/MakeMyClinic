import { FaUsers } from "react-icons/fa";

export default function ReceptionistTotalRegistration() {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group">
      {/* Decorative gradient blob */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="text-yellow-500 bg-yellow-500/10 p-4 rounded-xl">
        <FaUsers className="text-4xl" />
      </div>
      <div className="ml-5 z-10">
        <div className="text-gray-400 font-medium text-xs uppercase tracking-wider">
          Total Registrations
        </div>
        <div className="text-gray-100 font-bold text-4xl mt-1 tracking-tight">100</div>
        <div className="text-amber-500/80 text-sm mt-1 font-medium bg-amber-500/10 inline-block px-2 py-0.5 rounded-full">as of today</div>
      </div>
    </div>
  );
}
