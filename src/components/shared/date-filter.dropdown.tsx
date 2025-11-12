import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

interface IDateFilter {
  // Define any props if needed
}

export const DateFilterComponentDroppable: React.FC<IDateFilter> = () => {
  const [currentOption, setCurrentOption] = useState("Monthly");
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Daily", "Weekly", "Monthly", "Annually"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setCurrentOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <Button
        size="xs"
        variant="outline"
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-[#161616] rounded-full border border-[#929292] text-[#929292] px-4 py-2"
      >
        <span>{currentOption}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.292 7.292a1 1 0 011.416 0L10 10.584l3.292-3.292a1 1 0 111.416 1.416l-4 4a1 1 0 01-1.416 0l-4-4a1 1 0 010-1.416z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#161616] ring-1 ring-black ring-opacity-5"
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`text-gray-200 block px-4 py-2 text-sm w-full text-left ${
                    currentOption === option ? "bg-[#383838]" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
