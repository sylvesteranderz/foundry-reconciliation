// /* eslint-disable react-hooks/exhaustive-deps */
// import { CalendarIcon } from '@radix-ui/react-icons';
// import { endOfToday, format, startOfYear } from 'date-fns';
// import * as React from 'react';

// import { cn } from '@/lib/utils';
// import { updateGlobalState } from '@/store/features/global';
// import { RootState } from '@/store/store';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from '../ui/button';
// import { Calendar } from '../ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

// export function CalendarDateRangePicker({
//   className,
// }: React.HTMLAttributes<HTMLDivElement>) {
//   const { dateRange } = useSelector((state: RootState) => state.global);
//   const dispatch = useDispatch();

//   function setDate(value: any) {
//     dispatch(updateGlobalState({ dateRange: value }));
//   }

//   React.useEffect(() => {
//     setDate({
//       from: startOfYear(new Date()),
//       to: endOfToday(),
//     });
//   }, []);

//   return (
//     <div className={cn('grid gap-2', className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant={'secondary'}
//             className={cn(
//               'w-[260px] justify-start text-left font-normal ',
//               !dateRange && 'text-black'
//             )}>
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {dateRange?.from ? (
//               dateRange.to ? (
//                 <>
//                   {format(dateRange.from, 'LLL dd, y')} -{' '}
//                   {format(dateRange.to, 'LLL dd, y')}
//                 </>
//               ) : (
//                 format(dateRange.from, 'LLL dd, y')
//               )
//             ) : (
//               <span>Pick a date</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="end">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={dateRange?.from}
//             selected={dateRange}
//             onSelect={setDate}
//             numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
