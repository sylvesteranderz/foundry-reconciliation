import { Icon } from '@iconify/react/dist/iconify.js';
import { Column } from '@tanstack/react-table';

interface DataTableFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title: string;
  options: {
    value: string;
  }[];
}

export function DataTableFilter<TData, TValue>({
  options,
  column,
  title,
}: DataTableFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[14px] dark:text-[#929292] text-gray-600">
        <h1 className="uppercase">{title}</h1>
        <button
          onClick={() => column?.setFilterValue(undefined)}
          disabled={selectedValues.size === 0}
          className={
            'dark:text-[#619B7D] text-[#ff9f6e] disabled:text-[#929292a8] disabled:dark:text-[#929292]'
          }>
          <Icon icon="vaadin:eraser" fontSize={17} />
        </button>
      </div>

      {options.map((option, index) => {
        const isSelected = selectedValues.has(option.value);
        return (
          <div key={index} className="flex items-center mb-2">
            <div className="flex items-center gap-2">
              <input
                key={option.value}
                type="checkbox"
                checked={selectedValues.has(option.value)}
                onChange={() => {
                  if (isSelected) {
                    selectedValues.delete(option.value);
                  } else {
                    selectedValues.add(option.value);
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(
                    filterValues?.length ? filterValues : undefined
                  );
                }}
                className="w-5 accent-inherit h-5 appearance-none border-[2px] border-[#92929280] rounded-md checked:bg-[#619B7D] checked:border-[#619B7D] checked:border-opacity-0"
              />
              <span className="text-sm capitalize">{option.value}</span>
            </div>
            {facets?.get(option.value) && (
              <span className="ml-auto font-mono text-xs">
                ({facets.get(option.value)})
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
