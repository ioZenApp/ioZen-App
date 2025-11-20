"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChatView } from "@/components/dashboard/chat-view";
import {
    Plus, Search, MessageSquare, LayoutTemplate, ArrowRight, Sparkles,
    Loader2, Check, ExternalLink, PlayCircle, Settings2, Hash, Calendar,
    Type, ImageIcon, X, ChevronLeft, FileText, MoreHorizontal, ChevronDown, Save,
    Mail, Phone, List, ToggleLeft, Trash2, GripVertical
} from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FieldEditor } from "@/components/dashboard/field-details-panel";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type ViewState = 'list' | 'create' | 'edit' | 'success' | 'submissions';

export function AdminView() {
    const [view, setView] = useState<ViewState>('list');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedChatflowId, setSelectedChatflowId] = useState<string | null>(null);
    const [generatedSchema, setGeneratedSchema] = useState<any>(null);
    const [publishedUrl, setPublishedUrl] = useState<string>("");
    const [chatflows, setChatflows] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchChatflows = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/chatflow');
            if (response.ok) {
                const data = await response.json();
                setChatflows(data.chatflows);
            }
        } catch (error) {
            console.error("Failed to fetch chatflows", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (view === 'list') {
            fetchChatflows();
        }
    }, [view]);

    const handleGenerate = async (prompt: string) => {
        // Clear any previous state
        setGeneratedSchema(null);
        setSelectedChatflowId(null);

        setIsGenerating(true);
        try {
            // Start workflow
            const response = await fetch('/api/chatflow/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: prompt }),
            });

            if (!response.ok) throw new Error('Generation failed to start');

            const { workflowId } = await response.json();

            // Poll for results
            const pollInterval = 1000;
            const maxAttempts = 60; // 1 minute timeout
            let attempts = 0;

            while (attempts < maxAttempts) {
                const statusResponse = await fetch(`/api/chatflow/generate/${workflowId}`);
                if (!statusResponse.ok) throw new Error('Polling failed');

                const statusData = await statusResponse.json();

                if (statusData.status === 'completed') {
                    setGeneratedSchema(statusData.result);
                    setView('edit');
                    return;
                }

                // If failed or other terminal state
                if (statusData.status === 'failed') {
                    throw new Error('Workflow failed');
                }

                await new Promise(resolve => setTimeout(resolve, pollInterval));
                attempts++;
            }

            throw new Error('Generation timed out');

        } catch (error) {
            console.error(error);
            // TODO: Show error toast
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePublish = (url: string) => {
        setPublishedUrl(url);
        setView('success');
    };

    const handleSelectChatflow = (id: string) => {
        setSelectedChatflowId(id);
        setGeneratedSchema(null); // Clear generated schema when editing existing
        setView('edit');
    };

    const handleViewSubmissions = (id: string) => {
        setSelectedChatflowId(id);
        setView('submissions');
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
                    {view === 'list' && "Chatflows"}
                    {view === 'create' && "Create New Chatflow"}
                    {view === 'edit' && "Configure Fields"}
                    {view === 'success' && "Chatflow Published"}
                    {view === 'submissions' && "Submissions"}
                </h1>
                {view === 'list' && (
                    <Button onClick={() => setView('create')} className="bg-white text-black hover:bg-neutral-200 w-full md:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Chatflow
                    </Button>
                )}
                {view === 'submissions' && (
                    <Button variant="ghost" onClick={() => setView('list')} className="text-neutral-400 hover:text-white w-full md:w-auto justify-start md:justify-center">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Chatflows
                    </Button>
                )}
                {view !== 'list' && view !== 'success' && view !== 'submissions' && (
                    <Button variant="ghost" onClick={() => setView('list')} className="text-neutral-400 hover:text-white w-full md:w-auto justify-start md:justify-center">
                        Cancel
                    </Button>
                )}
            </div>

            {view === 'list' && <ChatflowList chatflows={chatflows} isLoading={isLoading} onSelectChatflow={handleSelectChatflow} onViewSubmissions={handleViewSubmissions} onCreate={() => setView('create')} />}
            {view === 'create' && <CreateChatflow onGenerate={handleGenerate} onSkip={() => { setGeneratedSchema(null); setView('edit'); }} isGenerating={isGenerating} />}
            {view === 'edit' && <EditFields onPublish={handlePublish} chatflowId={selectedChatflowId} initialSchema={generatedSchema} />}
            {view === 'success' && <SuccessView url={publishedUrl} onBack={() => setView('list')} />}
            {view === 'submissions' && <SubmissionsList chatflowId={selectedChatflowId} />}
        </div>
    );
}

function ChatflowList({ chatflows, isLoading, onSelectChatflow, onViewSubmissions, onCreate }: { chatflows: any[], isLoading: boolean, onSelectChatflow: (id: string) => void, onViewSubmissions: (id: string) => void, onCreate: () => void }) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {/* Search Skeleton */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                    <Skeleton className="h-10 w-full md:w-[384px] bg-neutral-900" />
                </div>

                {/* Table Skeleton */}
                <div className="rounded-lg border border-neutral-800 bg-black overflow-hidden">
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-neutral-800">
                        <Skeleton className="col-span-4 h-4 w-20 bg-neutral-900" />
                        <Skeleton className="col-span-3 h-4 w-24 bg-neutral-900" />
                        <Skeleton className="col-span-3 h-4 w-24 bg-neutral-900" />
                        <Skeleton className="col-span-2 h-4 w-16 bg-neutral-900 ml-auto" />
                    </div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col md:grid md:grid-cols-12 gap-4 p-4 items-center border-b border-neutral-800 last:border-0">
                            <div className="w-full md:col-span-4 flex items-center gap-3">
                                <Skeleton className="h-8 w-8 rounded bg-neutral-900" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-32 bg-neutral-900" />
                                    <Skeleton className="h-3 w-20 bg-neutral-900" />
                                </div>
                            </div>
                            <Skeleton className="w-full md:col-span-3 h-4 w-16 bg-neutral-900" />
                            <Skeleton className="w-full md:col-span-3 h-4 w-24 bg-neutral-900" />
                            <div className="hidden md:flex col-span-2 justify-end">
                                <Skeleton className="h-5 w-16 rounded-full bg-neutral-900" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (chatflows.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] bg-black border border-neutral-800 rounded-lg space-y-4 text-center p-8">
                <div className="h-16 w-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <LayoutTemplate className="h-8 w-8 text-neutral-600" />
                </div>
                <div className="space-y-2 max-w-sm">
                    <h3 className="text-lg font-semibold text-neutral-200">No chatflows yet</h3>
                    <p className="text-neutral-500">
                        Create your first AI-powered chatflow to start collecting data from your users.
                    </p>
                </div>
                <Button onClick={onCreate} className="bg-white text-black hover:bg-neutral-200">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Chatflow
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                <div className="relative flex-1 max-w-full md:max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input
                        placeholder="Search chatflows..."
                        className="pl-9 bg-black border-neutral-800 focus-visible:ring-neutral-700"
                    />
                </div>
            </div>

            {/* Chatflows Table */}
            <div className="rounded-lg border border-neutral-800 bg-black overflow-hidden">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-neutral-800 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-3">Submissions</div>
                    <div className="col-span-3">Last Updated</div>
                    <div className="col-span-2 text-right">Status</div>
                </div>

                {/* Rows */}
                {chatflows.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => onSelectChatflow(item.id)}
                        className="flex flex-col md:grid md:grid-cols-12 gap-4 p-4 items-start md:items-center hover:bg-neutral-900 transition-colors border-b border-neutral-800 last:border-0 group cursor-pointer"
                    >
                        {/* Name */}
                        <div className="w-full md:w-auto md:col-span-4 flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0 group-hover:border-neutral-600 transition-colors">
                                <LayoutTemplate className="h-4 w-4 text-neutral-400 group-hover:text-neutral-300 transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-neutral-200 group-hover:text-white transition-colors truncate">{item.name}</div>
                                <div className="text-xs text-neutral-500 font-mono">{item.id}</div>
                            </div>
                            {/* Mobile status badge */}
                            <div className="md:hidden">
                                <Badge variant="outline" className={`
                  ${item.status === 'Active' ? 'text-green-500 bg-green-500/10 border-green-500/20' : ''}
                  ${item.status === 'Building' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' : ''}
                `}>
                                    {item.status}
                                </Badge>
                            </div>
                        </div>

                        {/* Submissions */}
                        <div className="w-full md:w-auto md:col-span-3 flex items-center justify-between md:justify-start gap-2">
                            <span className="md:hidden text-sm text-neutral-500">Submissions:</span>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onViewSubmissions(item.id);
                                }}
                                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-800 transition-colors text-neutral-400 group-hover:text-white cursor-pointer"
                            >
                                <MessageSquare className="h-4 w-4" />
                                <span className="text-sm font-medium">{item.submissions}</span>
                                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        {/* Last Updated */}
                        <div className="w-full md:w-auto md:col-span-3 text-sm text-neutral-500 flex justify-between md:block">
                            <span className="md:hidden">Last Updated:</span>
                            {item.date}
                        </div>

                        {/* Desktop Status */}
                        <div className="hidden md:flex col-span-2 justify-end">
                            <Badge variant="outline" className={`
                ${item.status === 'Active' ? 'text-green-500 bg-green-500/10 border-green-500/20' : ''}
                ${item.status === 'Building' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' : ''}
              `}>
                                {item.status}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CreateChatflow({ onGenerate, onSkip, isGenerating }: { onGenerate: (prompt: string) => void, onSkip: () => void, isGenerating: boolean }) {
    const [prompt, setPrompt] = useState("");

    return (
        <div className="max-w-3xl mx-auto">
            <Card className="bg-black border-neutral-800 relative overflow-hidden transition-colors duration-300 hover:border-neutral-700">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

                <div className="flex flex-col items-center justify-center min-h-[400px] max-w-2xl mx-auto text-center space-y-8 animate-in zoom-in-95 duration-500 p-8">
                    <div className="space-y-4">
                        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center mx-auto shadow-2xl shadow-blue-900/20 transition-transform duration-500 hover:scale-110 hover:rotate-3">
                            <Sparkles className="h-10 w-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-semibold tracking-tight">Describe your ideal chatflow</h2>
                        <p className="text-neutral-400 max-w-md mx-auto">
                            Our AI will generate the perfect structure for your needs. You can customize it later.
                        </p>
                    </div>

                    <div className="w-full space-y-4">
                        <Textarea
                            placeholder="e.g. I need a chatflow for collecting car insurance claims. It should ask for policy number, incident date, and photos of the damage."
                            className="min-h-[120px] bg-neutral-900 border-neutral-800 text-lg p-4 resize-none focus-visible:ring-blue-600 transition-shadow duration-200 focus:shadow-lg focus:shadow-blue-900/20"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={() => onGenerate(prompt)}
                                disabled={isGenerating || !prompt.trim()}
                                size="lg"
                                className="w-full bg-white text-black hover:bg-neutral-200 font-medium h-12 text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
                                onClick={onSkip}
                                className="text-neutral-500 hover:text-neutral-300"
                            >
                                Skip and start from scratch
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

function SortableFieldItem({
    field,
    isSelected,
    onSelect,
    getIconForType
}: {
    field: any,
    isSelected: boolean,
    onSelect: () => void,
    getIconForType: (type: string) => any
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const Icon = getIconForType(field.type);

    return (
        <div ref={setNodeRef} style={style} className="mb-1.5">
            <button
                onClick={onSelect}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 group relative ${isSelected
                    ? 'bg-blue-500/10 border-blue-500/50 shadow-sm'
                    : 'bg-neutral-950/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50'
                    }`}
            >
                <div className="flex items-center gap-3">
                    {/* Drag Handle */}
                    <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 hover:bg-neutral-900 rounded text-neutral-600 hover:text-neutral-400" onClick={(e) => e.stopPropagation()}>
                        <GripVertical className="h-4 w-4" />
                    </div>

                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isSelected
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'bg-neutral-900 border border-neutral-800'
                        }`}>
                        <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-400' : 'text-neutral-400'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm ${isSelected ? 'text-blue-100' : 'text-neutral-200'}`}>
                            {field.label}
                        </div>
                        <div className="text-xs text-neutral-500 font-mono truncate mt-0.5">
                            {field.name}
                        </div>
                    </div>
                    {field.required && (
                        <div className="flex-shrink-0">
                            <span className="text-xs px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                                Required
                            </span>
                        </div>
                    )}
                </div>
            </button>
        </div>
    );
}

function EditFields({ onPublish, chatflowId, initialSchema }: { onPublish: (url: string) => void, chatflowId?: string | null, initialSchema?: any }) {
    const [activeTab, setActiveTab] = useState<"config" | "preview">("config");
    const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
    const [chatflowName, setChatflowName] = useState("My New Chatflow");
    const [isPublishing, setIsPublishing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Use generated schema if available, otherwise empty (will be loaded from API if chatflowId exists)
    const [fields, setFields] = useState<any[]>(
        initialSchema?.fields || (chatflowId ? [] : [
            { id: "1", name: "policy_number", label: "Policy Number", type: "text", required: true, description: "The unique identifier for the insurance policy." },
            { id: "2", name: "incident_date", label: "Date of Incident", type: "date", required: true, description: "When did the incident occur?" },
            { id: "3", name: "description", label: "Incident Description", type: "long_text", required: true, description: "Please describe what happened in detail." },
            { id: "4", name: "damage_photos", label: "Damage Photos", type: "image", required: false, description: "Upload photos of the damage." },
        ])
    );

    // Fetch chatflow data if editing existing chatflow
    useEffect(() => {
        const fetchChatflow = async () => {
            if (!chatflowId) return;

            setIsLoading(true);
            try {
                const response = await fetch(`/api/chatflow/${chatflowId}`);
                if (!response.ok) throw new Error('Failed to fetch chatflow');

                const data = await response.json();
                const chatflow = data.chatflow;

                // Update state with fetched data
                setChatflowName(chatflow.name || "My New Chatflow");
                if (chatflow.schema && chatflow.schema.fields) {
                    setFields(chatflow.schema.fields);
                }
            } catch (error) {
                console.error('Error fetching chatflow:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChatflow();
    }, [chatflowId]);

    // Update fields when initialSchema changes (for newly generated chatflows)
    useEffect(() => {
        if (initialSchema && !chatflowId) {
            // AI just generated this schema
            if (initialSchema.fields) {
                setFields(initialSchema.fields);
            }
            // Set the chatflow name from the schema if available
            if (initialSchema.name) {
                setChatflowName(initialSchema.name);
            }
        }
    }, [initialSchema, chatflowId]);

    const selectedField = fields.find(f => f.id === selectedFieldId);

    const handleUpdateField = (id: string, updates: any) => {
        setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const handleSaveClick = async () => {
        setIsSaving(true);
        try {
            if (chatflowId) {
                // Update existing chatflow
                const response = await fetch(`/api/chatflow/${chatflowId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: chatflowName,
                        schema: { fields },
                        status: 'DRAFT'
                    }),
                });

                if (!response.ok) throw new Error('Save failed');

                toast.success("Chatflow saved successfully");
                console.log('Chatflow saved successfully');
            } else {
                // Create new chatflow as draft
                const response = await fetch('/api/chatflow/publish', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: chatflowName,
                        description: "Created via AI",
                        schema: { fields },
                        status: 'DRAFT'
                    }),
                });

                if (!response.ok) throw new Error('Save failed');

                const data = await response.json();
                // TODO: Update chatflowId state or redirect
                console.log('Chatflow created as draft:', data);
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error("Failed to save chatflow");
        } finally {
            setIsSaving(false);
        }
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'text': return Type;
            case 'long_text': return FileText;
            case 'textarea': return FileText;
            case 'number': return Hash;
            case 'date': return Calendar;
            case 'email': return MessageSquare;
            case 'select': return MoreHorizontal;
            case 'boolean': return Check;
            case 'image': return ImageIcon;
            case 'file': return ImageIcon;
            default: return Type;
        }
    };

    const handleAddField = () => {
        const newField = {
            id: `field_${Date.now()}`,
            name: `field_${fields.length + 1}`,
            label: "New Field",
            type: "text",
            required: false,
            description: ""
        };
        setFields([...fields, newField]);
        setSelectedFieldId(newField.id);
    };

    const handleDeleteField = (id: string) => {
        setFields(fields.filter(f => f.id !== id));
        if (selectedFieldId === id) {
            setSelectedFieldId(null);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                setFields((items) => arrayMove(items, oldIndex, newIndex));
            }
        }
    };

    const handlePublishClick = async () => {
        setIsPublishing(true);
        try {
            const response = await fetch('/api/chatflow/publish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: chatflowName,
                    description: "Created via AI", // Could add a field for this too
                    schema: { fields }
                }),
            });

            if (!response.ok) throw new Error('Publish failed');

            const data = await response.json();
            // Construct full URL (assuming localhost for now, but should be env var)
            const origin = window.location.origin;
            onPublish(`${origin}/c/${data.shareUrl}`);
        } catch (error) {
            console.error(error);
            // TODO: Show error toast
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Tab Selector */}
            <div className="flex justify-center">
                <div className="inline-flex rounded-lg bg-neutral-900 p-1 border border-neutral-800">
                    <button
                        onClick={() => setActiveTab("config")}
                        className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "config"
                            ? "bg-neutral-800 text-white"
                            : "text-neutral-400 hover:text-neutral-200"
                            }`}
                    >
                        Configuration
                    </button>
                    <button
                        onClick={() => setActiveTab("preview")}
                        className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "preview"
                            ? "bg-neutral-800 text-white"
                            : "text-neutral-400 hover:text-neutral-200"
                            }`}
                    >
                        Preview
                    </button>
                </div>
            </div>

            {/* Content */}
            <div>
                {activeTab === "config" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Panel - Fields List */}
                        <div className={`lg:col-span-4 ${selectedFieldId ? 'hidden lg:block' : ''}`}>
                            <Card className="bg-black border-neutral-800">
                                <CardHeader className="space-y-4 pb-4">
                                    <div className="space-y-2">
                                        <Label className="text-neutral-300 text-sm font-medium">Chatflow Name</Label>
                                        <Input
                                            value={chatflowName}
                                            onChange={(e) => setChatflowName(e.target.value)}
                                            className="bg-neutral-950 border-neutral-800 text-neutral-200"
                                            placeholder="My Awesome Chatflow"
                                        />
                                    </div>
                                    <Separator className="bg-neutral-800" />
                                    <div className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">Fields</CardTitle>
                                            <CardDescription className="text-neutral-500 text-sm">Manage your fields.</CardDescription>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={handleAddField}
                                            className="text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Field
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-1.5 p-3">
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <SortableContext
                                            items={fields.map(f => f.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {fields.map((field) => (
                                                <SortableFieldItem
                                                    key={field.id}
                                                    field={field}
                                                    isSelected={selectedFieldId === field.id}
                                                    onSelect={() => setSelectedFieldId(field.id)}
                                                    getIconForType={getIconForType}
                                                />
                                            ))}
                                        </SortableContext>
                                    </DndContext>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Panel - Field Editor or Empty State */}
                        <div className="lg:col-span-8 hidden lg:block">
                            {selectedField ? (
                                <Card className="bg-black border-neutral-800 h-full overflow-hidden">
                                    <FieldEditor
                                        field={selectedField}
                                        onSave={(updatedField) => {
                                            handleUpdateField(updatedField.id, updatedField);
                                            toast.success("Field updated");
                                        }}
                                        onDelete={() => {
                                            handleDeleteField(selectedField.id);
                                            toast.success("Field deleted");
                                        }}
                                        onCancel={() => setSelectedFieldId(null)}
                                    />
                                </Card>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-neutral-800 rounded-lg bg-neutral-950/50 border-dashed">
                                    <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center mb-4">
                                        <Settings2 className="h-6 w-6 text-neutral-500" />
                                    </div>
                                    <h3 className="text-lg font-medium text-neutral-200">No Field Selected</h3>
                                    <p className="text-neutral-500 max-w-xs mt-2">
                                        Select a field from the list on the left to edit its properties, or add a new field.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={handleAddField}
                                        className="mt-6 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add New Field
                                    </Button>
                                </div>
                            )}
                        </div>

                    </div >
                ) : (
                    <div className="w-full">
                        {/* Chat Interface with integrated header */}
                        <div className="flex flex-col h-[calc(100vh-420px)] w-full max-w-5xl mx-auto bg-black border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
                            {/* Integrated Header with Chat Preview title and actions */}
                            <div className="h-14 border-b border-neutral-800 bg-neutral-950/50 flex items-center justify-between px-4 md:px-6 backdrop-blur-sm flex-shrink-0">
                                <h3 className="text-base font-semibold text-neutral-200">Chat Preview</h3>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800"
                                        >
                                            Actions
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 bg-neutral-900 border-neutral-700">
                                        <DropdownMenuItem
                                            onClick={handleSaveClick}
                                            disabled={isSaving || isLoading}
                                            className="cursor-pointer text-neutral-200 hover:text-white hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white"
                                        >
                                            {isSaving ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <Save className="mr-2 h-4 w-4" />
                                            )}
                                            <span>{isSaving ? "Saving..." : "Save Draft"}</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                // TODO: Copy share link logic
                                                console.log("Copy share link");
                                            }}
                                            className="cursor-pointer text-neutral-200 hover:text-white hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white"
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            <span>Copy Share Link</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={handlePublishClick}
                                            disabled={isPublishing}
                                            className="cursor-pointer text-neutral-200 hover:text-white hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white"
                                        >
                                            {isPublishing ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <PlayCircle className="mr-2 h-4 w-4" />
                                            )}
                                            <span>{isPublishing ? "Publishing..." : "Publish Chatflow"}</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Chat Content */}
                            <div className="flex-1 overflow-hidden">
                                <ChatView fields={fields} />
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </div >
    );
}

function SuccessView({ onBack, url }: { onBack: () => void, url: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-8 text-center animate-in zoom-in-95 duration-500">
            <div className="h-24 w-24 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <Check className="h-12 w-12 text-green-500" />
            </div>

            <div className="space-y-2 max-w-md">
                <h2 className="text-3xl font-semibold tracking-tight">Chatflow Published!</h2>
                <p className="text-neutral-400">
                    Your chatflow is now live and ready to accept submissions. You can manage it from the dashboard.
                </p>
            </div>

            <Card className="w-full max-w-md bg-neutral-950 border-neutral-800">
                <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-neutral-900 flex items-center justify-center border border-neutral-800">
                        <ExternalLink className="h-5 w-5 text-neutral-400" />
                    </div>
                    <div className="flex-1 text-left">
                        <div className="text-xs text-neutral-500 font-medium uppercase">Public Link</div>
                        <div className="text-sm text-neutral-300 font-mono truncate">{url}</div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="border-neutral-800 hover:bg-neutral-900"
                    >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : "Copy"}
                    </Button>
                </CardContent>
            </Card>

            <div className="flex gap-4">
                <Button variant="outline" onClick={onBack} className="border-neutral-800 hover:bg-neutral-900 text-neutral-300">
                    Back to Dashboard
                </Button>
                <Button className="bg-white text-black hover:bg-neutral-200" onClick={() => window.open(url, '_blank')}>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Test Chatflow
                </Button>
            </div>
        </div>
    );
}

function SubmissionsList({ chatflowId }: { chatflowId: string | null }) {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (chatflowId) {
            fetchSubmissions();
        }
    }, [chatflowId]);

    const fetchSubmissions = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/chatflow/${chatflowId}/submissions`);
            if (response.ok) {
                const data = await response.json();
                setSubmissions(data.submissions);
            }
        } catch (error) {
            console.error("Failed to fetch submissions", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!chatflowId) return null;

    return (
        <div className="space-y-4">
            <Card className="bg-black border-neutral-800">
                <CardHeader className="border-b border-neutral-800 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Recent Submissions</CardTitle>
                            <CardDescription className="text-neutral-500">
                                View and manage data collected from your chatflow.
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="border-neutral-800 hover:bg-neutral-900 text-neutral-300">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                    </div>
                </CardHeader>
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="w-full">
                            <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-neutral-950/50">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton key={i} className="h-4 w-20 bg-neutral-900" />
                                ))}
                            </div>
                            <div className="divide-y divide-neutral-800">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center justify-between px-6 py-4">
                                        <Skeleton className="h-4 w-16 bg-neutral-900" />
                                        <Skeleton className="h-4 w-32 bg-neutral-900" />
                                        <Skeleton className="h-5 w-20 rounded-full bg-neutral-900" />
                                        <Skeleton className="h-4 w-48 bg-neutral-900" />
                                        <Skeleton className="h-8 w-8 rounded bg-neutral-900" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : submissions.length === 0 ? (
                        <div className="p-8 text-center text-neutral-500">No submissions yet.</div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-neutral-500 uppercase bg-neutral-950/50 border-b border-neutral-800">
                                <tr>
                                    <th className="px-6 py-3 font-medium">ID</th>
                                    <th className="px-6 py-3 font-medium">Date</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">Data Preview</th>
                                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {submissions.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-neutral-900/50 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-neutral-400">{sub.id.slice(-8)}</td>
                                        <td className="px-6 py-4 text-neutral-300">
                                            {new Date(sub.createdAt).toLocaleDateString()} {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className={`
                                                ${sub.status === 'COMPLETED' ? 'text-green-500 bg-green-500/10 border-green-500/20' : ''}
                                                ${sub.status === 'IN_PROGRESS' ? 'text-blue-500 bg-blue-500/10 border-blue-500/20' : ''}
                                                ${sub.status === 'ABANDONED' ? 'text-neutral-500 bg-neutral-500/10 border-neutral-500/20' : ''}
                                            `}>
                                                {sub.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-400 max-w-xs truncate">
                                            {sub.data && typeof sub.data === 'object' ? Object.values(sub.data).join(', ') : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-white">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Card>
        </div>
    );
}
