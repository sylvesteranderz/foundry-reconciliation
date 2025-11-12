import { motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function FoundryAIBox() {
  const [inputValue, setInputValue] = useState("");

  const suggestedActions = [
    {
      id: "sales",
      text: "Help me increase sales",
      icon: "/images/increase_sales.svg",
    },
    {
      id: "marketing",
      text: "Design a marketing plan",
      icon: "/images/marketing_plan.svg",
    },
    {
      id: "accounting",
      text: "Learn about accounting",
      icon: "/images/learn_accounting.svg",
    },
    {
      id: "analyze",
      text: "Analyze Image",
      icon: "/images/analyze_image.svg",
    },
  ];

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="space-y-6"
    >
      {/* Suggested Actions */}
      <motion.div
        className="flex flex-wrap gap-3 justify-center sm:justify-start"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        {suggestedActions.map((action, index) => (
          <motion.button
            key={action.id}
            className="bg-white border border-gray-200 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-base flex items-center space-x-2 transition-all duration-300"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
            whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon={action.icon} className="w-4 h-4" />
            <img src={action.icon} className="w-4 h-4" alt={action.text} />
            <span>{action.text}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Foundry AI Section */}
      <motion.div
        className="bg-gradient-to-r  from-[#F7F3DD] to-[#E3EDFC] via-[#F6EAE7] rounded-3xl py-4 px-[6px]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2 ml-2">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <div className="w-8 h-8  flex items-center justify-center">
              {/* <Icon icon="heroicons:clock" className="w-4 h-4 text-white" /> */}
              <img src="/images/found-ai-logo.png" alt="Foundry AI Logo" className="w-full h-full" />
            </div>
            <h2 className="text-xl font-medium text-gray-800">Foundry AI</h2>
          </motion.div>

          <motion.button
            className=" text-primary-dark px-4 py-2 rounded-full text-base font-medium flex items-center space-x-2 transition-all duration-300 "
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Upgrade Now</span>
            <Icon icon="icons8:up-round" className="w-5 h-5 rotate-45" />
          </motion.button>
        </div>

        {/* AI Input Box */}
        <motion.div
          className="bg-white rounded-3xl border-gray-200 p-4 shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {/* Input Field */}
          <div className="mb-4">
            <motion.textarea
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:ring-primary-green focus:ring-opacity-20 rounded-xl px-4 py-0  transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left Actions */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.7 }}
            >
              <motion.button
                className="border border-gray-200 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="heroicons:paper-clip" className="w-3 h-3" />
                <span>Attach</span>
              </motion.button>

              <motion.button
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="hugeicons:idea" className="w-4 h-4" />
                <span>Analyse</span>
              </motion.button>
            </motion.div>

            {/* Right Actions */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <motion.button
                className="border border-gray-200 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="lucide:audio-lines" className="w-4 h-4" />
                <span>Voice</span>
              </motion.button>

              <motion.button
                className="bg-primary-green hover:bg-primary-green/90 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputValue.trim()}
              >
                <Icon icon="streamline-plump:mail-send-email-message" className="w-4 h-4 -rotate-45" />
                <span>Send</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
