import { type HTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    action?: ReactNode;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
    ({ className, title, description, action, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('flex items-center justify-between mb-8', className)}
                {...props}
            >
                <div>
                    <h1 className="page-title">{title}</h1>
                    {description && (
                        <p className="secondary-text mt-1">{description}</p>
                    )}
                </div>
                {action && <div>{action}</div>}
            </div>
        );
    }
);

PageHeader.displayName = 'PageHeader';
