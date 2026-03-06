import React from "react";
import { FaInfoCircle } from "react-icons/fa";

export interface Patient {
  id: number;
  name: string;
  serial: string;
  gender: string;
  status: "pending" | "checked";
  priority?: number; // 1: Emergency, 2: High, 3: Normal
  estimatedTime?: number; // Minutes
}

interface ActionButton {
  action: string;
  color: string;
  icon: JSX.Element;
  label?: string;
}

interface PatientTableProps {
  title: string;
  headerColor: string;
  patients: Patient[];
  onDelete: (id: number) => void;
  onDone?: (id: number) => void;
  onPending?: (id: number) => void;
  onDetails: (patient: Patient) => void;
  actionButtons: ActionButton[];
}

const PatientTable: React.FC<PatientTableProps> = ({
  title,
  headerColor,
  patients,
  onDelete,
  onDone,
  onPending,
  onDetails,
  actionButtons,
}: PatientTableProps) => {
  const getHeaderBg = (color: string) => {
    switch (color) {
      case "amber":
        return "bg-amber-500/20 text-amber-500 border-b border-amber-500/30";
      case "red":
        return "bg-red-500/20 text-red-400 border-b border-red-500/30";
      case "green":
        return "bg-green-500/20 text-green-400 border-b border-green-500/30";
      default:
        return "bg-white/10 text-white border-b border-white/20";
    }
  };

  const getButtonClass = (color: string) => {
    switch (color) {
      case 'green': return "text-green-400 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20";
      case 'red': return "text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20";
      case 'amber': return "text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20";
      case 'yellow': return "text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20";
      default: return "text-gray-400 bg-white/5 hover:bg-white/10 border border-white/10";
    }
  }

  return (
    <div className="mb-8 w-full">
      <h2 className="text-xl font-bold mb-4 text-white flex items-center">
        <div className={`w-2 h-5 rounded-full mr-3 ${headerColor === 'amber' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : headerColor === 'red' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`}></div>
        {title}
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/10 shadow-xl bg-[#0B0F19]">
        <table className="w-full border-collapse">
          <thead>
            <tr className={getHeaderBg(headerColor)}>
              <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Patient Name</th>
              <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider hidden sm:table-cell">Queue No.</th>
              <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Triage Priority</th>
              <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider hidden lg:table-cell">Est. Time (SJF)</th>
              <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {patients.length === 0 ? (
              <tr className="bg-white/5 hover:bg-white/10 transition-colors">
                <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                  No patients found in this queue.
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id} className="bg-transparent hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-left font-medium text-gray-200 group-hover:text-white transition-colors">{patient.name}</td>
                  <td className="p-4 text-left font-bold text-yellow-500 hidden sm:table-cell">#{patient.serial}</td>
                  <td className="p-4 text-left">
                    {patient.priority === 1 ? (
                      <span className="bg-red-500/20 text-red-500 border border-red-500/30 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest flex items-center w-max shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                        Emergency
                      </span>
                    ) : patient.priority === 2 ? (
                      <span className="bg-amber-500/20 text-amber-500 border border-amber-500/30 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest flex items-center w-max">
                        High
                      </span>
                    ) : (
                      <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded text-xs font-medium uppercase tracking-widest flex items-center w-max">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-left hidden lg:table-cell">
                    <span className={`font-mono text-sm ${patient.estimatedTime && patient.estimatedTime <= 10 ? 'text-green-400 font-bold' : 'text-gray-400'}`}>
                      {patient.estimatedTime ? `${patient.estimatedTime} min` : '--'}
                    </span>
                  </td>
                  <td className="p-4 flex space-x-2 items-center">
                    {actionButtons.map((btn, index) => {
                      if (btn.action === "done" && onDone) {
                        return (
                          <button
                            key={index}
                            onClick={() => onDone(patient.id)}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${getButtonClass(btn.color)}`}
                            title={btn.label || "Complete"}
                          >
                            {btn.icon}
                            {btn.label && <span className="hidden lg:inline">{btn.label}</span>}
                          </button>
                        );
                      }
                      if (btn.action === "pending" && onPending) {
                        return (
                          <button
                            key={index}
                            onClick={() => onPending(patient.id)}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${getButtonClass(btn.color)}`}
                            title={btn.label || "Mark as Pending"}
                          >
                            {btn.icon}
                            {btn.label && <span className="hidden lg:inline">{btn.label}</span>}
                          </button>
                        );
                      }
                      if (btn.action === "delete") {
                        return (
                          <button
                            key={index}
                            onClick={() => onDelete(patient.id)}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${getButtonClass(btn.color)}`}
                            title={btn.label || "Delete"}
                          >
                            {btn.icon}
                            {btn.label && <span className="hidden lg:inline">{btn.label}</span>}
                          </button>
                        );
                      }
                      return null;
                    })}
                    <button
                      onClick={() => onDetails(patient)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all text-sm font-medium text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20"
                      title="View Details"
                    >
                      <FaInfoCircle />
                      <span className="hidden lg:inline">Details</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientTable;