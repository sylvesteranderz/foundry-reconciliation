import { useState, useRef, useEffect } from 'react';
import { SearchList } from '@/lib/api/queries.global';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cn } from '@nextui-org/react';

interface KSelectProps {
  placeholder?: string;
  label: string;
  onChange: (value: string, description: string) => void;
  errors?: Record<string, string>;
  values?: Record<string, any>;
  id: string;
  extraClassName?: string;
  boldenLabel?: boolean;
  bgColor?: string;
  labelColor?: string;
  labelFontSize?: string;
  labelMarginBottom?: string;
  doctype: string;
  reference_doctype: string;
  touched: Record<string, boolean>;
  filters?: any;
  active?: boolean;
  query?: string;
  showDescription?: boolean;
  required?: boolean;
  disabled?: boolean;
  clearInput?: boolean;
}

const AutoComplete = ({
  placeholder,
  label,
  onChange,
  errors,
  id,
  showDescription = false,
  boldenLabel = false,
  labelColor = 'text-gray-600',
  labelFontSize = 'text-sm',
  labelMarginBottom = 'mb-1',
  doctype,
  reference_doctype,
  touched,
  filters = {},
  values = {},
  active = true,
  query = '',
  required = false,
  disabled = false,
  clearInput = false,
}: KSelectProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [_lastExternalValue, setLastExternalValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [id, query, inputValue, JSON.stringify(filters)],
    queryFn: () =>
      SearchList({
        payload: {
          filters,
          doctype,
          reference_doctype,
          txt: String(inputValue).trim(),
          query,
        },
      }),
    enabled: active,
  });

  useEffect(() => {
    const externalValue = values[id] || '';
    if (!clearInput && externalValue !== inputValue) {
      setInputValue(externalValue);
      setLastExternalValue(externalValue);
      setIsSelected(true);
    }
  }, [values, id, clearInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (!isSelected && inputValue !== (values[id] || '')) {
          setInputValue(values[id] || '');
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isSelected, values, id, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsSelected(false);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setIsSelected(false);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!dropdownRef.current?.matches(':hover')) {
        if (!isSelected && inputValue !== (values[id] || '')) {
          setInputValue(values[id] || '');
        }
        setIsOpen(false);
      }
    }, 150);
  };

  const handleSelect = (selectedValue: string, description: string) => {
    setInputValue(selectedValue);
    setLastExternalValue(selectedValue);
    setIsSelected(true);
    onChange(selectedValue, description);
    setIsOpen(false);
    queryClient.removeQueries({ queryKey: [doctype, id], exact: false });
  };

  const handleClear = () => {
    setInputValue('');
    setIsSelected(false);
    setLastExternalValue('');
    onChange('', '');
    setIsOpen(false);
    queryClient.removeQueries({ queryKey: [doctype, id], exact: false });
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setInputValue(values[id] || '');
      inputRef.current?.blur();
    }
  };

  const hasResults =
    data?.data?.message &&
    Array.isArray(data.data.message) &&
    data.data.message.length > 0;

  const showDropdown = isOpen && (hasResults || (!isLoading && !hasResults));

  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className={`${boldenLabel ? 'font-semibold' : 'font-light'} ${labelColor} ${labelFontSize} ${labelMarginBottom} block`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={id}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={!active}
          autoComplete="off"
          className={cn(
            'flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-white',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'focus-visible:outline-none focus-visible:ring-1',
            'placeholder:text-[0.9rem] text-[0.9rem] transition-colors duration-200',
            clearInput ? 'pr-12' : 'pr-8',
            'dark:border-[#F5F5F580] dark:bg-[#161616]',
            'bg-[hsl(240,4.76%,95.88%)]',
            {
              'border-red-500 focus-visible:ring-red-500':
                errors?.[id] && touched?.[id],
              'border-gray-300 focus-visible:ring-[#619B7D]': !(
                errors?.[id] && touched?.[id]
              ),
              'disabled:cursor-not-allowed disabled:opacity-50 text-gray-500':
                !active,
              'text-gray-900': active,
            }
          )}
        />
        {inputValue && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            aria-label="Clear input"
            title="Clear input"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {isLoading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-primary-green"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1 font-light">
          Error fetching data:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      )}

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto"
          role="listbox"
        >
          {hasResults ? (
            data.data.message.map(
              (
                item: { value: string; description?: string },
                index: number
              ) => (
                <div
                  key={`${item.value}-${index}`}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900 transition-colors duration-150"
                  onClick={() => handleSelect(item.value, item.description)}
                  role="option"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(item.value, item.description);
                    }
                  }}
                >
                  <p className="truncate font-normal text-[0.9rem]">
                    {item.value}
                  </p>
                  {showDescription && item.description && (
                    <p className="text-gray-500 text-sm truncate">
                      {item.description}
                    </p>
                  )}
                </div>
              )
            )
          ) : (
            <p className="px-4 py-2 text-gray-500 text-[0.9rem]">
              No results found
            </p>
          )}
        </div>
      )}

      {errors?.[id] && touched?.[id] && (
        <p className="text-red-500 text-xs mt-1 font-light">* {errors[id]}</p>
      )}
    </div>
  );
};

export default AutoComplete;
