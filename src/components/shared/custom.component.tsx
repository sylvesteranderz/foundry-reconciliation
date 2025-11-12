import React, { ComponentProps, FC } from "react";
import { FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";

import { Input, InputProps } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";
import { Select, SelectItem } from "@nextui-org/react";

interface CustomSelectProps {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  placeholder: string;
  options: string[];
}

export const CustomSelect: FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div>
      <Select
        variant={"faded"}
        placeholder={placeholder}
        value={value}
        label={label}
        labelPlacement="outside"
        onChange={onChange}
        radius="sm"
        classNames={{
          trigger:
            "data-[hover=true]:shadow-none shadow-none border dark:border-[#F5F5F580] border-[1px] dark:bg-primary text-[12px] h-11",
          label: "dark:text-[#929292] font-medium uppercase text-[12px] -mb-1",
        }}
      >
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </Select>
      <FormMessage />
    </div>
  );
};
interface CustomInputProps {
  label?: string;
  placeholder: string;
  field: {
    value: string | number | undefined;
    onChange: (value: string | number) => void;
  };
}

export const CustomRadixInput: React.FC<CustomInputProps & InputProps> = ({
  label,
  placeholder,
  field,
  ...inputProps
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.value);
  };

  return (
    <div>
      <FormLabel className="dark:text-[#929292] uppercase text-[12px] leading-none whitespace-nowrap">
        {label}
      </FormLabel>

      <FormItem>
        <FormControl>
          <Input
            placeholder={placeholder}
            {...inputProps}
            value={field.value}
            onChange={handleChange}
          />
        </FormControl>
      </FormItem>
      <FormMessage />
    </div>
  );
};

interface CustomRadioGroupProps {
  label: string;
  options: string[];
  field: { value: string; onChange: (value: string) => void };
}

export const CustomRadixRadioGroup: React.FC<CustomRadioGroupProps> = ({
  label,
  options,
  field,
}) => {
  return (
    <div>
      <FormLabel className="dark:text-[#929292] uppercase text-[12px] leading-none whitespace-nowrap">
        {label}
      </FormLabel>

      <FormItem>
        <FormControl>
          <RadioGroup
            className="flex justify-between"
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            {options?.map((option) => (
              <FormItem
                key={option}
                className="flex items-center space-x-2 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem value={option}>{option}</RadioGroupItem>
                </FormControl>
                <FormLabel className="font-normal">{option}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
      </FormItem>
      <FormMessage />
    </div>
  );
};

interface CustomCalendarProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  placeholder: string;
}

export const CustomCalendar: React.FC<CustomCalendarProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  const handleSelect: SelectSingleEventHandler = (selectedDate) => {
    if (selectedDate instanceof Date) {
      onChange(selectedDate);
    }
  };

  return (
    <div>
      <FormLabel className="dark:text-[#929292] uppercase text-[12px] leading-none whitespace-nowrap">
        {label}
      </FormLabel>
      <FormItem className="flex flex-col">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="customInput"
                className={`pl-3 text-left font-normal ${
                  !value && "text-muted-foreground"
                }`}
              >
                {value ? (
                  format(value, "PPP")
                ) : (
                  <span className="text-slate-500 text-sm">{placeholder}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleSelect}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormItem>
      <FormMessage />
    </div>
  );
};

interface CustomCheckboxProps extends ComponentProps<"input"> {
  label: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        {...props}
        className="w-[17px] h-[17px] appearance-none border-[2px] border-[#92929280] rounded-md checked:bg-[#619B7D] checked:border-[#619B7D] checked:border-opacity-0 mr-2"
      />
      <span className="text-sm">{label}</span>
    </div>
  );
};
