import { Icon } from '@iconify/react/dist/iconify.js';

interface IStatusText {
  text: string;
}

const OpportunityStatusText = ({ text }: IStatusText) => {
  const scheme = (status: string) => {
    return status.toLowerCase() === 'open'
      ? {
          icon: 'ic:round-check-circle',
          color: 'text-green-500 bg-green-200/10 border-green-500',
        }
      : status.toLowerCase() === 'closed'
      ? {
          icon: 'ic:round-check-circle',
          color: 'text-gray-500 bg-gray-200/10 border-gray-500',
        }
      : status.toLowerCase() === 'converted'
      ? {
          icon: 'ic:round-check-circle',
          color: 'text-sky-500 bg-sky-200/10 border-sky-500',
        }
      : status.toLowerCase() === 'quotation'
      ? {
          icon: 'ic:round-check-circle',
          color: 'text-amber-500 bg-amber-200/10 border-amber-500',
        }
      : status.toLowerCase() === 'lost'
      ? {
          icon: 'jam:close-circle-f',
          color: 'text-red-500 bg-red-200/10 border-red-500',
        }
      : {
          icon: 'ph:warning-circle-fill',
          color: 'text-gray-500 bg-gray-200/10 border-gray-500',
        };
  };

  return text ? (
    <div
      className={`flex flex-row gap-x-2 items-center ${
        scheme(text).color
      } pl-2 pr-4 py-1 rounded-full border-1 w-fit h-fit text-xs capitalize`}>
      <Icon icon={scheme(text).icon} />
      <p>{String(text).replaceAll('_', ' ')}</p>
    </div>
  ) : (
    <p></p>
  );
};

export default OpportunityStatusText;
