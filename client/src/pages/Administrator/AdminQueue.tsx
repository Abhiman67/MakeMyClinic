import { FaUserMd, FaClock, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

// Sample data for departments and doctors
const departments = [
  {
    id: 1,
    name: "Cardiology",
    doctors: [
      { id: 1, name: "Dr. Arvind Kumar", queue: 5, avgTime: 10 },
      { id: 2, name: "Dr. Meera Singh", queue: 3, avgTime: 8 },
    ],
  },
  {
    id: 2,
    name: "Orthopedics",
    doctors: [
      { id: 3, name: "Dr. Ravi Gupta", queue: 7, avgTime: 15 },
      { id: 4, name: "Dr. Sunita Patil", queue: 4, avgTime: 12 },
    ],
  },
  {
    id: 3,
    name: "Pediatrics",
    doctors: [
      { id: 5, name: "Dr. Amit Joshi", queue: 6, avgTime: 11 },
      { id: 6, name: "Dr. Pooja Rao", queue: 2, avgTime: 7 },
    ],
  },
];

const AdminQueue = () => {
  return (
    <div className="space-y-6 relative h-full w-full">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full z-0"></div>

      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          Live Department OS Queues
          <span className="text-xs font-bold uppercase tracking-widest bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            Priority & SJF Active
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Real-time view of algorithmically optimized OPD congestion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mt-6">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <FaUserMd size={80} className="text-yellow-500" />
            </div>

            <h2 className="text-xl font-bold mb-6 flex items-center text-white relative z-10">
              <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
              {dept.name}
            </h2>

            <div className="space-y-4 relative z-10">
              {dept.doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-gray-900/50 border border-white/5 p-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-3 text-white">
                    {doctor.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-300">
                      <FaUsers className="mr-2 text-amber-500" />
                      <span className="font-medium text-white mr-1">{doctor.queue}</span> Patients
                    </div>
                    <div className="flex items-center text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5" title="Shortest Job First Average">
                      <FaClock className="mr-2 text-amber-500" />
                      <span>{doctor.avgTime}m <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">SJF Avg</span></span>
                    </div>
                  </div>
                  {/* Visual Queue Indicator */}
                  <div className="mt-4 bg-gray-800 h-1.5 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full ${doctor.queue > 5 ? 'bg-red-500' : doctor.queue > 3 ? 'bg-amber-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min((doctor.queue / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminQueue;
