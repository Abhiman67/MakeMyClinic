import { motion, AnimatePresence } from "framer-motion";
import { FaBed } from "react-icons/fa";

interface NotificationProps {
  showNotification: boolean;
  setShowNotification: (show: boolean) => void;
}

const Notification = ({ showNotification, setShowNotification }: NotificationProps) => {
  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          className="fixed top-24 right-8 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-yellow-100 dark:border-yellow-700 w-64"
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
        >
          <div className="flex items-start">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-full mr-3">
              <FaBed className="text-amber-600 dark:text-amber-400 w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">New bed available</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">ICU Ward, Room 305</p>
            </div>
            <button 
              className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              onClick={() => setShowNotification(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification; 