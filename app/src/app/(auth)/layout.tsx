import { type ReactNode } from 'react';
import { Navigation } from '@/components/layout';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main>{children}</main>
        </div>
    );
}
