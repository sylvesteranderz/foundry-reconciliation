/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { updateGlobalState } from '@/store/features/global';
import { RootState } from '@/store/store';
import { Tab, Tabs } from '@nextui-org/react';
import {
  endOfMonth,
  endOfToday,
  endOfYear,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  subDays,
  subYears,
} from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';

interface IDateFilter {
  color?:
    | 'success'
    | 'default'
    | 'secondary'
    | 'primary'
    | 'warning'
    | 'danger'
    | undefined;
}
export const CustomOnlyDateFilterComponent = ({
  color = 'default',
}: IDateFilter) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [dismissDatePopup, setDismissDatePopup] = useState(false);

  const dispatch = useDispatch();
  const { dateFilter } = useSelector((state: RootState) => state.global);

  useEffect(() => {
    if (dateFilter?.active === 'custom') {
      setDismissDatePopup(false);
    } else {
      setDate(undefined);
    }
  }, [dateFilter]);

  useEffect(() => {
    if (date !== undefined) {
      dispatch(
        updateGlobalState({
          dateFilter: {
            active: 'custom',
            start_date: dateMap['custom'].start_date,
            end_date: dateMap['custom'].end_date,
          },
        }),
      );
    }
  }, [date, dispatch]);

  const divRef: any = useRef();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setDismissDatePopup(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divRef]);

  const dateMap: any = {
    today: {
      start_date: startOfToday(),
      end_date: endOfToday(),
    },
    last_month: {
      start_date: startOfMonth(subDays(startOfMonth(new Date()), 1)),
      end_date: endOfMonth(subDays(startOfMonth(new Date()), 1)),
    },
    this_week: {
      start_date: startOfWeek(new Date()),
      end_date: endOfToday(),
    },
    this_month: {
      start_date: startOfMonth(new Date()),
      end_date: endOfMonth(new Date()),
    },
    this_year: {
      start_date: startOfYear(new Date()),
      end_date: endOfYear(new Date()),
    },
    last_year: {
      start_date: startOfYear(subDays(startOfYear(new Date()), 1)),
      end_date: endOfYear(subYears(new Date(), 1)),
    },
    custom: {
      start_date: date?.from || dateFilter?.start_date,
      end_date: date?.to || dateFilter?.end_date,
    },
    all_time: {
      start_date: null,
      end_date: null,
    },
  };

  return (
    <div ref={divRef} className="relative">
      <Tabs
        key={'*'}
        size={'sm'}
        radius="sm"
        color={color}
        selectedKey={dateFilter?.active as any}
        onSelectionChange={(key: React.Key) => {
          dispatch(
            updateGlobalState({
              dateFilter: {
                active: key,
                start_date: dateMap[key as any].start_date,
                end_date: dateMap[key as any].end_date,
              },
            }),
          );
        }}
        classNames={{
          tabList: 'dark:bg-transparent bg-primary-gray/20 border dark:border-white/30 rounded-md',
          cursor: 'w-full rounded-md data-focus:shadow-none',
        }}
        aria-label="Tabs sizes"
      >
        <Tab key="this_month" title="This Month" />
        <Tab key="last_month" title="Last Month" />

        <Tab key="all_time" title="All Time" />
        <Tab
          key="custom"
          title={
            date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Custom Date</span>
            )
          }
        />
      </Tabs>

      <style>{css}</style>
      {dateFilter?.active === 'custom' && !dismissDatePopup && (
        <div
          onMouseLeave={() => setDismissDatePopup(true)}
          className="absolute  bg-white dark:bg-primary-gray z-50 right-0  border rounded-md mt-1 shadow-md"
        >
          <DayPicker
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            modifiersClassNames={{
              selected: 'my-selected',
              today: 'my-today',
            }}
            modifiersStyles={{
              disabled: { fontSize: '70%' },
            }}
          />
        </div>
      )}
    </div>
  );
};

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 1px solid #619b7d84;
		background-color: #619b7d4b;
		
  }
  .my-selected:hover:not([disabled]) { 
    border-color: amber;
    color: amber;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;
