import React, { useEffect, useState } from "react";
import NewRegistration from "../../components/Receptionist/NewRegistration";
import ReceptionistRegistrationTable from "./ReceptionistRegistrationTable";
import ReceptionistRegistrationStatus from "./Status";
import ReceptionistGenderAgeDistribution from "./Distribution";
import ReceptionistTotalRegistration from "./TotalRegistration";
import ReceptionistAppointmentApproval from "./AppointmentApproval";
import { socket } from "../../socket";
import axios from "axios";
import { route } from "../../../backendroute";
import { Ticket } from "../../Types";
import { FaPlus, FaCheckDouble } from "react-icons/fa";

interface RegistrationProps {
  name: string;
  age: string;
  gender: string;
  department: string;
  visitDate: string;
  appointType: string;
  contact: string;
  visit: string;
}
[];

const dummyTickets: any = [
  {
    name: "John Doe",
    age: "32",
    gender: "Male",
    department: "Cardiology",
    visitDate: "2024-09-15",
    appointType: "OPD",
    contact: "123-456-7890",
    visit: "Scheduled",
  },
  {
    name: "Alice Johnson",
    age: "28",
    gender: "Female",
    department: "Neurology",
    visitDate: "2024-09-18",
    appointType: "OPD",
    contact: "987-654-3210",
    visit: "Scheduled",
  },
  {
    name: "Michael Smith",
    age: "45",
    gender: "Male",
    department: "Orthopedics",
    visitDate: "2024-09-12",
    appointType: "OPD",
    contact: "654-321-0987",
    visit: "Completed",
  },
];

const ReceptionistRegistration: React.FC<{
  registrations?: RegistrationProps;
}> = () => {
  const [registrations, setRegistrations] = useState(dummyTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [patientRequests, setPatientRequests] = useState<Ticket[]>([
    {
      id: 1,
      name: "John Doe",
      age: 30,
      gender: "Male",
      appointType: "OPD",
      doctorId: 1,
      appointmentDate: "2024-09-10",
      hospitalId: 456,
      approved: false,
    },
  ]);

  const handleNewRegistrationClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  async function fetchTickets() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<Ticket[]>(
        route + `/booking/getappoints/1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 500 || !response) {
        console.error("Failed to fetch hospitals");
        return;
      }

      setPatientRequests(response.data.filter((p) => !p.approved));
      setRegistrations(response.data.filter((p) => p.approved));
    } catch (e) {
      console.error(e)
    }
  }

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets();
  }, []);

  // Listen for socket events to update patient requests
  useEffect(() => {
    socket.on("patient-request", (data: any) => {
      setPatientRequests((prevRequests) => [...prevRequests, data]);
    });

    socket.on("fetch-ticket", () => {
      fetchTickets();
    });

    return () => {
      socket.off("patient-request");
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0B0F19] text-gray-100 p-6 sm:p-10 font-sans overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/4 w-full max-w-2xl h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {approveModalOpen && (
        <ReceptionistAppointmentApproval
          patientRequests={patientRequests}
          setPatientRequests={setPatientRequests}
          handleModal={setApproveModalOpen}
          setRegistrations={setRegistrations}
        />
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
              Receptionist Dashboard
            </h2>
            <p className="text-gray-400 text-sm mt-1">Manage hospital registrations and appointments seamlessly</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setApproveModalOpen(true)}
              className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition-all bg-red-600 rounded-xl hover:bg-red-700 group shadow-[0_0_15px_rgba(220,38,38,0.3)] ring-1 ring-red-500/50"
            >
              <span className="relative flex items-center gap-2 font-bold tracking-wide">
                <FaCheckDouble /> Approval Requests
                {patientRequests.length > 0 && (
                  <span className="bg-white text-red-600 text-xs font-bold px-2 py-0.5 rounded-full ml-1 animate-pulse">
                    {patientRequests.length}
                  </span>
                )}
              </span>
            </button>

            <button
              className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-gray-900 transition-all bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl hover:from-yellow-400 hover:to-amber-500 group shadow-[0_0_20px_rgba(234,179,8,0.4)]"
              onClick={handleNewRegistrationClick}
            >
              <span className="relative flex items-center gap-2 font-bold tracking-wide">
                <FaPlus /> New Registration
              </span>
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Registrations Card */}
          <ReceptionistTotalRegistration />

          {/* Gender and Age Distribution */}
          <ReceptionistGenderAgeDistribution />

          {/* Status Summary */}
          <ReceptionistRegistrationStatus />
        </div>

        {/* Registrations Table */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center">
            <div className="w-1.5 h-6 bg-yellow-500 rounded-full mr-3"></div>
            Recent Registrations
          </h3>
          <ReceptionistRegistrationTable registrations={registrations} />
        </div>

        {/* Modal for New Registration */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <NewRegistration closeModal={setIsModalOpen} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceptionistRegistration;
