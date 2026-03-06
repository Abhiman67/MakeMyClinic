import React, { useState } from "react";
import { FaEdit, FaSave, FaBoxOpen } from "react-icons/fa";

interface MedicineDetailProps {
  medicineName: string;
  inStock: number;
  expDate: string;
  mfgDate: string;
  price: number;
  category: string;
  type: string;
  description: string;
}

const MedicineDetail: React.FC<MedicineDetailProps> = ({
  medicineName,
  inStock,
  expDate,
  mfgDate,
  price,
  category,
  type,
  description,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    medicineName,
    inStock,
    expDate,
    mfgDate,
    price,
    category,
    type,
    description,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedDetails({
      ...editedDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-[500px] text-gray-100 font-sans">
      <div className="w-full bg-[#0B0F19]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-2xl p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 relative z-10">
          <h1 className="text-2xl font-extrabold text-white flex items-center tracking-tight">
            <div className="w-1.5 h-6 bg-yellow-500 rounded-full mr-3 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            {isEditing ? "Edit Medicine Details" : "Medicine Details"}
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all font-bold tracking-wide shadow-lg ${isEditing ? "bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-gray-900 border border-green-500/50" : "bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 hover:from-yellow-400 hover:to-amber-500"}`}
          >
            {isEditing ? <><FaSave /> Save Changes</> : <><FaEdit /> Edit Form</>}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          {/* Image and Actions */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6 group">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-2xl blur-xl group-hover:bg-yellow-500/30 transition-colors"></div>
              <img
                className="relative w-full h-full rounded-2xl object-cover border border-white/10 shadow-xl"
                src="https://via.placeholder.com/150/0b0f19/eab308?text=Med"
                alt="Medicine"
              />
            </div>
            <button className="w-full flex justify-center items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/30 py-3 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:bg-red-500 hover:text-white transition-all font-bold">
              <FaBoxOpen /> Order Restock
            </button>
          </div>

          {/* Medicine Details */}
          <div className="w-full md:w-2/3 space-y-5">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">

              {/* Medicine Name */}
              <div className="col-span-2">
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">Medicine Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="medicineName"
                    value={editedDetails.medicineName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all font-medium"
                  />
                ) : (
                  <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3">
                    <p className="font-extrabold text-xl text-white">{medicineName}</p>
                  </div>
                )}
              </div>

              {/* In Stock */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">In Stock</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="inStock"
                    value={editedDetails.inStock}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all font-medium"
                  />
                ) : (
                  <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3">
                    <p className="font-bold text-gray-200">{inStock} <span className="text-gray-500 font-medium text-sm">units</span></p>
                  </div>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">Price (₹)</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="price"
                    value={editedDetails.price}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all font-medium"
                  />
                ) : (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                    <p className="font-bold text-green-400">₹{price}</p>
                  </div>
                )}
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">Expiry Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="expDate"
                    value={editedDetails.expDate}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all font-medium"
                  />
                ) : (
                  <div className="bg-red-500/5 border border-red-500/10 rounded-xl px-4 py-3">
                    <p className="font-bold text-red-400">{expDate}</p>
                  </div>
                )}
              </div>

              {/* Manufacturing Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">
                  Mfg Date
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="mfgDate"
                    value={editedDetails.mfgDate}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all font-medium"
                  />
                ) : (
                  <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3">
                    <p className="font-bold text-gray-200">{mfgDate}</p>
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">Category</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="category"
                    value={editedDetails.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all font-medium"
                  />
                ) : (
                  <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3">
                    <p className="font-bold text-gray-200">{category}</p>
                  </div>
                )}
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">Type</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="type"
                    value={editedDetails.type}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all font-medium"
                  />
                ) : (
                  <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3">
                    <p className="font-bold text-gray-200">{type}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="pt-2">
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">Description</label>
              {isEditing ? (
                <textarea
                  name="description"
                  value={editedDetails.description}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all font-medium h-24 custom-scrollbar"
                />
              ) : (
                <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 min-h-24">
                  <p className="text-gray-300 leading-relaxed text-sm">{description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
