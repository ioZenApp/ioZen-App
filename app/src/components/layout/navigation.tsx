'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/preview', label: 'Preview Chat' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/settings', label: 'Settings' },
];

const secondaryLinks = [
    { href: '/feedback', label: 'Feedback' },
    { href: '/changelog', label: 'Changelog' },
    { href: '/help', label: 'Help' },
    { href: '/docs', label: 'Docs' },
];

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="h-16 border-b border-[var(--border-primary)] bg-[var(--background-primary)]">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <span className="text-2xl font-bold">iO</span>
                        <span className="text-xl font-light">zen</span>
                    </Link>
                </div>

                {/* Center: Primary Navigation */}
                <div className="flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'px-4 py-2 text-sm font-medium transition-colors rounded-md',
                                    'relative',
                                    isActive
                                        ? 'text-[var(--text-primary)]'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                )}
                            >
                                {link.label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--text-primary)]" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Right: Secondary Links + User Menu */}
                <div className="flex items-center gap-4">
                    {secondaryLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button
                        className="w-10 h-10 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)] flex items-center justify-center hover:bg-[var(--border-primary)] transition-colors"
                        aria-label="User menu"
                    >
                        <User className="w-5 h-5 text-[var(--text-secondary)]" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
