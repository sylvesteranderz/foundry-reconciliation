import { Icon } from '@iconify/react/dist/iconify.js';
import { FC, useEffect, useRef, useState } from 'react';

interface ICustomInput {
  label: string;
  placeholder: string;
  name?: string;
  type: 'text' | 'number';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  value: string;
  loading?: boolean;
  required?: boolean;
  disabled?: boolean;
  verifiedIcon?: string;
}

export const CustomInput: FC<ICustomInput> = (props) => {
  const {
    label,
    placeholder,
    type = 'text',
    onChange,
    value,
    loading,
    required = false,
    verifiedIcon,
    name,
    disabled,
    onClick,
  } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="flex flex-col gap-y-1">
      <label
        className="text-[14px] dark:text-[#d5d5d5] text-gray-600 flex flex-row gap-x-1"
        htmlFor={label}>
        {label} {required && <p className="text-red-500">*</p>}
      </label>
      <div
        className={`grid ${
          loading || verifiedIcon ? 'grid-cols-[1fr,5%]' : 'w-full'
        } `}>
        <input
          type={type}
          id={label}
          name={name}
          onClick={onClick}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={handleInputChange}
          className={` border-[1px] rounded-[6px] py-2 px-2 gap-1 flex w-full dark:bg-transparent placeholder:font-light placeholder:text-sm`}
        />

        <div>
          {loading === true && <Icon icon="eos-icons:loading" fontSize={25} />}
          {verifiedIcon === 'verified' ? (
            <Icon icon="icons8:checked" color="#0a896b" fontSize={25} />
          ) : verifiedIcon === 'not-verified' ? (
            <Icon icon="codicon:unverified" color="orange" fontSize={25} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

interface ICustomSelectDropDown {
  selectedOption: string;
  onChange: (selectedOption: string) => void;
  option: string[];
  select: string;
  label: string;
  ClassName?: string;
  width?: string;
  style?: string;
}

export const CustomSelectDropDown = ({
  selectedOption,
  onChange,
  option,
  select,
  ClassName,
  label,
  width,
  style,
}: ICustomSelectDropDown) => {
  const [clicked, setClicked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (selected: string) => {
    onChange(selected);
    setClicked(!clicked);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !componentRef.current.contains(event.target as Node)
    ) {
      setClicked(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative ${width} ${style} ${ClassName} text-[12px]`}
      ref={componentRef}>
      <div className="h-full w-full">
        <p className="text-[#A0AEC0] mb-1">{label}</p>
        <div
          onClick={() => {
            setClicked(!clicked);
          }}
          className={
            'cursor-pointer dark:bg-[#202124] bg-white shadow w-full rounded-[6px] h-full px-3 placeholder:text-[#F5F5F5] duration-200 flex justify-between items-center'
          }>
          {selectedOption ? (
            selectedOption
          ) : (
            <span className="text-[#F5F5F5]">{select}</span>
          )}
          <Icon
            className={
              'cursor-pointer duration-150 ' +
              (clicked ? 'rotate-180 opacity-70' : '')
            }
            fontSize={12}
            onClick={() => setClicked(!clicked)}
            icon="bxs:down-arrow"
            rotate={0}
          />
        </div>
      </div>

      {clicked && (
        <>
          <div
            ref={dropdownRef}
            className="w-full max-h-[150px] scrollbar-gray-medium absolute z-50 bg-[#FEFDFE] overflow-auto scrollbar-thin shadow-md border border-gray-200 rounded-lg py-1 mt-1">
            <>
              {option?.map((a, i) => (
                <p
                  key={i}
                  onClick={() => {
                    handleSelect(a);
                  }}
                  className={`text-[#000000] ${ClassName} px-2 py-1 rounded-sm cursor-pointer hover:bg-[#ffbc9b7b]`}>
                  {a}
                </p>
              ))}
            </>
          </div>
        </>
      )}
    </div>
  );
};

interface IInput {
  label: string;
  name: string;
  type: string;
  value: any;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, name, type = 'text', ...rest }: IInput) => {
  const [inputType, setInputType] = useState(type);

  function onTogglePassword() {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  }

  return (
    <div className="relative z-0 w-full">
      <input
        {...rest}
        id={name}
        type={inputType}
        placeholder=" "
        className={`pt-4 pb-3 px-3 block w-full rounded-md mt-0 bg-transparent border-[1.5px]  focus:outline-none focus:ring-0 focus:border-primary-green ${
          rest.error ? 'border-red-400' : 'border-gray-200'
        }  text-primary-black`}
        style={{ WebkitTextFillColor: 'black' }}
      />
      <label
        htmlFor={name}
        className="absolute duration-300 top-4 left-1 -z-1 origin-0 text-gray-500 bg-white px-2">
        {label}
      </label>
      {type === 'password' && (
        <button
          type="button"
          className={`absolute text-gray-600 top-1/2 -translate-y-1/2 right-2 text-[23px]`}>
          <Icon
            icon={
              inputType === 'password'
                ? 'mdi:eye-outline'
                : 'mdi:eye-off-outline'
            }
            onClick={onTogglePassword}
          />
        </button>
      )}

      {rest.error && (
        <div className="absolute bottom-[-16px] px-2 left-0 text-xs text-red-500">
          {rest.error}
        </div>
      )}
    </div>
  );
};
