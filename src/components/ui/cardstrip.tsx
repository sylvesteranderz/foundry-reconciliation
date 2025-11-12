import { motion } from "framer-motion";

interface CardStripProps {
  date: string;
  day: string;
  name: string;
}

export const CardStrip = ({ date, day, name }: CardStripProps) => {
  return (
    <motion.div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-10">
        <div className="text-lg text-white font-medium">{date}</div>
        <div className="text-sm text-[#929292]">{day}</div>
      </div>
      <div className="ml-2 flex items-center bg-[#161616] rounded-lg shadow-md overflow-hidden h-[4rem] w-full">
        <div className="w-1 p-1 bg-primary-green h-[100%]"></div>
        <div className="flex-1 p-3 text-white">{name}</div>
      </div>
    </motion.div>
  );
};
