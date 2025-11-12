import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

interface MobileMenuProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export default function MobileMenu({ activeTab, onTabClick }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden">
      {/* Menu Button */}
      <motion.button
        onClick={toggleMenu}
        className="p-2 rounded-2xl bg-white border border-gray-200 shadow-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open menu"
        title="Open menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </motion.button>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 h-full z-50 ${isOpen ? "block" : "hidden"}`}
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white h-full shadow-xl">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-2xl hover:bg-gray-100"
              aria-label="Close menu"
              title="Close menu"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <Sidebar
            activeTab={activeTab}
            onTabClick={(tab) => {
              onTabClick(tab);
              setIsOpen(false);
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
