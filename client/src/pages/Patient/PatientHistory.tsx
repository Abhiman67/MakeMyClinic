import React, { useState } from "react";
import { FaFilePrescription, FaInfoCircle, FaCalendarAlt, FaSearch, FaHistory, FaHospital, FaNotesMedical, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryItem {
  id: string;
  hospital: string;
  doctor: string;
  visitDate: string;
  disease: string;
  status?: string;
}

interface HistoryCardProps {
  item: HistoryItem;
  onPrescriptionClick: () => void;
  onDetailsClick: () => void;
  index: number;
}

interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
  icon?: React.ReactNode;
}

// Sample Data
const historyItems: HistoryItem[] = [
  {
    id: "VIS-2024-001",
    hospital: "Apollo Hospital",
    doctor: "Anna Grace",
    visitDate: "2024-11-20",
    disease: "P.Versicolor",
    status: "Completed",
  },
  {
    id: "VIS-2024-002",
    hospital: "AIIMS",
    doctor: "Sophie Turner",
    visitDate: "2024-09-05",
    disease: "Hypertension",
    status: "Follow-up Required",
  },
  {
    id: "VIS-2024-003",
    hospital: "Max Healthcare",
    doctor: "Robert Brown",
    visitDate: "2024-08-22",
    disease: "Asthma",
    status: "Completed",
  },
  {
    id: "VIS-2024-004",
    hospital: "Manipal Hospital",
    doctor: "Olivia Williams",
    visitDate: "2024-07-10",
    disease: "Migraine",
    status: "Completed",
  },
];

// HistoryCard Component
const HistoryCard: React.FC<HistoryCardProps> = ({
  item,
  onPrescriptionClick,
  onDetailsClick,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:bg-white/10 transition-colors relative overflow-hidden group"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 to-amber-600"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ml-2">

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">{item.id}</span>
            {item.status === 'Follow-up Required' && (
              <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">Action Needed</span>
            )}
          </div>
          <h3 className="font-bold text-white text-lg flex items-center">
            <FaHospital className="text-amber-500 mr-2" />
            {item.hospital}
          </h3>
          <p className="text-sm font-medium text-gray-400 flex items-center mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-2"></div>
            Dr. {item.doctor}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:text-right flex-1">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Date of Visit</p>
            <p className="text-white font-medium flex items-center md:justify-end">
              <FaCalendarAlt className="text-gray-400 mr-2 md:hidden" />
              {new Date(item.visitDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Diagnosis</p>
            <p className="text-white font-medium flex items-center md:justify-end">
              <FaNotesMedical className="text-gray-400 mr-2 md:hidden" />
              {item.disease}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto mt-2 md:mt-0 justify-end">
          <button
            className="flex-1 md:flex-none px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-gray-900 font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 text-sm shadow-[0_0_10px_rgba(245,158,11,0.2)]"
            onClick={onPrescriptionClick}
          >
            <FaFilePrescription /> <span>Rx</span>
          </button>
          <button
            className="flex-1 md:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 font-medium border border-white/10 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm"
            onClick={onDetailsClick}
          >
            <FaInfoCircle className="text-amber-500" /> <span>Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Modal Component
const Modal: React.FC<ModalProps> = ({ title, content, onClose, icon }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#0B0F19] border border-white/10 p-6 rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[40px] pointer-events-none rounded-full z-0"></div>

          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition z-20 focus:outline-none"
            onClick={onClose}
          >
            <FaTimes size={14} />
          </button>

          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
              {icon && <span className="mr-3 text-amber-500">{icon}</span>}
              {title}
            </h3>
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-gray-300 leading-relaxed text-sm">
              {content}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-gray-900 font-semibold rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
                onClick={onClose}
              >
                Acknowledge
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// PatientHistory Component
const PatientHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const filteredItems = historyItems.filter((item) => {
    const matchesSearch =
      item.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.disease.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !selectedDate || item.visitDate === selectedDate;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6 relative h-full w-full max-w-5xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full z-0"></div>

      {/* Header */}
      <div className="relative z-10 mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
          <FaHistory className="mr-3 text-yellow-500" />
          Medical History
        </h1>
        <p className="text-gray-400 text-sm mt-1">Review your past visits, prescriptions, and diagnoses</p>
      </div>

      {/* Search & Filter Section */}
      <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search by hospital, doctor, or condition..."
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder-gray-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-500" />
            </div>
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-gray-300 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>

      {/* History Cards */}
      <div className="space-y-4 relative z-10">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <HistoryCard
              key={item.id}
              index={index}
              item={item}
              onPrescriptionClick={() => setShowPrescriptionModal(true)}
              onDetailsClick={() => setShowDetailsModal(true)}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 border border-white/10 p-10 rounded-2xl text-center backdrop-blur-xl"
          >
            <FaHistory className="mx-auto text-4xl text-gray-600 mb-4" />
            <p className="text-gray-400 font-medium tracking-wide">No medical records found matching your search.</p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedDate(""); }}
              className="mt-4 text-amber-500 hover:text-amber-400 font-medium text-sm transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <Modal
          title="Digital Prescription"
          icon={<FaFilePrescription className="text-2xl" />}
          content="This is a secure digital copy of your prescription. Details include prescribed medication (Amoxicillin 500mg, Paracetamol 650mg), dosage instructions, and doctor's digital signature. Valid until Dec 20, 2024."
          onClose={() => setShowPrescriptionModal(false)}
        />
      )}

      {/* Details Modal */}
      {showDetailsModal && (
        <Modal
          title="Visit Summary"
          icon={<FaNotesMedical className="text-2xl" />}
          content="Patient presented with mild fever and body ache. Prescribed symptomatic treatment and advised 3 days rest. Requested to return for follow-up if symptoms persist beyond 48 hours. Vitals normal at time of discharge."
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default PatientHistory;
