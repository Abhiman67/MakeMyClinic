import axios from "axios";
import React, { useState } from "react";
import { FaTimes, FaCheckCircle, FaTimesCircle, FaRegFileAlt } from "react-icons/fa";
import { route } from "../../../backendroute";
import { socket } from "../../socket";
import { Ticket } from "../../Types";

interface ReceptionistAppointmentApprovalProps {
  setPatientRequests: React.Dispatch<React.SetStateAction<Ticket[]>>;
  handleModal: (isOpen: boolean) => void;
  patientRequests: Ticket[];
  setRegistrations: React.Dispatch<React.SetStateAction<any>>;
}

const ReceptionistAppointmentApproval = ({
  handleModal,
  patientRequests,
  setPatientRequests,
}: ReceptionistAppointmentApprovalProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Ticket | null>(null);

  const handleApprove = async (patient: Ticket) => {
    const patients = patientRequests.filter((p) => p.id === patient.id);

    if (patients.length) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          route + `/beds/receptionist/approve/${patients[0].id}`,
          { hospitalId: patient.hospitalId },
          { headers: { Authorization: "Bearer " + token } }
        );

        setPatientRequests(patientRequests.filter((p) => p.id !== patient.id));
        socket.emit("fetch-ticket-client");
        socket.emit("sendTicketToUser", response.data);
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    }
    handleModal(false);
  };

  const handleReject = (patient: Ticket) => {
    socket.emit("reject-patient-request", patient);
    setPatientRequests(patientRequests.filter((p) => p.id !== patient.id));
    handleModal(false);
  };

  return (
    <div className="fixed inset-0 h-screen w-full bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 overflow-hidden">
      <div className="relative bg-[#0B0F19]/90 border border-white/10 p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] max-w-4xl w-full mx-4 backdrop-blur-xl max-h-[90vh] flex flex-col">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="relative z-10 flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white tracking-wide flex items-center">
            <div className="w-1.5 h-6 bg-red-500 rounded-full mr-3 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            Appointment Approval Requests
          </h2>
          {/* Close Button */}
          <button
            className="text-gray-400 hover:text-red-400 transition bg-white/5 p-2 rounded-lg hover:bg-white/10"
            onClick={() => handleModal(false)}
            aria-label="Close Modal"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Table to display patient requests */}
        <div className="flex-1 overflow-y-auto mb-6 custom-scrollbar bg-white/5 border border-white/10 rounded-xl">
          <table className="min-w-full text-left">
            <thead className="sticky top-0 bg-gray-900/90 backdrop-blur-sm z-20">
              <tr className="text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-white/10">
                <th className="py-4 px-6">Patient Name</th>
                <th className="py-4 px-6">Appointment Type</th>
                <th className="py-4 px-6">Appointment Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {patientRequests.map((patient) => (
                <tr key={patient.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6 font-bold text-white group-hover:text-yellow-400 transition-colors">{patient.name}</td>
                  <td className="py-4 px-6 text-gray-300">
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold border border-amber-500/20">{patient.appointType}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{patient.appointmentDate}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="bg-yellow-600/20 hover:bg-yellow-500 text-yellow-500 hover:text-gray-900 px-4 py-2 rounded-md transition font-semibold text-sm shadow-[0_0_10px_rgba(234,179,8,0.1)] border border-yellow-500/50 flex items-center ml-auto"
                    >
                      <FaRegFileAlt className="mr-2" /> Details
                    </button>
                  </td>
                </tr>
              ))}
              {patientRequests.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500 font-medium">
                    No pending requests at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* If a patient is selected, show their details */}
        {selectedPatient && (
          <div className="relative z-10 p-6 bg-white/5 rounded-xl border border-white/10 animate-fade-in shadow-inner">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-3 flex items-center">
              <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
              Reviewing: {selectedPatient.name}
            </h3>

            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mb-6">
              <div className="bg-gray-900/50 p-3 rounded-lg border border-white/5">
                <span className="block font-medium text-gray-500 mb-1 uppercase text-xs tracking-wider">Patient Name</span>
                <span className="text-white font-semibold">{selectedPatient.name}</span>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg border border-white/5">
                <span className="block font-medium text-gray-500 mb-1 uppercase text-xs tracking-wider">Age</span>
                <span className="text-white font-semibold">{selectedPatient.age}</span>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg border border-white/5">
                <span className="block font-medium text-gray-500 mb-1 uppercase text-xs tracking-wider">Gender</span>
                <span className="text-white font-semibold">{selectedPatient.gender}</span>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg border border-white/5">
                <span className="block font-medium text-gray-500 mb-1 uppercase text-xs tracking-wider">Appointment Type</span>
                <span className="text-amber-400 font-bold">{selectedPatient.appointType}</span>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg border border-white/5 col-span-2">
                <span className="block font-medium text-gray-500 mb-1 uppercase text-xs tracking-wider">Appointment Date</span>
                <span className="text-white font-semibold">{selectedPatient.appointmentDate}</span>
              </div>
            </div>

            {/* Approve and Reject buttons */}
            <div className="flex justify-end space-x-4 border-t border-white/10 pt-4">
              <button
                onClick={() => handleReject(selectedPatient)}
                className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 px-6 py-2.5 rounded-lg flex items-center space-x-2 transition-all font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]"
              >
                <FaTimesCircle />
                <span>Reject</span>
              </button>
              <button
                onClick={() => handleApprove(selectedPatient)}
                className="bg-green-500 hover:bg-green-400 text-gray-900 px-6 py-2.5 rounded-lg flex items-center space-x-2 transition-all font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)] border border-green-400"
              >
                <FaCheckCircle />
                <span>Approve Request</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceptionistAppointmentApproval;
