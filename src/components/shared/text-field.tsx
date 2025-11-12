import { Icon } from "@iconify/react";
import { Input } from "@nextui-org/input";
import { cn } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import React, {
  FC,
  InputHTMLAttributes,
  RefCallback,
  useRef,
  useState,
} from "react";
import { v4 } from "uuid";

interface CustomSelectFieldProps {
  label?: string;
  placeholder?: string;
  error?: string;
  labelPlacement?: "outside" | "outside-left" | "inside";
  className?: string;
  value?: string;
  options: Array<{ label: string; value: any } | string>;
  required?: boolean;
  selectionMode?: "single" | "multiple";
  inputProps?: {
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: any) => unknown;
    ref?: RefCallback<HTMLSelectElement>;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    isDisabled?: boolean;
    selectedKeys?: Array<any>;
  };
  isLoading?: boolean;
  unselectable?: "on" | "off";
}

export const CustomSelectField: FC<CustomSelectFieldProps> = ({
  label = "",
  options = [],
  error,
  inputProps,
  value,
  placeholder,
  className,
  required = false,
  isLoading = false,
  labelPlacement = "outside",
  selectionMode = "single",
  unselectable = "off",
}) => {
  const [showMsg, setShowMsg] = useState(false);

  return (
    <div>
      <Select
        variant={"faded"}
        size="md"
        aria-label="*"
        value={value}
        label={
          required ? (
            <span>
              {label} <span className="text-red-500">*</span>
            </span>
          ) : (
            label
          )
        }
        unselectable={unselectable}
        placeholder={placeholder}
        labelPlacement={labelPlacement}
        selectionMode={selectionMode}
        selectedKeys={value ? [value] : []}
        radius="sm"
        isLoading={isLoading}
        {...(inputProps ?? {})}
        endContent={
          error && (
            <Icon
              onClick={() => setShowMsg(true)}
              icon="material-symbols:error-outline"
              className=" "
              color="orange"
            />
          )
        }
        classNames={{
          trigger: cn(
            `data-[hover=true]:shadow-none shadow-none border dark:border-[#F5F5F580] border-[1px] dark:bg-[#252525] text-[12px] h-11 `,
            className
          ),
          label: "dark:text-gray-300 text-xs uppercase",
          popoverContent: "rounded-md",
        }}
      >
        {options?.map((option: any) => (
          <SelectItem
            classNames={{
              base: "rounded-md",
            }}
            key={option?.value || option}
            value={option?.value || option}
          >
            {option?.label || option}
          </SelectItem>
        ))}
      </Select>

      {showMsg ? (
        <span className="text-red-400 text-[12px]">{error}</span>
      ) : null}
    </div>
  );
};

// CUSTOM INPUT
interface CustomInputTextFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "number" | "date";
  onChange?: (e: any) => unknown;
  placeholder?: string;
  required?: boolean;
  error?: string;
  height?: string;
  value?: string;
  labelPlacement?: "outside" | "outside-left" | "inside";
  label?: string;
  isLoading?: boolean;
  disabled?: boolean;
  inputProps?: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: any) => unknown;
    ref?: RefCallback<HTMLInputElement>;
    name?: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
  } & Record<string, any>;
  startContent?: React.ReactNode;
  isClearabe?: boolean;
  onClear?: () => void;
}

export const CustomInputTextField = (props: CustomInputTextFieldProps) => {
  const {
    type,
    label,
    placeholder,
    required = false,
    inputProps,
    error,
    isLoading = false,
    disabled,
    value,
    onChange,
    height = "min-h-[45px]",
    labelPlacement = "outside",
    startContent,
    isClearabe = false,
    onClear,
    onKeyDown,
  } = props;

  return (
    <div>
      <div className="relative">
        {isLoading && (
          <Icon
            icon="eos-icons:loading"
            className={` absolute z-10 top-1/2 -translate-y-1/2 right-0 bottom-6 text-[23px] mr-2 mb-1`}
          />
        )}

        <Input
          onClear={onClear}
          isClearable={isClearabe}
          onChange={onChange}
          size="sm"
          type={type ?? "text"}
          value={value}
          // label={label}
          label={
            required ? (
              <span>
                {label} <span className="text-red-500">*</span>
              </span>
            ) : (
              label
            )
          }
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          startContent={startContent}
          labelPlacement={labelPlacement}
          endContent={
            error && (
              <Icon
                icon="material-symbols:error-outline"
                className=" "
                color="orange"
              />
            )
          }
          {...(inputProps ?? {})}
          variant="faded"
          disabled={disabled}
          classNames={{
            input:
              "outline-none focus:border-none placeholder:font-light placeholder:text-gray-400",
            inputWrapper: `border dark:border-[#F5F5F580] bg-gray-100/80 dark:bg-transparent focus-visible:ring-[#619B7D] disabled:cursor-not-allowed disabled:opacity-50 ${height}`,
            label: "dark:text-gray-300 text-xs -mt-1 uppercase",
          }}
        />
      </div>

      <span className="text-red-400 text-xs absolute px-1">{error}</span>
    </div>
  );
};

interface CustomTextareaFieldProps {
  error?: string;
  placeholder: string;
  label?: string;
  inputProps?: {
    onChange?: (e: any) => unknown;
    onBlur?: (e: any) => unknown;
    ref?: RefCallback<HTMLTextAreaElement>;
    name?: string;
    value?: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
  };
}

export const CustomTextareaField = ({
  placeholder,
  error,
  inputProps,
  label,
}: CustomTextareaFieldProps) => {
  return (
    <div className="flex flex-col w-full">
      <label className="px-1 text-black/80 dark:text-gray-300 text-sm uppercase">
        {inputProps?.required ? (
          <span>
            {label} <span className="text-red-500">*</span>
          </span>
        ) : (
          label
        )}
      </label>
      <div className="w-full border flex flex-col rounded-md text-sm justify-center">
        <textarea
          className="bg-transparent h-[100px] w-full px-2 py-1 outline-none focus:border-none"
          {...(inputProps ?? {})}
          placeholder={placeholder}
        ></textarea>
      </div>
      {error ? <span className="text-red-400 text-[12px]">{error}</span> : null}
    </div>
  );
};

interface IUploadFileComponent {
  label: string;
  name: string;
  required: boolean;
  loadingTemplate?: boolean;
  onchange: React.ChangeEventHandler<HTMLInputElement>;
  onremove: () => void;
  value: any;
  url: any;
  error: any;
  template?: any;
}

export const UploadFileComponent = ({
  label,
  required,
  onchange,
  value,
  name,
  onremove,
  url,
  error,
  template = null,
  loadingTemplate = false,
}: IUploadFileComponent) => {
  const id = `file${v4().replaceAll("-", "")}`;
  const fileInputRef = useRef(null);

  return (
    <div className="flex flex-col gap-3">
      {template && (
        <p className="text-center text-sm">
          Please download the template and fill out the required details you
          want to import.
        </p>
      )}
      <label
        htmlFor={id}
        className={`w-full min-h-[7rem] border rounded-xl p-2 text-sm flex flex-col hover:cursor-pointer ${
          !value && "border-dashed"
        }  ${error ? "border-red-500" : "border-gray-300"}`}
      >
        <nav className="flex flex-row relative w-full pr-4">
          <h1 className="font-medium uppercase">
            <span className="text-red-500 ">{required && "* "}</span>
            {label}
          </h1>

          {error && (
            <Icon
              icon="mdi:warning-circle-outline"
              className={`absolute top-1/2 -translate-y-1/2 text-[19px] text-red-500 right-0`}
            />
          )}

          <button
            onClick={(e) => {
              onremove();
              fileInputRef.current.value = "";
              e.preventDefault();
            }}
            className="ml-auto hover:text-red-400 absolute right-0 top-0"
          >
            <Icon icon="solar:trash-bin-2-bold" className="text-[19px]" />
          </button>
        </nav>

        <div className="flex flex-row items-center my-auto w-full relative">
          <input
            id={id}
            ref={fileInputRef}
            type="file"
            name={name}
            className="hidden"
            onChange={onchange}
            disabled={value}
          />
          {!value && (
            <div className="flex flex-col items-center m-auto gap-y-1 text-gray-600">
              <div className="font-light text-center">
                <strong>Click to upload</strong> or drag and drop <br />
                IMG, PDF or CSV
              </div>
            </div>
          )}
          {value && (
            <div className="grid grid-cols-[1fr] hover:underline w-full">
              <div className="flex flex-row gap-x-2 items-center justify-center overflow-hidden mr-2">
                <a href={url} target="__blank">
                  <p className="whitespace-nowrap text-ellipsis w-full text-sm">
                    {name}
                  </p>
                </a>
              </div>
            </div>
          )}
        </div>
      </label>

      {template && (
        <button
          onClick={() => template?.()}
          className="flex items-center gap-2 mx-auto mt-4 font-medium text-secondary text-sm"
        >
          <Icon
            icon={loadingTemplate ? "eos-icons:loading" : "bi:download"}
            className="text-[19px]"
          />
          Download Template
        </button>
      )}
    </div>
  );
};
