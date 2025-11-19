import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
    'inline-flex items-center justify-center font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                primary: 'bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] hover:bg-[var(--button-primary-hover)] active:scale-[0.98]',
                secondary: 'bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] border border-[var(--button-secondary-border)] hover:bg-[var(--button-secondary-hover)]',
                outline: 'border border-neutral-800 bg-transparent text-neutral-400 hover:bg-neutral-900 hover:text-white',
                ghost: 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--background-tertiary)]',
                icon: 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--background-tertiary)] hover:text-[var(--text-primary)]',
            },
            size: {
                sm: 'h-9 px-3 text-sm rounded-[var(--radius-md)]',
                md: 'h-10 px-4 text-sm rounded-[var(--radius-md)]',
                lg: 'h-11 px-6 text-base rounded-[var(--radius-md)]',
                icon: 'h-9 w-9 rounded-[var(--radius-sm)]',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
    asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, loading, asChild = false, children, disabled, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                ref={ref}
                className={cn(buttonVariants({ variant, size, className }))}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <>
                        <span className="animate-spin mr-2">⏳</span>
                        {children}
                    </>
                ) : (
                    children
                )}
            </Comp>
        );
    }
);

Button.displayName = 'Button';
