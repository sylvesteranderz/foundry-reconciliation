import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
interface props {
  id: string;
  values: Record<string, any>;
  errors: Record<string, string>;
  handleBlur: any;
  handleChange: any;
  // placeholder: string;
  label: string;
  extraClassName?: string;
  leading?: React.ReactNode;
  // type?: HTMLInputTypeAttribute;
  boldenLabel?: boolean;
  bgColor?: string;
  labelColor?: string;
  labelFontSize?: string;
  labelMarginBottom?: string;
  touched: Record<string, boolean>;
  disabled?: boolean;
}
export function DatePicker({
  id,
  label,
  handleBlur,
  handleChange,
  errors,
  values,
  extraClassName = '',
  leading,
  // placeholder,
  boldenLabel = false,
  bgColor = 'bg-form-bg',
  labelColor = 'text-ash-text',
  labelFontSize = 'text-[0.8rem]',
  labelMarginBottom = 'mb-1',
  touched,
  disabled = false,
}: props) {
  const [date, setDate] = React.useState<Date>();

  return (
    <div>
      <p
        className={`${
          boldenLabel ? 'font-medium' : ' font-normal'
        }  ${labelColor}  ${labelFontSize}  ${labelMarginBottom}`}
      >
        {label}
      </p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-between text-left font-normal focus-visible:ring-[#619B7D] bg-form-bg hover:bg-form-bg',
              !date && 'text-muted-foreground'
            )}
          >
            {date ? (
              format(date, 'P')
            ) : (
              <p className="text-ash-text">Pick a date</p>
            )}
            <CalendarIcon className="ml-2 h-4 w-4 text-ash-text" />
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
