import { type HTMLAttributes, forwardRef } from 'react';
import { Hash, Calendar, Mail, Type, ToggleLeft, Image as ImageIcon, X, FileText, Phone, Link as LinkIcon, List } from 'lucide-react';
import { cn } from '@/lib/utils';

const fieldTypeIcons = {
    text: Hash,
    number: Hash,
    email: Mail,
    date: Calendar,
    boolean: ToggleLeft,
    long_text: Type,
    textarea: FileText,
    image: ImageIcon,
    file: ImageIcon,
    phone: Phone,
    url: LinkIcon,
    select: List,
};

interface FieldItemProps extends HTMLAttributes<HTMLDivElement> {
    field: {
        name: string;
        label: string;
        type: string;
        required: boolean;
        placeholder?: string;
    };
    onEdit?: () => void;
    onDelete?: () => void;
}

export const FieldItem = forwardRef<HTMLDivElement, FieldItemProps>(
    ({ className, field, onEdit, onDelete, ...props }, ref) => {
        const Icon = fieldTypeIcons[field.type as keyof typeof fieldTypeIcons] || Hash;

        return (
            <div
                ref={ref}
                className={cn(
                    'flex items-center gap-4 p-4',
                    'bg-card border border-border rounded-md',
                    'transition-all duration-200',
                    'hover:bg-accent hover:border-primary',
                    className
                )}
                {...props}
            >
                {/* Icon */}
                <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold truncate">
                            {field.label}
                        </h4>
                        {field.required && (
                            <span className="text-xs text-destructive">*</span>
                        )}
                    </div>
                    <p className="text-xs font-mono text-muted-foreground truncate">
                        {field.name}
                    </p>
                </div>

                {/* Type Badge */}
                <div className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground flex-shrink-0">
                    {field.type}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {onEdit && (
                        <button
                            onClick={onEdit}
                            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                            aria-label="Edit field"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={onDelete}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted rounded transition-colors"
                            aria-label="Delete field"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        );
    }
);

FieldItem.displayName = 'FieldItem';
