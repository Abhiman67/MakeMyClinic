import { FaHourglassHalf, FaUserCheck } from "react-icons/fa";

export default function ReceptionistRegistrationStatus() {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden group hover:bg-white/10 transition-colors duration-300">
      {/* Decorative gradient blob */}
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex items-center mb-6 border-b border-white/10 pb-3 z-10 relative">
        <div className="w-1.5 h-5 bg-yellow-500 rounded-full mr-3 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
        <h3 className="text-lg font-bold text-white">
          Today's Status
        </h3>
      </div>

      <div className="space-y-4 z-10 relative">
        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-900/50 border border-white/5 hover:border-green-500/30 transition-colors">
          <div className="flex items-center">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400 mr-3">
              <FaUserCheck className="text-xl" />
            </div>
            <span className="text-sm font-medium text-gray-300">Approved</span>
          </div>
          <div className="text-xl font-bold text-white">50</div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-900/50 border border-white/5 hover:border-amber-500/30 transition-colors">
          <div className="flex items-center">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 mr-3 animate-pulse">
              <FaHourglassHalf className="text-xl" />
            </div>
            <span className="text-sm font-medium text-gray-300">Pending</span>
          </div>
          <div className="text-xl font-bold text-amber-500">50</div>
        </div>
      </div>
    </div>
  );
}
