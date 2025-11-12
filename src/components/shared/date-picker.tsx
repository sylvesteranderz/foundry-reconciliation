import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePickerDemo({
  label,
  boldenLabel = false,
  labelColor = 'text-ash-text',
  labelFontSize = 'text-[0.9rem]',
  labelMarginBottom = 'mb-1',
}: {
  labelColor?: string;
  labelFontSize?: string;
  labelMarginBottom?: string;
  boldenLabel?: boolean;
  label: string;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <div>
      <div>
        <p
          className={cn(
            boldenLabel ? 'font-medium' : ' font-extralight',
            labelMarginBottom,
            labelColor,
            labelFontSize
          )}
        >
          {label}
        </p>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start  text-left font-normal focus-visible:ring-[#619B7D] bg-form-bg hover:bg-form-bg',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-ash-text" />
            {date ? (
              format(date, 'P')
            ) : (
              <p className="text-ash-text">Pick a date</p>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 " align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
