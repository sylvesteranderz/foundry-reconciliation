import { parseCurrency, parseToMoney } from '@/utils/helpers';
// import CustomCircularProgress from "./circular.progress";

interface InfoWithProgressCardProps {
  value: number;
  title1: string;
  title2: string;
  ownerName: string;
  currency: string;
  amount: number;
  closing_date: string;
  ai_closing_date: string;
}

const InfoWithProgressCard = ({
  value,
  title1,
  title2,
  ownerName,
  currency,
  amount,
  closing_date,
  ai_closing_date,
}: InfoWithProgressCardProps) => {
  return (
    <div className="dark:bg-[#161616] bg-[#25252507] shadow-sm border dark:border-none p-3 rounded-xl flex justify-between w-full">
      <div>
        <h1 className="text-[15px] leading-5">{title1}</h1>
        <h2 className="text-[14px] leading-5">{title2}</h2>

        <h1 className="leading-4 text-[13.5px] dark:dark:text-[#929292] text-gray-600 font-medium mt-1 whitespace-nowrap">
          Assigned to: {ownerName}
        </h1>

        <div className="text-[15px] my-7">
          <div className="flex items-center gap-1">
            <p>Close Date:</p>
            <p>{closing_date}</p>
          </div>
          <div className="flex items-center gap-1">
            <p>AI Close Date:</p>
            <p>{ai_closing_date}</p>
          </div>
        </div>

        <h1 className="mb-2">
          {parseCurrency(currency)} {parseToMoney(amount)}
        </h1>
      </div>
      {/* <CustomCircularProgress
        width="w-[50px]"
        value={value}
        text={String(value)}
      /> */}
    </div>
  );
};

export default InfoWithProgressCard;
