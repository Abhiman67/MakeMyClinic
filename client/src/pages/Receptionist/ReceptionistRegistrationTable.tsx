import { FaEye } from "react-icons/fa";

interface Registration {
  name: string;
  appointmentDate: string;
  gender: string;
  contact: string;
  appointType: string;
}

interface ReceptionistRegistrationTableProps {
  registrations: Registration[];
}

export default function ReceptionistRegistrationTable({
  registrations,
}: ReceptionistRegistrationTableProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] mt-8 overflow-hidden relative">
      {/* Table decorative glow */}
      <div className="absolute top-0 right-1/3 w-64 h-64 bg-yellow-500/5 rounded-full blur-[80px] pointer-events-none z-0"></div>

      <div className="overflow-x-auto relative z-10">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-sm tracking-wider uppercase text-gray-400">
              <th className="px-6 py-4 font-semibold">Patient Name</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Gender</th>
              <th className="px-6 py-4 font-semibold">Contact</th>
              <th className="px-6 py-4 font-semibold">Type</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {registrations.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-white/5 transition-colors duration-200 group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {row.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  <span className="bg-gray-800/50 px-3 py-1 rounded-md border border-white/5 font-medium">{row.appointmentDate}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {row.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {row.contact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500">
                    {row.appointType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-yellow-500 hover:text-yellow-400 transition-colors p-2 hover:bg-yellow-500/10 rounded-lg inline-flex items-center">
                    <FaEye className="mr-2" />
                    Details
                  </button>
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
