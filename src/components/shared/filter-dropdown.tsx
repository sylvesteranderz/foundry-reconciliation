import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Spinner,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface FilterDropdownProps {
  label: string;
  items: { value: string }[];
  selected: string;
  onChange: (val: string) => void;
  isLoading?: boolean;
  showLabel?: boolean;
}

const FilterDropdown = ({
  label,
  items,
  selected,
  onChange,
  isLoading,
  showLabel = false,
}: FilterDropdownProps) => {
  return (
    <div className="flex flex-col gap-1">
      {showLabel && <p>{label}</p>}
      <Dropdown>
        <DropdownTrigger>
          <Button
            endContent={
              <Icon icon="stash:chevron-down" className="text-[19px]" />
            }
            size="sm"
            variant="flat"
            isDisabled={isLoading}
          >
            {items.find((item) => item.value === selected)?.value || label}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="max-h-[250px] overflow-y-auto"
          aria-label={`${label} List`}
          selectionMode="single"
          selectedKeys={selected ? [selected] : []}
          onSelectionChange={(keySet) => {
            const val = Array.from(keySet as Set<any>)[0];
            onChange(val === selected ? '' : val);
          }}
        >
          {isLoading ? (
            <DropdownItem key="loading" textValue="loading">
              <Spinner size="sm" color="secondary" />
            </DropdownItem>
          ) : (
            items.map((item) => (
              <DropdownItem key={item.value} textValue={item.value}>
                {item.value}
              </DropdownItem>
            ))
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default FilterDropdown;
