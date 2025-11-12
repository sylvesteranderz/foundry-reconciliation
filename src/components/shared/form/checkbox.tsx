import { cn } from '@/lib/utils';
import { Checkbox } from '@nextui-org/checkbox';
const CustomCheckbox = ({ label }: { label: string }) => {
  return (
    <div>
      <Checkbox
        classNames={{
          label: cn('text-ash-text font-light'),
        }}
        // defaultSelected
        color="secondary"
        onSelect={() => {}}
      >
        {label}
      </Checkbox>
    </div>
  );
};

export default CustomCheckbox;
