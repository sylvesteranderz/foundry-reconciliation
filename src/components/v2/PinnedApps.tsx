import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";

interface AppCard {
  id: string;
  title: string;
  description: string;
  lastAccessed: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  link?: string;
}

export default function PinnedApps() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    slidesToScroll: 1,
    breakpoints: {
      "(max-width: 640px)": { slidesToScroll: 1 },
      "(max-width: 1024px)": { slidesToScroll: 2 },
    },
  });

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const pinnedApps: AppCard[] = [
    {
      id: "books",
      title: "Books",
      description: "Built to simplify bookkeeping, auto...",
      lastAccessed: "Just now",
      icon: "/images/books.png",
      iconBg: "bg-black",
      iconColor: "text-white",
      link: "/dashboard/accounting",
    },
    {
      id: "pos",
      title: "Point of Sale",
      description: "Point of Sale for every business activi...",
      lastAccessed: "11 September",
      icon: "/images/pos.svg",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      link: "#",
    },
    {
      id: "lending",
      title: "Digital Lending",
      description: "Secure access to credit using your trans...",
      lastAccessed: "12 September",
      icon: "/images/digital_lending.png",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      link: "#",
    },
    {
      id: "supply",
      title: "Supply Flow",
      description: "Connect to international suppliers",
      lastAccessed: "12 September",
      icon: "/images/Supply_Flow.png",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      link: "#",
    },
  ];

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={toggleExpanded}
        >
          <h2 className="text-lg font-normal text-gray-800">Pinned Apps</h2>
          <motion.button
            animate={{ rotate: isExpanded ? 0 : -90 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleExpanded}
          >
            <Icon icon="mingcute:down-fill" className="w-5 h-5 text-gray-400" />
          </motion.button>
        </motion.div>

        <motion.a
          href="#"
          className="flex text-[#080401] hover:text-gray-500 text-base font-normal transition-colors"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          See all
          <Icon
            icon="mingcute:right-line"
            className="w-5 h-5 text-[#080401] ml-2"
          />
        </motion.a>
      </div>

      {/* Apps Grid */}
      <motion.div
        initial={{ maxHeight: 0, opacity: 0 }}
        animate={{
          maxHeight: isExpanded ? (contentHeight ?? 9999) : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <div className="relative" ref={contentRef}>
          {/* Left gradient mask */}
          <div className="hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          {/* Right gradient mask */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex gap-4">
              {pinnedApps.map((app, index) => (
                <motion.div
                  key={app.id}
                  className="embla__slide flex-none w-full sm:w-1/2 lg:w-1/4 min-w-0"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <Link to={app.link ?? "#"} className="block h-full">
                    <motion.div
                      className="bg-[#F5F5F5] rounded-2xl p-4 cursor-pointer h-full"
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* App Icon and Header */}
                      <div className="flex flex-col items-start gap-4 mb-3">
                        <div
                          className={`p-2 min-w-10 bg-white rounded-xl flex items-center justify-center`}
                        >
                          <img
                            src={app.icon}
                            alt={`${app.title} app icon`}
                            className="w-auto min-w-6 max-w-12 min-h-4 max-h-7"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                            {app.title}
                          </h3>
                        </div>
                      </div>

                      {/* App Description */}
                      <motion.p
                        className="text-sm text-gray-600 group-hover:text-gray-700 line-clamp-1 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                      >
                        {app.description}
                      </motion.p>
                      <p className="text-xs mt-3 text-gray-500">
                        {app.lastAccessed}
                      </p>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
