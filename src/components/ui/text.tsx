import { cn } from '@/lib/utils';
import React from 'react';
interface TextProps {
  as?: React.ElementType;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  children: React.ReactNode;
  className?: string;
}

const baseStyles: Record<TextProps['variant'], string> = {
  h1: 'scroll-m-20 text-4xl font-black tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 pb-2 text-3xl font-extrabold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-bold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'scroll-m-20 text-lg font-medium tracking-tight',
  h6: 'scroll-m-20 text-base font-normal tracking-tight',
  p: 'leading-7',
};
const CustomText: React.FC<TextProps> = ({
  as: Component = 'p',
  variant = 'p',
  children,
  className,
}) => {
  return (
    <Component className={cn(baseStyles[variant], className)}>
      {children}
    </Component>
  );
};

export default CustomText;
