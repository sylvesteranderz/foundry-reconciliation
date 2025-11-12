/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils';
import { IconProps } from '@iconify/react/dist/iconify.js';
import { FC } from 'react';

interface CardComponentProps {
  children: React.ReactNode;
  titleText?: string;
  titleSpanText?: string;
  borderColor: string;
  icon: React.ReactElement<
    IconProps,
    string | React.JSXElementConstructor<any>
  >;
  mainText: string;
  subMainText?: string;
  titleSpanClassName?: string;
}

const CardComponent: FC<CardComponentProps> = ({
  children,
  borderColor,
  icon,
  mainText,
  subMainText,
  titleText,
  titleSpanText,
  titleSpanClassName,
}) => {
  return (
    <div
      style={{ borderColor: borderColor }}
      className={`flex flex-col p-2 rounded-xl w-full dark:bg-[#161616] bg-[#25252507] shadow border dark:border-none`}>
      <p className="text-[12px] uppercase ml-auto">
        {titleText}{' '}
        <span
          className={cn(
            `dark:text-[#929292] text-gray-600`,
            titleSpanClassName
          )}>
          {titleSpanText}
        </span>
      </p>

      <div className="flex items-center gap-1 my-2">
        {icon}
        <div>
          <h1 className="text-sm leading-4">{mainText}</h1>
          <h2 className="text-[12px] dark:text-[#929292] text-gray-600 text-left">
            {subMainText}
          </h2>
        </div>
      </div>

      <div className="text-[12px]">{children}</div>
    </div>
  );
};

export default CardComponent;
