'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, MessageSquare } from 'lucide-react';
import { Container, PageHeader } from '@/components/layout';
import { Button, Input, Badge } from '@/components/ui';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui';

// Mock data - will be replaced with real data from API
const mockChatflows = [
    {
        id: 'dmrlp9',
        name: 'Insurance Claim Bot',
        submissions: 124,
        lastUpdated: '2m ago',
        status: 'active' as const,
    },
    {
        id: 'p3aza7',
        name: 'Customer Support V1',
        submissions: 0,
        lastUpdated: '1h ago',
        status: 'building' as const,
    },
    {
        id: '4k0do',
        name: 'Lead Gen Form',
        submissions: 892,
        lastUpdated: '2d ago',
        status: 'active' as const,
    },
];

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChatflows = mockChatflows.filter((chatflow) =>
        chatflow.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container className="py-10">
            <PageHeader
                title="Chatflows"
                action={
                    <Button asChild>
                        <Link href="/chatflows/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Chatflow
                        </Link>
                    </Button>
                }
            />

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
                    <Input
                        type="text"
                        placeholder="Search chatflows..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-11"
                    />
                </div>
                <select className="px-4 py-3 text-sm bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] rounded-[var(--radius-md)] focus:outline-none focus:border-[var(--input-focus)]">
                    <option>All Environments</option>
                    <option>Production</option>
                    <option>Development</option>
                </select>
            </div>

            {/* Chatflows Table */}
            {filteredChatflows.length === 0 ? (
                <div className="text-center py-16">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-[var(--text-tertiary)]" />
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                        {searchQuery ? 'No chatflows found' : 'No chatflows yet'}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-6">
                        {searchQuery
                            ? 'Try adjusting your search'
                            : 'Get started by creating your first chatflow'}
                    </p>
                    {!searchQuery && (
                        <Button asChild>
                            <Link href="/chatflows/new">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Chatflow
                            </Link>
                        </Button>
                    )}
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Submissions</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredChatflows.map((chatflow) => (
                            <TableRow key={chatflow.id} clickable>
                                <TableCell>
                                    <Link
                                        href={`/chatflows/${chatflow.id}`}
                                        className="flex items-center gap-3 hover:text-[var(--text-primary)]"
                                    >
                                        <div className="w-10 h-10 bg-[var(--background-tertiary)] rounded-md flex items-center justify-center">
                                            <MessageSquare className="w-5 h-5 text-[var(--text-secondary)]" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-[var(--text-primary)]">
                                                {chatflow.name}
                                            </div>
                                            <div className="text-xs text-[var(--text-tertiary)] font-mono">
                                                id: {chatflow.id}
                                            </div>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-[var(--text-tertiary)]" />
                                        <span>{chatflow.submissions}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-[var(--text-secondary)]">
                                        {chatflow.lastUpdated}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={chatflow.status}>{chatflow.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Container>
    );
}
