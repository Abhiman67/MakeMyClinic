import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, LogOut, ChevronDown, Bell } from 'lucide-react';
import LogoutButton from './LogoutButton';

interface DashboardHeaderProps {
  title: string;
  role: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, role }) => {
  const [userName, setUserName] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    // Get user info from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        setUserName(userData.name || 'User');
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUserName('User');
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/10 w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center ml-12 md:ml-0">
          {/* Left side: Title and Role badge */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
            <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold tracking-wider uppercase">
              {role}
            </div>
          </div>

          {/* Right side: Actions & Profile */}
          <div className="flex items-center gap-4">
            {/* Notification Bell (Visual Only) */}
            <button className="hidden sm:flex p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B0F19]"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pl-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-medium text-white leading-tight">{userName}</span>
                  <span className="text-xs text-gray-400 leading-tight">{role}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg">
                  <UserCircle className="w-5 h-5 text-white" />
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''} hidden sm:block`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5 sm:hidden">
                      <p className="text-sm font-medium text-white">{userName}</p>
                      <p className="text-xs text-yellow-400 mt-1">{role}</p>
                    </div>

                    <div className="p-2">
                      <div className="w-full">
                        <LogoutButton variant="text" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;