import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaHeartbeat,
  FaLock,
  FaPhone,
  FaUser,
  FaEdit,
  FaPhoneAlt,
  FaTint,
  FaSave,
} from "react-icons/fa";
import { useRecoilState } from "recoil";
import patientState from "../../recoil/atoms/patientAtom";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

const PatientForm: React.FC = () => {
  const [patient, setPatient] = useRecoilState<any>(patientState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [aiWaitTime, setAiWaitTime] = useState<number | null>(null);

  // Fetch ML wait time on mount
  React.useEffect(() => {
    const fetchWaitTime = async () => {
      try {
        const payload = {
          "Hospital": "AIIMS Bhubaneswar",
          "Arrival Time": new Date().toTimeString().split(' ')[0],
          "Day of the Week": new Date().toLocaleString('en-us', { weekday: 'long' }),
          "Ward Visited": "General Ward",
          "Number of patients under age 30": 8,
          "Number of patients of age 31-50": 10,
          "Number of patients of age 51 and above": 5
        };

        const ML_API_URL = import.meta.env.VITE_ML_API_URL || 'http://localhost:5000';
        const response = await fetch(`${ML_API_URL}/waiting_time`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (data.waiting_time) {
          setAiWaitTime(data.waiting_time);
        }
      } catch (error) {
        console.error("Failed to fetch ML waiting time", error);
      }
    };
    fetchWaitTime();
  }, []);

  // Function to handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPatient((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !patient.name ||
      !patient.email ||
      !patient.age ||
      !patient.contact ||
      !patient.password
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setPatient({
      ...patient,
      name: patient.name,
      email: patient.email,
      age: patient.age,
      bloodtype: patient.bloodtype,
      contact: patient.contact,
      password: patient.password,
      profilePicture: patient.profilePicture,
    });

    setErrorMessage(null);
    setIsEditing(false); // Stop editing on submit
    console.log("Patient Data Submitted:", patient);
  };

  return (
    <div className="space-y-6 relative h-full w-full max-w-5xl mx-auto pb-10">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full z-0"></div>

      {/* Header */}
      <div className="flex justify-between items-center relative z-10 w-full mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
            <FaUser className="mr-3 text-yellow-500" />
            Patient Profile
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage your health identity and contact details</p>
        </div>
        <button
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${isEditing
            ? "bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 text-white shadow-green-500/20"
            : "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-gray-900 shadow-amber-500/20"
            }`}
          onClick={() => {
            if (isEditing) {
              // Simulate submit
              const fakeEvent = { preventDefault: () => { } } as React.FormEvent;
              handleSubmit(fakeEvent);
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? (
            <>
              <FaSave className="text-lg" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <FaEdit className="text-lg" />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mx-auto relative z-10">

        {/* Left Column: Image Card */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl flex flex-col items-center text-center">
            <div className="relative mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <img
                src={profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                alt="Profile"
                className="rounded-full w-40 h-40 object-cover border-4 border-[#0B0F19] relative z-10"
              />
              {isEditing && (
                <>
                  <label
                    htmlFor="profilePictureUpload"
                    className="absolute bottom-1 right-1 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-full p-2.5 cursor-pointer z-20 shadow-lg transition-transform hover:scale-110"
                  >
                    <FaEdit />
                  </label>
                  <input
                    id="profilePictureUpload"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </>
              )}
            </div>

            {isEditing ? (
              <input
                type="text"
                name="name"
                value={patient.name || ''}
                onChange={handleInputChange}
                className="bg-gray-900/50 border border-white/10 rounded-lg p-3 text-white font-bold text-xl text-center w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all placeholder-gray-500"
                placeholder="John Doe"
              />
            ) : (
              <h2 className="text-2xl font-bold text-white">{patient.name || "N/A"}</h2>
            )}

            <p className="text-amber-500 font-semibold mt-3 px-4 py-1.5 bg-amber-500/10 rounded-full text-sm inline-flex items-center">
              <FaHeartbeat className="mr-2" />
              Patient
            </p>

            {/* Live Queue Tracker (OS SJF Logic) */}
            {!isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 w-full bg-gray-900/80 border border-amber-500/30 rounded-xl p-4 shadow-[0_4px_15px_rgba(245,158,11,0.1)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-[30px] rounded-full pointer-events-none"></div>
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse mr-2"></div>
                  Live Queue Status
                </h3>
                <div className="flex justify-between items-center mt-3 border-b border-amber-500/20 pb-3">
                  <div className="text-left w-1/3">
                    <p className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">Position</p>
                    <p className="text-2xl font-bold text-white">#3</p>
                  </div>
                  <div className="text-center w-1/3 border-x border-amber-500/20">
                    <p className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold text-center">SJF Math Est.</p>
                    <p className="text-2xl font-bold text-white">12<span className="text-sm text-gray-400 font-medium ml-1">min</span></p>
                  </div>
                  <div className="text-right w-1/3">
                    <p className="text-amber-400 text-[10px] uppercase tracking-wider font-semibold flex items-center justify-end gap-1">
                      <FaRobot size={10} /> AI Pattern Est.
                    </p>
                    <p className="text-2xl font-bold text-amber-400">
                      {aiWaitTime !== null ? aiWaitTime : "--"}<span className="text-sm text-amber-600 font-medium ml-1">min</span>
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full mt-4 overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-amber-500 w-[70%]"></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-2 text-center italic">Dual-Engine Triage: OS Scheduling vs Historical AI</p>
              </motion.div>
            )}

          </div>
        </div>

        {/* Right Column: Detailed Info Form/Display */}
        <div className="w-full lg:w-2/3 space-y-6">

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center font-medium">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
              {errorMessage}
            </div>
          )}

          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
              Personal Information
            </h3>

            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Display Mode */}
                <div className="flex items-start">
                  <div className="mt-1 p-3 bg-white/5 rounded-xl mr-4 text-pink-500">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Email Address</h3>
                    <p className="text-gray-200 font-medium">{patient.email || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 p-3 bg-white/5 rounded-xl mr-4 text-green-500">
                    <FaCalendarAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Age</h3>
                    <p className="text-gray-200 font-medium">{patient.age ? `${patient.age} Years` : "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 p-3 bg-white/5 rounded-xl mr-4 text-rose-500">
                    <FaTint className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Blood Type</h3>
                    <p className="text-gray-200 font-medium text-lg">
                      {patient.bloodtype ? (
                        <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">{patient.bloodtype}</span>
                      ) : (
                        "Not specified"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 p-3 bg-white/5 rounded-xl mr-4 text-amber-500">
                    <FaPhoneAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Contact Number</h3>
                    <p className="text-gray-200 font-medium">{patient.contact || "N/A"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form id="patient-profile-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Edit Mode */}
                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block flex items-center">
                      <FaEnvelope className="mr-2 text-pink-500" /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={patient.email || ''}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all placeholder-gray-600"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block flex items-center">
                      <FaCalendarAlt className="mr-2 text-green-500" /> Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={patient.age || ''}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all placeholder-gray-600 text-left"
                      placeholder="Enter your age"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Blood Type */}
                  <div>
                    <label className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block flex items-center">
                      <FaHeartbeat className="mr-2 text-rose-500" /> Blood Type
                    </label>
                    <select
                      name="bloodtype"
                      value={patient.bloodtype || ''}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right .5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                    >
                      <option value="" disabled className="bg-gray-900 text-gray-400">Select blood type</option>
                      <option value="A+" className="bg-gray-900">A+</option>
                      <option value="A-" className="bg-gray-900">A-</option>
                      <option value="B+" className="bg-gray-900">B+</option>
                      <option value="B-" className="bg-gray-900">B-</option>
                      <option value="AB+" className="bg-gray-900">AB+</option>
                      <option value="AB-" className="bg-gray-900">AB-</option>
                      <option value="O+" className="bg-gray-900">O+</option>
                      <option value="O-" className="bg-gray-900">O-</option>
                    </select>
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block flex items-center">
                      <FaPhone className="mr-2 text-amber-500" /> Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      value={patient.contact || ''}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all placeholder-gray-600"
                      placeholder="Enter your contact number"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block flex items-center">
                      <FaLock className="mr-2 text-blue-500" /> Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={patient.password || ''}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all placeholder-gray-600"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
