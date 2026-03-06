import React, { useEffect, useState } from "react";
import { FaUser, FaVenusMars, FaBed, FaTimes, FaUserPlus, FaClipboardList, FaCalendarAlt, FaTint, FaPhoneAlt } from "react-icons/fa";

import { dummyPatients } from "../../DB/Patient";
import { socket } from "../../socket";
import AdmitModal from "./AdmitModal";
import RequestModal from "./RequestModal";

import { Patient as BasePatient } from "../../Types";

// Extend base types to match the mock data structure used here
export interface Patient extends BasePatient {
  bed?: number;
  bloodtype?: string;
  contact: string;
  appointType: string;
}

export interface Ward {
  id: number;
  name: string;
  patients: Patient[];
}

// Sample wards data
// Patient Details Info Component (moved from inline)
const PatientInfoDisplay: React.FC<{ patient: Patient }> = ({ patient }) => (
  <div className="text-left space-y-1">
    <p className="font-bold text-white text-lg border-b border-white/10 pb-1 mb-2">{patient.name}</p>
    <p className="text-gray-300 flex items-center text-xs"><FaVenusMars className="mr-1.5 text-blue-400" /> Gender: {patient.gender}</p>
    <p className="text-gray-300 flex items-center text-xs"><FaBed className="mr-1.5 text-amber-500" /> Status: <span className="text-red-400 ml-1 font-semibold">{patient.status}</span></p>
  </div>
);

// Sample wards data
const initialWards: Ward[] = dummyPatients;


// Removed PatientRow as we are using a Grid now
// Main AdministratorWard Component
const AdministratorWard: React.FC = () => {
  const [wards, setWards] = useState<Ward[]>(initialWards);
  const [selectedWard, setSelectedWard] = useState<number>(1);
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);

  const [socketPatient, setSocketPatient] = useState<Patient | null>(null);

  useEffect(() => {
    socket.on('admit-request-response', (data: Patient) => {
      console.log("admin admit patient modal", data);
      setSocketPatient(data);
    });

    return () => {
      socket.off('admit-patient-response');
    };
  }, []);

  const handleAdmitPatient = (newPatient: Patient) => {
    setWards((prevWards) =>
      prevWards.map((ward) =>
        ward.id === selectedWard ? { ...ward, patients: [...ward.patients, newPatient] } : ward
      )
    );
  };

  // Removed handleDischargePatient as it's no longer used in the Grid

  const handleShowDetails = (patient: Patient) => {
    setCurrentPatient(patient);
  };

  return (
    <div className="space-y-6 relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Ward Management</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time bed tracking & admissions</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-1 backdrop-blur-md">
            <div className="px-3 py-1.5 text-gray-400 text-sm font-medium border-r border-white/10">Filter By Ward</div>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(Number(e.target.value))}
              className="bg-transparent border-none text-white focus:ring-0 text-sm font-semibold pl-3 pr-8 py-1.5 cursor-pointer outline-none appearance-none"
            >
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id} className="bg-gray-800">
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowAdmitModal(true)}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-gray-900 font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-yellow-500/20 transition-all font-poppins"
          >
            <FaUserPlus />
            <span className="hidden sm:inline">Admit Patient</span>
          </button>
          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all backdrop-blur-md font-poppins"
          >
            <FaClipboardList className="text-yellow-400" />
            <span className="hidden sm:inline">Pending Requests</span>
          </button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-8 relative z-10 shadow-2xl">
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
            Live Bed Map
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-gray-400"><span className="w-3 h-3 rounded-full bg-green-500/50 border border-green-400 mr-2"></span> Available</div>
            <div className="flex items-center text-gray-400"><span className="w-3 h-3 rounded-full bg-red-500/50 border border-red-400 mr-2"></span> Occupied</div>
            <div className="flex items-center text-gray-400"><span className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-400 mr-2"></span> Under Cleaning</div>
          </div>
        </div>

        {/* Smart Bed Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {(() => {
            const currentWard = wards.find(w => w.id === selectedWard);
            const totalBedsNum = 10; // Presuming 10 beds per ward from Modal logic
            const beds = [];

            for (let i = 1; i <= totalBedsNum; i++) {
              const occupant = currentWard?.patients.find((p: Patient) => p.bed === i);
              const isOccupied = !!occupant;

              beds.push(
                <div
                  key={i}
                  onClick={() => occupant ? handleShowDetails(occupant) : undefined}
                  className={`relative group cursor-pointer h-32 rounded-2xl flex flex-col items-center justify-center transition-all ${isOccupied
                    ? 'bg-red-500/10 border border-red-500/30 hover:border-red-400 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    : 'bg-green-500/5 border border-green-500/20 hover:border-green-400 hover:bg-green-500/10'
                    }`}
                >
                  <div className="absolute top-2 left-2 text-xs font-bold text-gray-500 group-hover:text-gray-300 transition-colors">#{i}</div>

                  <FaBed className={`text-4xl mb-2 transition-transform group-hover:scale-110 ${isOccupied ? 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-green-500/50'}`} />

                  <span className={`text-xs font-semibold uppercase tracking-widest ${isOccupied ? 'text-red-400' : 'text-green-500'}`}>
                    {isOccupied ? 'Occupied' : 'Available'}
                  </span>

                  {/* Hover Tooltip for Occupied Beds */}
                  {isOccupied && occupant && (
                    <div className="absolute bottom-full mb-2 bg-gray-900 border border-white/20 p-4 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 min-w-[200px]">
                      <PatientInfoDisplay patient={occupant} />
                      <div className="absolute top-full left-1/2 -ml-2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              );
            }
            return beds;
          })()}
        </div>
      </div>

      {/* Admit Modal */}
      {showAdmitModal && <AdmitModal onClose={() => setShowAdmitModal(false)} onSave={handleAdmitPatient as any} selectedWardId={selectedWard} wards={wards as any} />}
      {/* Request Modal */}
      {showRequestModal && <RequestModal onClose={() => setShowRequestModal(false)} patient={socketPatient} onSave={handleAdmitPatient as any} selectedWardId={selectedWard} wards={wards as any} />}

      {/* Patient Details Modal */}
      {currentPatient && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-[#0B0F19] border border-white/10 text-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative">
            <button onClick={() => setCurrentPatient(null)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition"><FaTimes /></button>

            {/* Modal Header */}
            <div className="flex items-center space-x-4 border-b border-white/10 pb-6 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <FaUser className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentPatient.name}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <FaBed className="text-gray-400" />
                  <span className="text-gray-300 text-sm">Bed {currentPatient.bed} • {currentPatient.status}</span>
                </div>
              </div>
            </div>

            {/* Patient Info Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider font-semibold block mb-1">Gender</label>
                <div className="flex items-center space-x-2 text-white">
                  <FaVenusMars className="text-amber-500" />
                  <span className="font-medium">{currentPatient.gender}</span>
                </div>
              </div>

              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider font-semibold block mb-1">Age</label>
                <div className="flex items-center space-x-2 text-white">
                  <FaCalendarAlt className="text-yellow-500" />
                  <span className="font-medium">{currentPatient.age} Yrs</span>
                </div>
              </div>

              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider font-semibold block mb-1">Blood Type</label>
                <div className="flex items-center space-x-2 text-white">
                  <FaTint className="text-red-500" />
                  <span className="font-medium">{currentPatient.bloodtype}</span>
                </div>
              </div>

              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider font-semibold block mb-1">Contact</label>
                <div className="flex items-center space-x-2 text-white">
                  <FaPhoneAlt className="text-green-500" />
                  <span className="font-medium">{currentPatient.contact}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministratorWard;
