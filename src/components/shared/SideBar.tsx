import { AnimatePresence, motion } from 'framer-motion';
import { CloseSquare } from 'iconsax-react';
import { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
  children: ReactNode;
  closeOnSideClick?: boolean;
}

const Sidebar = ({
  isOpen,
  toggleSidebar,
  children,
  closeOnSideClick = false,
}: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-[0.1px] z-40"
            onClick={() => {
              if (closeOnSideClick) {
                toggleSidebar();
              }
            }}
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: isOpen ? 0 : '-100%' }}
            // exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full bg-white shadow-lg z-50 overflow-y-scroll "
          >
            <div className="  pb-6">
              <div className="flex items-end justify-end p-2">
                <button onClick={toggleSidebar} className="  rounded ">
                  <CloseSquare />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
