import React, { useState } from "react";
import { FaTimes, FaBed, FaUser, FaInfoCircle, FaFileMedical } from "react-icons/fa";
import { Socket } from "socket.io-client";
import axios from "axios";
import { route } from "../../../backendroute";
import PrescriptionModal from "./PrescriptionModal";

interface Patient {
  id: number;
  name: string;
  serial: string;
  gender: string;
  status: string;
}

interface Props {
  patient: Patient;
  closeModal: () => void;
  socket: Socket;
}

const PatientModal: React.FC<Props> = ({ patient, closeModal, socket }) => {
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  const handleAdmit = async () => {
    try {
      const response = await axios.put<{ ticketId: number, name: string }>(route + `/queuing/queues/toipd?ticketId=${patient.id}`)
      socket.emit("bed-request", response.data);
    } catch (error) {
      console.error(error);
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#0B0F19] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 blur-[50px] pointer-events-none rounded-full z-0"></div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition z-20 focus:outline-none"
          onClick={closeModal}
          aria-label="Close Modal"
        >
          <FaTimes size={16} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-4 border-b border-white/10 pb-5 mb-5 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <FaUser className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{patient.name}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-yellow-500 font-bold text-sm">#{patient.serial}</span>
              <span className="text-gray-500 text-xs">•</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${patient.status === 'pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' : 'bg-green-500/20 text-green-400 border border-green-500/20'}`}>
                {patient.status}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="space-y-4 relative z-10 bg-white/5 border border-white/5 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
            <FaInfoCircle className="mr-2" />
            Patient Information
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Gender</p>
              <p className="text-white font-medium capitalize flex items-center">
                <span className={`w-2 h-2 rounded-full ${patient.gender.toLowerCase() === 'male' ? 'bg-blue-400' : 'bg-pink-400'} mr-2`}></span>
                {patient.gender}
              </p>
            </div>
            {/* Add more fields here when available like Age, Blood Type etc. */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Status</p>
              <p className="text-white font-medium capitalize">{patient.status}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3 relative z-10">
          <button
            onClick={() => setShowPrescriptionModal(true)}
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all focus:outline-none"
          >
            <FaFileMedical />
            <span>Prescription</span>
          </button>

          <button
            onClick={handleAdmit}
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-gray-900 font-semibold rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all focus:outline-none"
          >
            <FaBed className="text-gray-900" />
            <span>Admit</span>
          </button>
        </div>
      </div>

      {showPrescriptionModal && (
        <PrescriptionModal patient={patient} closeModal={() => setShowPrescriptionModal(false)} />
      )}
    </div>
  );
};

export default PatientModal;