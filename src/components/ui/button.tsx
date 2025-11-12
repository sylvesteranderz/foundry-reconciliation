/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-[12.5px] font-medium ring-offset-white transition-colors focus-visible:outline-none  disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-slate-50 hover:bg-slate-900/90',
        destructive: 'bg-red-500 text-slate-50 hover:bg-red-500/90 ',
        outline:
          'border border-slate-200 bg-white dark:bg-black/10 hover:bg-slate-100 hover:dark:bg-black/40 hover:text-slate-900  hover:dark:text-white/80 ',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 border hover:shadow-sm',
        ghost:
          'dark:hover:bg-slate-100 hover:bg-slate-100 dark:hover:text-slate-900 ',
        link: 'text-slate-900 underline-offset-4 hover:underline ',
        custom: 'bg-[#2E2F2F] text-white hover:bg-[#2E2F2F]/90',
        customRomantic:
          'dark:bg-[#619B7D] bg-black/90 text-white dark:text-black hover:opacity-90 hover:dark:bg-[#619B7D]/80',
        customInput:
          'dark:border-[#F5F5F580] border dark:bg-[#161616] bg-gray-100/80',
        noBackgroundVariant:
          'border-[#619B7D] border-2 bg-transparent text-[#619B7D] hover:opacity-80',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        xs: 'h-7 rounded-md px-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
