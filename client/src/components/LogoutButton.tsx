import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'text';
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  className = '',
  variant = 'primary'
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      // Clear all authentication data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');

      // Redirect to login page
      navigate('/login');
    }, 500);
  };

  if (variant === 'text') {
    return (
      <div className="w-full">
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors ${className}`}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        ) : (
          <div className="flex flex-col gap-2 px-2 py-2">
            <span className="text-xs text-gray-400 px-1">Are you sure?</span>
            <div className="flex gap-2 w-full">
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs py-2 rounded-lg transition-colors flex justify-center items-center"
              >
                {isLoading ? (
                  <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Yes, Sign Out'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-xs py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default Primary Variant
  return (
    <motion.button
      className={`flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl transition-colors duration-200 ${className}`}
      onClick={() => setShowConfirm(true)}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      <span className="font-medium text-sm">{isLoading ? 'Signing out...' : 'Sign Out'}</span>
    </motion.button>
  );
};

export default LogoutButton;