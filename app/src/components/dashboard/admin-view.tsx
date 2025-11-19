"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChatView } from "@/components/dashboard/chat-view";
import { Plus, Search, MessageSquare, LayoutTemplate, ArrowRight, Sparkles, Loader2, Check, ExternalLink, PlayCircle, Settings2, Hash, Calendar, Type, ImageIcon, X } from 'lucide-react';

type ViewState = 'list' | 'create' | 'edit' | 'success';

export function AdminView() {
    const [view, setView] = useState<ViewState>('list');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedChatflowId, setSelectedChatflowId] = useState<string | null>(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setView('edit');
        }, 1500);
    };

    const handlePublish = () => {
        setView('success');
    };

    const handleSelectChatflow = (id: string) => {
        setSelectedChatflowId(id);
        setView('edit');
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
                </h1>
                {view === 'list' && (
                    <Button onClick={() => setView('create')} className="bg-white text-black hover:bg-neutral-200 w-full md:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Chatflow
                    </Button>
                )}
                {view !== 'list' && view !== 'success' && (
                    <Button variant="ghost" onClick={() => setView('list')} className="text-neutral-400 hover:text-white w-full md:w-auto justify-start md:justify-center">
                        Cancel
                    </Button>
                )}
            </div>

            {view === 'list' && <ChatflowList onSelectChatflow={handleSelectChatflow} />}
            {view === 'create' && <CreateChatflow onGenerate={handleGenerate} isGenerating={isGenerating} />}
            {view === 'edit' && <EditFields onPublish={handlePublish} chatflowId={selectedChatflowId} />}
            {view === 'success' && <SuccessView onBack={() => setView('list')} />}
        </div>
    );
}

function ChatflowList({ onSelectChatflow }: { onSelectChatflow: (id: string) => void }) {
    const chatflows = [
        { id: "1", name: "Insurance Claim Bot", submissions: 124, date: "2m ago", status: "Active" },
        { id: "2", name: "Customer Support V1", submissions: 0, date: "1h ago", status: "Building" },
        { id: "3", name: "Lead Gen Form", submissions: 892, date: "2d ago", status: "Active" },
    ];

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
                            <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-800 transition-colors text-neutral-400 group-hover:text-white">
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

function CreateChatflow({ onGenerate, isGenerating }: { onGenerate: () => void, isGenerating: boolean }) {
    return (
        <div className="max-w-3xl mx-auto">
            <Card className="bg-black border-neutral-800 relative overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <Sparkles className="h-5 w-5 text-blue-500" />
                        </div>
                        <CardTitle className="text-xl">Describe your Chatflow</CardTitle>
                    </div>
                    <CardDescription className="text-neutral-400">
                        Our AI will analyze your requirements and generate the necessary fields and logic.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 relative">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Prompt</label>
                        <Textarea
                            placeholder="e.g. I need a chatflow for collecting car insurance claims. It should ask for the policy number, date of incident, description, and photos of the damage."
                            className="min-h-[200px] bg-neutral-950 border-neutral-800 focus-visible:ring-blue-900/50 resize-none text-base leading-relaxed placeholder:text-neutral-600"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            onClick={onGenerate}
                            disabled={isGenerating}
                            className="bg-white text-black hover:bg-neutral-200 min-w-[140px] transition-all duration-300"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    Generate
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function EditFields({ onPublish, chatflowId }: { onPublish: () => void, chatflowId?: string | null }) {
    const [activeTab, setActiveTab] = useState<"config" | "preview">("config");
    const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

    const fields = [
        { id: "1", name: "policy_number", label: "Policy Number", type: "text", icon: Hash, required: true, description: "The unique identifier for the insurance policy." },
        { id: "2", name: "incident_date", label: "Date of Incident", type: "date", icon: Calendar, required: true, description: "When did the incident occur?" },
        { id: "3", name: "description", label: "Incident Description", type: "long_text", icon: Type, required: true, description: "Please describe what happened in detail." },
        { id: "4", name: "damage_photos", label: "Damage Photos", type: "image", icon: ImageIcon, required: false, description: "Upload photos of the damage." },
    ];

    const selectedField = fields.find(f => f.id === selectedFieldId);

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
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg">Fields</CardTitle>
                                        <CardDescription className="text-neutral-500 text-sm">Manage your fields.</CardDescription>
                                    </div>
                                    <Button size="sm" variant="ghost" className="text-neutral-400 hover:text-white border border-neutral-800">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {fields.map((field) => {
                                        const Icon = field.icon;
                                        return (
                                            <button
                                                key={field.id}
                                                onClick={() => setSelectedFieldId(field.id)}
                                                className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedFieldId === field.id
                                                    ? 'bg-neutral-900 border-blue-500/50'
                                                    : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0">
                                                        <Icon className="h-4 w-4 text-neutral-400" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium text-neutral-200 text-sm">{field.label}</div>
                                                        <div className="text-xs text-neutral-500 font-mono truncate">{field.name}</div>
                                                    </div>
                                                    {selectedFieldId === field.id && (
                                                        <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Panel - Field Editor or Empty State */}
                        <div className={`lg:col-span-8 ${!selectedFieldId ? 'hidden lg:block' : ''}`}>
                            {selectedField ? (
                                <Card className="bg-black border-neutral-800">
                                    <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-800">
                                        <div>
                                            <CardTitle className="text-lg">Edit Field</CardTitle>
                                            <CardDescription className="text-neutral-500 text-sm">
                                                Configure properties for {selectedField.label}
                                            </CardDescription>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setSelectedFieldId(null)}
                                            className="text-neutral-400 hover:text-white"
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="space-y-6 pt-6">
                                        {/* Label */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Label</label>
                                                <Input
                                                    defaultValue={selectedField.label}
                                                    className="bg-black border-neutral-800"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Variable Name</label>
                                                <Input
                                                    defaultValue={selectedField.name}
                                                    className="bg-black border-neutral-800 font-mono text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Description / Helper Text</label>
                                            <Textarea
                                                defaultValue={selectedField.description}
                                                className="bg-black border-neutral-800 min-h-[100px]"
                                            />
                                        </div>

                                        {/* Type and Required */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Type</label>
                                                <div className="flex items-center gap-2 h-10 px-3 rounded-md bg-black border border-neutral-800 text-neutral-300">
                                                    <Hash className="h-4 w-4 text-neutral-500" />
                                                    <span className="text-sm">{selectedField.type}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Required</label>
                                                <div className="flex items-center h-10">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" defaultChecked={selectedField.required} className="sr-only peer" />
                                                        <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        <span className="ms-3 text-sm font-medium text-neutral-300">Yes</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions - Horizontal Layout */}
                                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-800">
                                            <Button className="flex-1 bg-white text-black hover:bg-neutral-200">
                                                <Check className="h-4 w-4 mr-2" />
                                                Save Changes
                                            </Button>
                                            <Button variant="ghost" className="flex-1 text-red-500 hover:text-red-400 hover:bg-red-500/10 border border-neutral-800">
                                                <X className="h-4 w-4 mr-2" />
                                                Delete Field
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="bg-black border-neutral-800 h-full min-h-[400px] flex items-center justify-center">
                                    <CardContent className="text-center space-y-4">
                                        <div className="h-16 w-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto">
                                            <Settings2 className="h-8 w-8 text-neutral-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-neutral-300 mb-2">No Field Selected</h3>
                                            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
                                                Select a field from the list on the left<br />
                                                to edit its properties, validation rules,<br />
                                                and appearance.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        {/* Chat Interface with integrated header */}
                        <div className="flex flex-col h-[calc(100vh-420px)] w-full max-w-5xl mx-auto bg-black border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
                            {/* Integrated Header with Chat Preview title and actions */}
                            <div className="h-14 border-b border-neutral-800 bg-neutral-950/50 flex items-center justify-between px-4 md:px-6 backdrop-blur-sm flex-shrink-0">
                                <h3 className="text-base font-semibold text-neutral-200">Chat Preview</h3>
                                <div className="flex items-center gap-3">
                                    <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Share Link
                                    </Button>
                                    <Button onClick={onPublish} size="sm" className="bg-white text-black hover:bg-neutral-200">
                                        Publish Chatflow
                                    </Button>
                                </div>
                            </div>

                            {/* Chat Content */}
                            <div className="flex-1 overflow-hidden">
                                <ChatView />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function SuccessView({ onBack }: { onBack: () => void }) {
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
                        <div className="text-sm text-neutral-300 font-mono truncate">https://iozen.ai/c/claim-bot-v1</div>
                    </div>
                    <Button variant="outline" size="sm" className="border-neutral-800 hover:bg-neutral-900">
                        Copy
                    </Button>
                </CardContent>
            </Card>

            <div className="flex gap-4">
                <Button variant="outline" onClick={onBack} className="border-neutral-800 hover:bg-neutral-900 text-neutral-300">
                    Back to Dashboard
                </Button>
                <Button className="bg-white text-black hover:bg-neutral-200">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Test Chatflow
                </Button>
            </div>
        </div>
    );
}
