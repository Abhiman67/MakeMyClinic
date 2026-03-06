import React, { useState, useEffect } from "react";
import {
  FaCheck,
  FaTrash,
  FaSyncAlt,
} from "react-icons/fa";
import { FiClock, FiActivity, FiUserPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import PatientModal from "./PatientModal";
import PatientTable, { Patient } from "./PatientTable";
import { socket } from "../../socket";
import axios from "axios";
import { route } from "../../../backendroute";

// Interface for Patient data

const DoctorsAppointment: React.FC = () => {
  const [patientQueue, setpatientQueue] = useState<Patient[]>([]);
  const [pendingPatient, setPendingPatient] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("2024-09-20");

  // Initial fetch of queue
  useEffect(() => {
    fetchQueue();
  }, []);

  useEffect(() => {
    socket.on("doctorFetchQueue", (data: string) => {
      // Fetch data from queue table
      setDate(data);
      console.log("date : ", data);
      fetchQueue();
    });
    return () => {
      socket.off("doctorFetchQueue");
    }
  });

  async function fetchQueue() {
    try {
      const response = await axios.get(
        route + `/queuing/queues/doctor/1?hospitalId=1&appointmentDate=${date}`
      );

      // Map basic data
      const mappedQueue = response.data.map((queue: any) => {
        // Mock data for OS Scheduling Algorithms (Priority & SJF)
        // In a real scenario, this would come from the backend Triage ML model or Receptionist input

        // Randomize priority: 1 = Emergency, 2 = High, 3 = Normal
        const mockPriority = Math.floor(Math.random() * 3) + 1;

        // Randomize estimated consultation time (SJF): 5 to 30 minutes
        const mockEstimatedTime = Math.floor(Math.random() * 26) + 5;

        // Emergency always gets 15 mins max to ensure they process fast
        const finalTime = mockPriority === 1 ? Math.min(mockEstimatedTime, 15) : mockEstimatedTime;

        return {
          id: queue.ticket.id,
          name: queue.ticket.name,
          serial: queue.position,
          gender: queue.ticket.gender,
          status: queue.ticket.approved,
          priority: mockPriority,
          estimatedTime: finalTime,
        };
      });

      // Apply OS-Style Scheduling Algorithm:
      // Primary: Priority Scheduling (1 preempts 2 preempts 3)
      // Secondary: Shortest Job First (SJF) for tie-breaking within the same priority level
      const scheduledQueue = mappedQueue.sort((a: Patient, b: Patient) => {
        const priorityA = a.priority ?? 3;
        const priorityB = b.priority ?? 3;
        const timeA = a.estimatedTime ?? 15;
        const timeB = b.estimatedTime ?? 15;

        if (priorityA !== priorityB) {
          return priorityA - priorityB; // Ascending priority (1 is highest)
        }
        return timeA - timeB; // SJF: Lowest time first
      });

      setpatientQueue(scheduledQueue);
    } catch (error) {
      console.error(error);
    }
  }

  // Handle marking patient as done
  const handleDone = (id: number) => {
    const patient = patientQueue.find((p) => p.id === id);
    if (patient) {
      setPendingPatient([...pendingPatient, patient]);
      setpatientQueue(patientQueue.filter((p) => p.id !== id));
    }
  };

  // Handle marking patient as pending (move to pending list)
  const handlePending = (id: number) => {
    const patient = pendingPatient.find((p) => p.id === id);
    if (patient) {
      setpatientQueue([...patientQueue, { ...patient, status: "pending" }]);
      setPendingPatient(pendingPatient.filter((p) => p.id !== id));
    }
  };

  // Handle deleting patient
  const handleDelete = (id: number) => {
    setpatientQueue(patientQueue.filter((p) => p.id !== id));
    setPendingPatient(pendingPatient.filter((p) => p.id !== id));
  };

  // Handle opening modal
  const openModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  // Listen for socket events
  useEffect(() => {
    socket.on("bed-request-response", (data: any) => {
      console.log("Bed Request Response:", data);
    });

    return () => {
      socket.off("bed-request-response");
    };
  }, []);

  const handleButtonClick = () => {
    const dummyPatient: Patient = {
      id: 1,
      name: "John Doe",
      serial: "123",
      gender: "Male",
      status: "pending",
      priority: 1,
      estimatedTime: 10,
    };

    socket.emit('admit-request', dummyPatient);
    console.log("Dummy Patient Detail:", dummyPatient);
    // You can also emit this data to other parts of your application or backend
  };

  return (
    <div className="space-y-6 relative h-full w-full">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/10 blur-[100px] pointer-events-none rounded-full z-0"></div>

      <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            Consultation Queue
            <span className="text-xs font-bold uppercase tracking-widest bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              OS Scheduling Active (Priority + SJF)
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Automatically sorted by Emergency Priority & Shortest Job First</p>
        </div>
        <button
          onClick={handleButtonClick}
          className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-gray-900 font-semibold px-4 py-2.5 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all"
        >
          <FiUserPlus />
          <span>Admit dummy patient</span>
        </button>
      </div>

      {/* Top Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {[
          { title: "Waiting Queue", value: patientQueue.length.toString(), icon: <FiClock />, color: "text-amber-500", bg: "bg-amber-500/10" },
          { title: "Completed Today", value: pendingPatient.length.toString(), icon: <FaCheck />, color: "text-green-400", bg: "bg-green-400/10" },
          { title: "Urgent/Rescheduled", value: "2", icon: <FiActivity />, color: "text-red-400", bg: "bg-red-400/10" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl relative overflow-hidden group hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-2 relative z-10">
              <h3 className="text-gray-400 font-medium text-sm leading-tight max-w-[70%]">{stat.title}</h3>
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
            </div>
            <div className={`absolute -bottom-4 -right-2 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
              {React.cloneElement(stat.icon as React.ReactElement, { size: 70 })}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative z-10">
        {/* Pending Patients Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          <PatientTable
            title="Patients in Queue"
            headerColor="amber"
            patients={patientQueue}
            onDelete={handleDelete}
            onDone={handleDone}
            onDetails={openModal}
            actionButtons={[
              { icon: <FaCheck />, action: "done", color: "green", label: "Complete" },
              { icon: <FaTrash />, action: "delete", color: "red", label: "Remove" },
            ]}
          />
        </motion.div>

        {/* Checked Patients Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          <PatientTable
            title="Completed Consultations"
            headerColor="green"
            patients={pendingPatient}
            onDelete={handleDelete}
            onPending={handlePending}
            onDetails={openModal}
            actionButtons={[
              { icon: <FaSyncAlt />, action: "pending", color: "amber", label: "Revert" },
              { icon: <FaTrash />, action: "delete", color: "red", label: "Remove" },
            ]}
          />
        </motion.div>
      </div>

      {/* Patient Details Modal */}
      {isModalOpen && selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          closeModal={closeModal}
          socket={socket}
        />
      )}
    </div>
  );
};

export default DoctorsAppointment;
