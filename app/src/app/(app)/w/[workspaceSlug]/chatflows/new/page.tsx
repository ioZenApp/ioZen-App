"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { Card } from "@/ui/data-display";
import { Textarea } from "@/ui/forms";
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { toast } from "sonner";
import { generateChatflowAction } from "@/app/actions/chatflow";
import { Container, PageHeader } from "@/components/layout";

export default function CreateChatflowPage() {
    const params = useParams();
    const router = useRouter();
    const workspaceSlug = params.workspaceSlug as string;

    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        try {
            const formData = new FormData();
            formData.append('description', prompt);
            formData.append('workspaceSlug', workspaceSlug);

            const result = await generateChatflowAction(formData);

            if (result.success) {
                toast.success("Chatflow generated successfully!");
                router.push(`/w/${workspaceSlug}/chatflows/${result.chatflowId}`);
            } else {
                toast.error(result.error || "Failed to generate chatflow");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSkip = async () => {
        // Create a blank chatflow?
        // We can reuse the action with a generic description or create a specific "create blank" action.
        // For now, let's use the generate action with a generic prompt to get a basic structure,
        // or we could add a separate "createBlank" action.
        // To keep it simple and reuse existing logic, I'll send a generic prompt.
        // Or better, I'll just use a "Blank Chatflow" description which the AI might handle or we can handle in action.
        // Actually, the plan didn't specify "Skip" behavior in detail, but `AdminView` had `onSkip` which just went to edit with empty schema.
        // But here we need a DB record to edit.
        // So we MUST create a record.
        // I'll use the same action with a default prompt like "A blank contact form".

        setIsGenerating(true);
        try {
            const formData = new FormData();
            formData.append('description', "Create a simple contact form with name, email and message.");
            formData.append('workspaceSlug', workspaceSlug);

            const result = await generateChatflowAction(formData);
            if (result.success) {
                router.push(`/w/${workspaceSlug}/chatflows/${result.chatflowId}`);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Container>
            <PageHeader
                title="Create New Chatflow"
                description="Use AI to generate a form structure or start from scratch."
                backUrl={`/w/${workspaceSlug}/dashboard`}
            />

            <div className="max-w-3xl mx-auto mt-8">
                <Card>
                    <div className="flex flex-col items-center justify-center p-8 sm:p-12">
                        <div className="w-full max-w-2xl space-y-8">
                            {/* Icon and Header */}
                            <div className="space-y-4 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                                    <Sparkles className="h-8 w-8 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold tracking-tight">Describe your ideal chatflow</h2>
                                    <p className="text-muted-foreground max-w-md mx-auto">
                                        Our AI will generate the perfect structure for your needs. You can customize it later.
                                    </p>
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="space-y-4">
                                <Textarea
                                    placeholder="e.g. I need a chatflow for collecting car insurance claims. It should ask for policy number, incident date, and photos of the damage."
                                    className="min-h-[120px] resize-none"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                                <div className="flex flex-col gap-3">
                                    <Button
                                        onClick={handleGenerate}
                                        disabled={isGenerating || !prompt.trim()}
                                        size="lg"
                                        className="w-full"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Generating Structure...
                                            </>
                                        ) : (
                                            <>
                                                Generate with AI
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={handleSkip}
                                        disabled={isGenerating}
                                    >
                                        Skip and use default template
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Container>
    );
}

