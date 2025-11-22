import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

export const buttonVariants = cva(
    'inline-flex items-center justify-center font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]',
                secondary: 'bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80',
                outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                icon: 'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]',
                default: 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]',
            },
            size: {
                sm: 'h-9 px-3 text-sm rounded-md',
                md: 'h-10 px-4 text-sm rounded-md',
                lg: 'h-11 px-6 text-base rounded-md',
                icon: 'h-9 w-9 rounded-sm',
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
