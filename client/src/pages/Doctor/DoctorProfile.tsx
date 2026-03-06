import React, { useState } from "react";
import { FaUserEdit, FaSave, FaPhoneAlt, FaEnvelope, FaGraduationCap, FaBriefcase, FaStethoscope } from "react-icons/fa";

const DoctorProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "Dr. Emma Carter",
    title: "Senior Consultant Cardiologist, HeartCare Hospital",
    phone: "5551234567",
    email: "emma.carter@heartcare.com",
    experience: "15 years",
    age: "32",
    specialization: "Cardiologist",
    qualifications: [
      "MBBS, Johns Hopkins University",
      "MD in Cardiology, Mayo Clinic",
    ],
    bio: "Dr. Emma Carter has over 15 years of experience in cardiology, specializing in the management and treatment of heart diseases. She has held leadership roles at prestigious institutions and has successfully performed over 500 complex cardiac surgeries.",
    expertise: [
      "Coronary Artery Disease",
      "Heart Failure Management",
      "Hypertension and Arrhythmia Treatment",
    ],
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setDoctorInfo({ ...doctorInfo, [field]: e.target.value });
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const updatedArray = [...(doctorInfo as any)[field]];
    updatedArray[index] = e.target.value;
    setDoctorInfo({ ...doctorInfo, [field]: updatedArray });
  };

  return (
    <div className="space-y-6 relative h-full w-full">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full z-0"></div>

      <div className="flex justify-between items-center relative z-10 w-full mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Doctor Profile</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your identity and professional details</p>
        </div>
        <button
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${isEditing
              ? "bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 text-white shadow-green-500/20"
              : "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-gray-900 shadow-amber-500/20"
            }`}
          onClick={handleEditToggle}
        >
          {isEditing ? (
            <>
              <FaSave className="text-lg" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <FaUserEdit className="text-lg" />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mx-auto relative z-10">

        {/* Left Column: Image & Basic Info */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full blur-md opacity-50"></div>
              <img
                className="rounded-full w-40 h-40 object-cover border-4 border-[#0B0F19] relative z-10"
                src="https://via.placeholder.com/150"
                alt={doctorInfo.name}
              />
            </div>

            {isEditing ? (
              <input
                type="text"
                value={doctorInfo.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="bg-gray-900/50 border border-white/10 rounded-lg p-3 text-white font-bold text-xl text-center w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all"
              />
            ) : (
              <h2 className="text-2xl font-bold text-white">{doctorInfo.name}</h2>
            )}

            {isEditing ? (
              <input
                type="text"
                value={doctorInfo.specialization}
                onChange={(e) => handleInputChange(e, "specialization")}
                className="bg-gray-900/50 border border-white/10 rounded-lg p-2 text-amber-500 font-medium text-center w-full mt-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all"
              />
            ) : (
              <p className="text-amber-500 font-semibold mt-2 px-3 py-1 bg-amber-500/10 rounded-full text-sm inline-block">{doctorInfo.specialization}</p>
            )}
          </div>

          {/* Contact Card */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
              Contact Details
            </h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 p-2 bg-white/5 rounded-lg mr-4">
                  <FaPhoneAlt className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Phone Number</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={doctorInfo.phone}
                      onChange={(e) => handleInputChange(e, "phone")}
                      className="bg-gray-900/50 border border-white/10 rounded-lg p-2 text-white w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all text-sm"
                    />
                  ) : (
                    <p className="text-gray-200 font-medium">{doctorInfo.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 p-2 bg-white/5 rounded-lg mr-4">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Email Address</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={doctorInfo.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      className="bg-gray-900/50 border border-white/10 rounded-lg p-2 text-white w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all text-sm"
                    />
                  ) : (
                    <p className="text-gray-200 font-medium">{doctorInfo.email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="w-full lg:w-2/3 space-y-6">

          {/* Bio & Current Designation */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <div className="w-2 h-6 bg-yellow-500 rounded-full mr-3"></div>
              Professional Overview
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Current Designation</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={doctorInfo.title}
                    onChange={(e) => handleInputChange(e, "title")}
                    className="bg-gray-900/50 border border-white/10 rounded-lg p-3 text-white w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all"
                  />
                ) : (
                  <p className="text-gray-200 text-lg">{doctorInfo.title}</p>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Biography</p>
                {isEditing ? (
                  <textarea
                    value={doctorInfo.bio}
                    onChange={(e) => handleInputChange(e, "bio")}
                    rows={4}
                    className="bg-gray-900/50 border border-white/10 rounded-lg p-3 text-gray-300 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all resize-none leading-relaxed"
                  />
                ) : (
                  <p className="text-gray-300 leading-relaxed text-left">{doctorInfo.bio}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex items-center">
                  <div className="p-3 bg-white/5 rounded-lg mr-4">
                    <FaBriefcase className="text-amber-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Experience</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={doctorInfo.experience}
                        onChange={(e) => handleInputChange(e, "experience")}
                        className="bg-gray-900/50 border border-white/10 rounded-lg p-2 text-white w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all text-sm"
                      />
                    ) : (
                      <p className="text-white font-bold">{doctorInfo.experience}</p>
                    )}
                  </div>
                </div>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex items-center">
                  <div className="p-3 bg-white/5 rounded-lg mr-4">
                    <FaUserEdit className="text-amber-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Age</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={doctorInfo.age}
                        onChange={(e) => handleInputChange(e, "age")}
                        className="bg-gray-900/50 border border-white/10 rounded-lg p-2 text-white w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all text-sm"
                      />
                    ) : (
                      <p className="text-white font-bold">{doctorInfo.age} years</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Qualifications */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <FaGraduationCap className="mr-3 text-yellow-500" />
                Qualifications
              </h3>

              <div className="space-y-3">
                {isEditing ? (
                  doctorInfo.qualifications.map((qualification, index) => (
                    <input
                      key={index}
                      type="text"
                      value={qualification}
                      onChange={(e) => handleArrayChange(e, index, "qualifications")}
                      className="bg-gray-900/50 border border-white/10 rounded-lg p-2.5 text-gray-200 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all text-sm mb-2"
                    />
                  ))
                ) : (
                  doctorInfo.qualifications.map((qualification, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-300 font-medium">{qualification}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Expertise */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <FaStethoscope className="mr-3 text-yellow-500" />
                Areas of Expertise
              </h3>

              <div className="space-y-3">
                {isEditing ? (
                  doctorInfo.expertise.map((expertise, index) => (
                    <input
                      key={index}
                      type="text"
                      value={expertise}
                      onChange={(e) => handleArrayChange(e, index, "expertise")}
                      className="bg-gray-900/50 border border-white/10 rounded-lg p-2.5 text-gray-200 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all text-sm mb-2"
                    />
                  ))
                ) : (
                  doctorInfo.expertise.map((expertise, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-300 font-medium">{expertise}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
