import { Spinner } from '@nextui-org/react';

interface ILoadingButtonComponent {
  onclick: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: string;
  color?: string;
  loaderPos?: string;
  type?: 'button' | 'submit';
  label: string | React.ReactNode;
}

const LoadingButtonComponent = ({
  onclick,
  loading,
  disabled,
  style = 'w-[142px] h-[50px]',
  color = 'bg-primary-green border-primary-green',
  label,
  type = 'button',
}: ILoadingButtonComponent) => {
  return (
    <button
      onClick={onclick}
      disabled={disabled || loading}
      type={type}
      className={`
      ${style} ${
        disabled ? 'bg-gray-400 border-gray-400 text-gray-600' : color
      } hover:shadow transition-all border mt-auto rounded-[5px] ${loading} disabled:cursor-not-allowed font-normal`}>
      {loading ? (
        <div className="w-fit pt-1 m-auto">
          <Spinner color="current" size="sm" />
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default LoadingButtonComponent;
