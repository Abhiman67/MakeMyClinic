import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BrainCircuit, Menu, X } from "lucide-react";

interface SidebarProps {
  links: { name: string; path: string; icon?: React.ReactNode }[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button - Fixed to Top Left */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#0B0F19] border-r border-white/10 flex flex-col transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        {/* Abstract Background Effect */}
        <div className="absolute top-0 left-0 w-full h-48 bg-yellow-500/10 blur-[50px] pointer-events-none rounded-full"></div>

        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 py-8 relative z-10">
          <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg shadow-lg shadow-yellow-500/30">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Make My Clinic</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto relative z-10">
          {links.map((link) => (
            <NavLink
              to={link.path}
              key={link.name}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  )}

                  {link.icon && (
                    <div className={`${isActive ? "text-yellow-400" : "text-gray-500 group-hover:text-gray-300"}`}>
                      {link.icon}
                    </div>
                  )}
                  <span className="font-medium text-sm">{link.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer info inside sidebar */}
        <div className="p-4 border-t border-white/10 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs text-gray-500 font-medium mb-1">SYSTEM STATUS</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-gray-300">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-sm z-30 md:hidden transition-opacity"
        />
      )}
    </>
  );
};

export default Sidebar;
