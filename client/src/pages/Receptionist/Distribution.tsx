import { FaFemale, FaMale, FaUsers } from "react-icons/fa";

export default function ReceptionistGenderAgeDistribution() {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden group hover:bg-white/10 transition-colors duration-300">
      {/* Decorative gradient blob */}
      <div className="absolute -left-6 -top-6 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex items-center mb-6 border-b border-white/10 pb-3 z-10 relative">
        <div className="w-1.5 h-5 bg-yellow-500 rounded-full mr-3 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
        <h3 className="text-lg font-bold text-white">
          Demographics
        </h3>
      </div>

      <div className="space-y-4 z-10 relative">
        {/* Male Distribution */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-white/5 hover:border-yellow-500/30 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <FaMale className="text-xl" />
            </div>
            <span className="text-sm font-medium text-gray-300">Male Patients</span>
          </div>
          <div className="text-lg font-bold text-white">50</div>
        </div>

        {/* Female Distribution */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-white/5 hover:border-yellow-500/30 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
              <FaFemale className="text-xl" />
            </div>
            <span className="text-sm font-medium text-gray-300">Female Patients</span>
          </div>
          <div className="text-lg font-bold text-white">5</div>
        </div>

        {/* Elderly Distribution */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-white/5 hover:border-yellow-500/30 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
              <FaUsers className="text-xl" />
            </div>
            <span className="text-sm font-medium text-gray-300">Elderly (65+)</span>
          </div>
          <div className="text-lg font-bold text-white">45</div>
        </div>
      </div>
    </div>
  );
}
