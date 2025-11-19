import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, size = 'xl', children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'w-full mx-auto px-6',
                    sizeClasses[size],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Container.displayName = 'Container';
