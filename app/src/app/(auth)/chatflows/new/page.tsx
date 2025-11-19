'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Container, PageHeader } from '@/components/layout';
import { Button, Textarea, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

export default function NewChatflowPage() {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!description.trim()) {
            setError('Please enter a description');
            return;
        }

        setIsGenerating(true);
        setError('');

        try {
            const response = await fetch('/api/chatflows/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate chatflow');
            }

            const data = await response.json();

            // Redirect to the chatflow configuration page
            router.push(`/chatflows/${data.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setIsGenerating(false);
        }
    };

    return (
        <Container size="md" className="py-10">
            <div className="mb-6">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </Button>
            </div>

            <PageHeader
                title="Create Chatflow"
                description="Describe your chatflow and let AI generate the structure for you"
            />

            <Card>
                <CardHeader>
                    <CardTitle>Describe Your Chatflow</CardTitle>
                    <CardDescription>
                        Tell us what information you want to collect. For example: "Create an insurance claim chatflow with policy number, incident date, and description"
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Textarea
                            placeholder="Example: Create a customer support chatflow that collects name, email, issue category, and detailed description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={6}
                            error={error}
                            disabled={isGenerating}
                        />

                        <div className="flex justify-end gap-3">
                            <Button
                                variant="secondary"
                                onClick={() => router.push('/dashboard')}
                                disabled={isGenerating}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleGenerate}
                                loading={isGenerating}
                                disabled={!description.trim() || isGenerating}
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                {isGenerating ? 'Generating...' : 'Generate Chatflow'}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Example prompts */}
            <div className="mt-8">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                    Example Prompts
                </h3>
                <div className="grid gap-3">
                    {[
                        'Create an insurance claim chatflow with policy number, incident date, description, and damage photos',
                        'Build a customer support form that collects name, email, issue category, priority level, and detailed description',
                        'Make a lead generation chatflow for a real estate business with name, email, phone, budget range, and preferred location',
                    ].map((example, index) => (
                        <button
                            key={index}
                            onClick={() => setDescription(example)}
                            disabled={isGenerating}
                            className="text-left p-4 bg-[var(--background-secondary)] border border-[var(--border-primary)] rounded-[var(--radius-md)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-focus)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {example}
                        </button>
                    ))}
                </div>
            </div>
        </Container>
    );
}
