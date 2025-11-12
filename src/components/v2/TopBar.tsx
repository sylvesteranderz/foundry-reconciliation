import { motion } from "framer-motion";
import { Settings, Info, Bell, User, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import MobileMenu from "./MobileMenu";
import { Icon } from "@iconify/react/dist/iconify.js";

interface TopBarProps {
  activeTab?: string;
  onTabClick?: (tab: string) => void;
}

export default function TopBar({
  activeTab = "books",
  onTabClick = () => {},
}: TopBarProps) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    // Clear any stored authentication tokens
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    // Redirect to login or home page
    window.location.href = "/";
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white px-6 py-4 flex items-center justify-between rounded-t-3xl"
    >
      {/* Daily Limits Section */}
      <motion.div
        className="flex items-center space-x-4"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Mobile Menu */}
        <MobileMenu activeTab={activeTab} onTabClick={onTabClick} />

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between  space-x-2">
            <div className="text-sm font-medium text-gray-700">
              Daily Limits
            </div>
            <p>
              <span className="text-sm text-[#1E0E06]/50">20/</span>
              <span className="text-sm text-[#1E0E06]">/100 Credits</span>
            </p>
          </div>
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-green rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "20%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Profile & Actions Section */}
      <motion.div
        className="flex items-center space-x-3"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.button
          className="p-2 bg-[#E1E4EA] hover:bg-gray-100 rounded-full transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </motion.button>

        <motion.button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Info className="w-5 h-5 text-gray-600" />
        </motion.button>

        <motion.button
          className="hover:bg-gray-100 rounded-full relative transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* <Bell className="w-5 h-5 text-gray-600" /> */}
          <Icon
            icon="hugeicons:notification-01"
            className="w-7 h-7 text-gray-600"
          />
          <motion.div
            className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          />
        </motion.button>

        <div className="relative" ref={dropdownRef}>
          <motion.button
            onClick={toggleUserDropdown}
            className="w-8 h-8 p-1 bg-primary-gray rounded-full flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <User className="w-5 h-5 text-primary-green" />
          </motion.button>

          {/* User Dropdown */}
          {showUserDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
