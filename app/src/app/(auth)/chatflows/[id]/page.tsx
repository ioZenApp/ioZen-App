'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Container, PageHeader } from '@/components/layout';
import { Button, Tabs, TabsList, TabsTrigger, TabsContent, Panel, PanelHeader, PanelBody } from '@/components/ui';
import { FieldItem } from '@/components/chatflow/field-item';

interface ChatflowField {
    name: string;
    label: string;
    type: string;
    required: boolean;
    placeholder?: string;
}

interface Chatflow {
    id: string;
    name: string;
    description: string | null;
    schema: {
        name: string;
        fields: ChatflowField[];
    };
    status: string;
    shareUrl: string;
}

export default function ChatflowConfigPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [chatflow, setChatflow] = useState<Chatflow | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('configuration');
    const [publishing, setPublishing] = useState(false);

    useEffect(() => {
        // TODO: Fetch chatflow from API
        // For now, using mock data
        setTimeout(() => {
            setChatflow({
                id: params.id,
                name: 'Insurance Claim Bot',
                description: 'Create an insurance claim chatflow',
                schema: {
                    name: 'Insurance Claim Bot',
                    fields: [
                        { name: 'policyNumber', label: 'Policy Number', type: 'text', required: true },
                        { name: 'incidentDate', label: 'Date of Incident', type: 'date', required: true },
                        { name: 'description', label: 'Incident Description', type: 'long_text', required: true },
                        { name: 'damagePhotos', label: 'Damage Photos', type: 'image', required: false },
                    ],
                },
                status: 'DRAFT',
                shareUrl: 'claim-abc123',
            });
            setLoading(false);
        }, 500);
    }, [params.id]);

    const handlePublish = async () => {
        setPublishing(true);
        try {
            // TODO: Call API to publish chatflow
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to publish:', error);
            setPublishing(false);
        }
    };

    if (loading) {
        return (
            <Container className="py-10">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin text-4xl">⏳</div>
                </div>
            </Container>
        );
    }

    if (!chatflow) {
        return (
            <Container className="py-10">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                        Chatflow not found
                    </h2>
                    <Button asChild>
                        <Link href="/dashboard">Back to Dashboard</Link>
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-10">
            <div className="mb-6">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </Button>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="page-title">Configure Fields</h1>
                    <p className="secondary-text mt-1">
                        Review and edit the generated fields for your chatflow
                    </p>
                </div>
                <Button variant="secondary" onClick={() => router.push('/dashboard')}>
                    Cancel
                </Button>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex justify-center">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="configuration">Configuration</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Configuration Tab */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="configuration">
                    <Panel>
                        <PanelHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="section-heading">Field Configuration</h2>
                                    <p className="secondary-text mt-1">
                                        Review and edit the generated fields.
                                    </p>
                                </div>
                                <Button variant="secondary" size="sm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Field
                                </Button>
                            </div>
                        </PanelHeader>
                        <PanelBody>
                            <div className="space-y-3">
                                {chatflow.schema.fields.map((field, index) => (
                                    <FieldItem
                                        key={index}
                                        field={field}
                                        onEdit={() => console.log('Edit', field.name)}
                                        onDelete={() => console.log('Delete', field.name)}
                                    />
                                ))}
                            </div>
                        </PanelBody>
                    </Panel>
                </TabsContent>

                {/* Preview Tab */}
                <TabsContent value="preview">
                    <Panel>
                        <PanelHeader>
                            <div className="flex items-center justify-between">
                                <h2 className="section-heading">Preview</h2>
                                <Button variant="ghost" size="sm">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share Link
                                </Button>
                            </div>
                        </PanelHeader>
                        <PanelBody>
                            <div className="max-w-2xl mx-auto">
                                {/* Chat Preview */}
                                <div className="bg-[#050505] rounded-[var(--radius-md)] p-6 min-h-[400px] flex flex-col">
                                    <div className="flex-1 mb-4">
                                        <div className="mb-4">
                                            <div className="w-8 h-8 bg-[var(--background-tertiary)] rounded-full mb-2" />
                                            <div className="bg-[var(--background-tertiary)] p-3 rounded-[var(--radius-md)] inline-block">
                                                <p className="text-sm text-[var(--text-primary)]">
                                                    Hi! I'll help you complete this chatflow. Let's start with your policy number.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            placeholder="Type your message..."
                                            className="flex-1 px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[var(--radius-md)] text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-[var(--input-focus)]"
                                            disabled
                                        />
                                        <button className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50" disabled>
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-center">
                                    <Button onClick={handlePublish} loading={publishing} size="lg">
                                        Publish Chatflow
                                    </Button>
                                </div>
                            </div>
                        </PanelBody>
                    </Panel>
                </TabsContent>
            </Tabs>
        </Container>
    );
}
