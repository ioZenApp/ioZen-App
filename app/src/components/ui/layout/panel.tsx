import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type PanelProps = HTMLAttributes<HTMLDivElement>;

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'bg-card border border-border rounded-lg overflow-hidden',
                    className
                )}
                {...props}
            />
        );
    }
);

Panel.displayName = 'Panel';

export type PanelHeaderProps = HTMLAttributes<HTMLDivElement>;

export const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'px-6 py-5 border-b border-border',
                    className
                )}
                {...props}
            />
        );
    }
);

PanelHeader.displayName = 'PanelHeader';

export type PanelBodyProps = HTMLAttributes<HTMLDivElement>;

export const PanelBody = forwardRef<HTMLDivElement, PanelBodyProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('px-6 py-6', className)}
                {...props}
            />
        );
    }
);

PanelBody.displayName = 'PanelBody';
