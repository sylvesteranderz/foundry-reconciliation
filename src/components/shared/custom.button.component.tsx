import { Icon } from '@iconify/react/dist/iconify.js';

interface ICustomButtonComponent {
  type?: 'submit' | 'button';
  loading?: boolean;
  disabled?: boolean;
  label: string;
  style?: string;
  onclick: () => void;
}

const CustomButtonComponent = ({
  type = 'button',
  style = 'w-full h-[50px] bg-secondary text-white rounded-[6px]',
  loading,
  disabled,
  onclick,
  label,
}: ICustomButtonComponent) => {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onclick}
      className={`${style} flex-shrink-0 disabled:bg-gray-200/60 disabled:border-gray-200 disabled:text-gray-500 grid`}>
      {loading ? (
        <Icon
          icon="eos-icons:loading"
          className="text-[30px] m-auto text-gray-600"
        />
      ) : (
        <p className="m-auto text-sm">{label}</p>
      )}
    </button>
  );
};

export default CustomButtonComponent;
