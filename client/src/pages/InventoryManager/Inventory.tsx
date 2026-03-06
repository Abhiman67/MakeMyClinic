import { useState } from "react";
import MedicineDetail from "./MedicineDetail";
import { FaSearch, FaEye, FaFilter, FaTimes } from "react-icons/fa";

const medicines = [
  {
    id: 1,
    name: "Paracetamol",
    price: 40,
    quantity: 45,
    expiry: "12/2025",
    type: "tablets",
  },
  {
    id: 2,
    name: "Ibuprofen",
    price: 50,
    quantity: 30,
    expiry: "10/2024",
    type: "capsules",
  },
  {
    id: 3,
    name: "Amoxicillin",
    price: 60,
    quantity: 20,
    expiry: "08/2024",
    type: "tablets",
  },
  {
    id: 4,
    name: "Cetirizine",
    price: 35,
    quantity: 50,
    expiry: "07/2026",
    type: "tablets",
  },
  {
    id: 5,
    name: "Metformin",
    price: 70,
    quantity: 25,
    expiry: "05/2025",
    type: "tablets",
  },
  {
    id: 6,
    name: "Loratadine",
    price: 55,
    quantity: 40,
    expiry: "06/2025",
    type: "tablets",
  },
  {
    id: 7,
    name: "Omeprazole",
    price: 80,
    quantity: 15,
    expiry: "01/2024",
    type: "capsules",
  },
  {
    id: 8,
    name: "Amlodipine",
    price: 90,
    quantity: 22,
    expiry: "03/2024",
    type: "tablets",
  },
  {
    id: 9,
    name: "Hydrochlorothiazide",
    price: 65,
    quantity: 18,
    expiry: "11/2024",
    type: "tablets",
  },
  {
    id: 10,
    name: "Simvastatin",
    price: 75,
    quantity: 27,
    expiry: "02/2025",
    type: "tablets",
  },
  {
    id: 11,
    name: "Vitamin C Powder",
    price: 25,
    quantity: 100,
    expiry: "09/2025",
    type: "powders",
  },
  {
    id: 12,
    name: "Anti-Itch Cream",
    price: 45,
    quantity: 50,
    expiry: "12/2025",
    type: "creams",
  },
  {
    id: 13,
    name: "Antibiotic Ointment",
    price: 40,
    quantity: 35,
    expiry: "04/2025",
    type: "ointments",
  },
  {
    id: 14,
    name: "Insulin Injection",
    price: 120,
    quantity: 10,
    expiry: "06/2024",
    type: "injectables",
  },
  {
    id: 15,
    name: "Hydrocortisone Gel",
    price: 50,
    quantity: 25,
    expiry: "08/2025",
    type: "gels",
  },
  {
    id: 16,
    name: "Nasal Drops",
    price: 30,
    quantity: 60,
    expiry: "11/2024",
    type: "drops",
  },
  {
    id: 17,
    name: "Antiseptic Gel",
    price: 55,
    quantity: 40,
    expiry: "03/2025",
    type: "gels",
  },
];


const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);

  // Filter medicines based on search term and selected type
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesName = medicine.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "" || medicine.type === selectedType;
    return matchesName && matchesType;
  });

  // Handle opening the modal
  const handleOpenModal = (medicine: any) => {
    setSelectedMedicine(medicine);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedMedicine(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0F19] text-gray-100 p-6 sm:p-10 font-sans overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-full max-w-2xl h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center mb-6">
          <div className="w-1.5 h-8 bg-amber-500 rounded-full mr-3 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
          Master Medicine Inventory
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2 flex items-center">
            <div className="absolute left-4 text-gray-400">
              <FaSearch />
            </div>
            <input
              type="text"
              className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner"
              placeholder="Search by medicine name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter by Type */}
          <div className="relative w-full md:w-1/3 flex items-center group">
            <div className="absolute left-4 text-gray-400 z-10">
              <FaFilter />
            </div>
            <select
              className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white appearance-none focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner cursor-pointer"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="capsules">Capsules</option>
              <option value="tablets">Tablets</option>
              <option value="powders">Powders</option>
              <option value="ointments">Ointments</option>
              <option value="creams">Creams</option>
              <option value="injectables">Injectables</option>
              <option value="gels">Gels</option>
              <option value="drops">Drops</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 group-hover:text-amber-500 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Medicine Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
          {filteredMedicines.length === 0 ? (
            <div className="p-12 text-center text-gray-400 font-medium flex justify-center items-center gap-2">
              <FaSearch className="text-gray-500" /> No medicines matched your search.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs tracking-wider uppercase text-gray-400 bg-gray-900/40">
                    <th className="px-6 py-4 font-semibold">Medicine Name</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Quantity</th>
                    <th className="px-6 py-4 font-semibold">Expiry Date</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredMedicines.map((medicine) => (
                    <tr
                      key={medicine.id}
                      className="hover:bg-white/5 transition-colors duration-200 group relative"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-white group-hover:text-amber-400 transition-colors">
                        {medicine.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300 capitalize">
                          {medicine.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-400">
                        ₹{medicine.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300 font-bold">
                        {medicine.quantity} <span className="font-normal text-xs text-gray-500">units</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded font-medium text-sm">
                          {medicine.expiry}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          className="inline-flex flex-row items-center gap-2 px-4 py-2 bg-amber-600/20 hover:bg-amber-500 text-amber-500 hover:text-gray-900 font-semibold rounded-lg transition-all shadow-[0_0_10px_rgba(245,158,11,0.1)] border border-amber-500/50 hover:shadow-amber-500/50"
                          onClick={() => handleOpenModal(medicine)}
                        >
                          <FaEye /> Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Header Wrap*/}
        {selectedMedicine && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-3xl transform scale-100 transition-transform">
              <button
                className="absolute -top-12 right-0 text-gray-400 hover:text-white bg-white/10 hover:bg-red-500 p-2 rounded-full transition-all duration-300 z-50"
                onClick={handleCloseModal}
              >
                <FaTimes size={20} />
              </button>
              <div className="animate-fade-in-up">
                <MedicineDetail
                  medicineName={selectedMedicine.name}
                  inStock={selectedMedicine.quantity}
                  expDate={selectedMedicine.expiry}
                  mfgDate="N/A"
                  price={selectedMedicine.price}
                  category="General"
                  type={selectedMedicine.type}
                  description="Detailed information about this specific formulation and its primary active components goes here."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
