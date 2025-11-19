import { type ReactNode } from 'react';
import { Navigation } from '@/components/layout';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[var(--background-primary)]">
            <Navigation />
            <main>{children}</main>
        </div>
    );
}
