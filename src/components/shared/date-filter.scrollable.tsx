import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../ui/button';

interface IDateFilter {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export const DateFilterComponentScrollable: React.FC<IDateFilter> = ({
  currentDate,
  setCurrentDate,
}) => {
  const [direction, setDirection] = useState(0);

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    setDirection(-1);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    setDirection(1);
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 100 : -100,
        opacity: 0,
      };
    },
  };

  return (
    <Button
      size="xs"
      variant="outline"
      className="w-full flex items-center flex-nowrap justify-center gap-3 bg-[#161616] rounded-full border border-[#929292] text-[#929292]">
      <button onClick={handlePreviousMonth}>&lt;</button>
      <div className="overflow-hidden w-40">
        <AnimatePresence custom={direction} mode="wait">
          <motion.span
            key={currentDate.toString()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="block text-center">
            {format(currentDate, 'MMMM yyyy')}
          </motion.span>
        </AnimatePresence>
      </div>
      <button onClick={handleNextMonth}>&gt;</button>
    </Button>
  );
};
