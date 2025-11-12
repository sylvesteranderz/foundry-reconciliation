import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

interface SidebarProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabClick }: SidebarProps) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  const sidebarItems = [
    {
      id: "books",
      icon: "/images/books.png",
      label: "Books",
      size: "small",
      link: "/dashboard/accounting",
    },
    { id: "pos", icon: "/images/pos-sidebar.svg", label: "PoS", size: "small" },
    {
      id: "people",
      icon: "/images/people.svg",
      label: "People",
      size: "small",
    },
    {
      id: "settings",
      icon: "solar:settings-linear",
      label: "Settings",
      size: "small",
      link: "/settings/setup",
    },
  ];

  const getButtonClasses = (item: any) => {
    const baseClasses =
      "rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105";
    const sizeClasses = item.size === "large" ? "w-12 h-12" : "w-11 h-11";

    if (item.id === activeTab) {
      if (item.color === "blue") {
        return `${baseClasses} ${sizeClasses} bg-blue-500 shadow-lg`;
      }
      return `${baseClasses} ${sizeClasses} bg-gray-400/20`;
    }

    if (item.color === "blue") {
      return `${baseClasses} ${sizeClasses} bg-blue-100 hover:bg-blue-200`;
    }

    if (item.isAction) {
      return `${baseClasses} ${sizeClasses} bg-primary-gray border border-dashed border-2 border-gray-300 hover:border-gray-300 hover:bg-gray-50`;
    }

    if (item.size === "large") {
      return `${baseClasses} ${sizeClasses} bg-gray-100 hover:bg-gray-200`;
    }

    return `${baseClasses} ${sizeClasses} bg-gray-400/20 border-2 border-gray-200 hover:border-gray-300`;
  };

  const getIconClasses = (item: any) => {
    const baseClasses = "w-auto h-5 text-primary-green";

    if (item.id === activeTab) {
      return `${baseClasses} text-white`;
    }

    if (item.color === "blue") {
      return `${baseClasses} text-blue-600`;
    }

    return `${baseClasses} text-gray-600`;
  };

  const handleSidebarClick = (tab: string) => {
    // Handle sign out
    if (tab === "collapse" || tab === "signout") {
      handleSignOut();
      return;
    }

    const selected = sidebarItems.find((i) => i.id === tab);

    if (selected?.link) {
      navigate(selected.link);
    } else {
      onTabClick(tab);
    }
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-20 flex flex-col items-center py-6 space-y-4 rounded-l-3xl h-full"
    >
      <Link to='/'>
        <img
          src="/icons/logo-dark.svg"
          alt="Foundry Logo"
          className="w-6 h-auto"
        />
      </Link>
      {sidebarItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col items-center space-y-1"
        >
          <motion.button
            onClick={() => handleSidebarClick(item.id)}
            className={getButtonClasses(item)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.id === "settings" ? (
              <Icon
                icon={"solar:settings-linear"}
                className={getIconClasses(item)}
              />
            ) : (
              <img
                src={item.icon}
                className={getIconClasses(item)}
                alt={item.label}
              />
            )}
          </motion.button>

          {item.label && (
            <motion.div
              className={`text-xs text-center transition-colors ${
                activeTab === item.id
                  ? "text-black font-medium"
                  : "text-gray-600"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {item.label}
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Sign Out Button */}
      {/* <motion.button
        onClick={() => handleSidebarClick("signout")}
        className="w-10 h-10 hover:border-2 border-gray-200 rounded-full flex items-center justify-center mt-auto hover:border-gray-300 hover:bg-red-50 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        title="Sign Out"
      >
        <LogOut className="w-4 h-4 text-red-600" />
      </motion.button> */}
    </motion.div>
  );
}
