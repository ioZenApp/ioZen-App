"use client";

import { useState } from "react";
import { Button } from "@/ui/button";
import { Input, Textarea } from "@/ui/forms";
import { ScrollArea } from "@/ui/layout";
import { Send, Calendar as CalendarIcon, Bot, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/forms";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/overlays";
import { Calendar } from "@/ui/data-display";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Field {
    id: string;
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: string[];
}

export function ChatView({ fields = [] }: { fields?: Field[] }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [messages, setMessages] = useState<{ role: 'ai' | 'user', content: string }[]>([]);
    const [input, setInput] = useState("");
    const [hasStarted, setHasStarted] = useState(false);

    // Initialize chat with first question
    if (!hasStarted && fields.length > 0 && messages.length === 0) {
        setMessages([{ role: 'ai', content: fields[0].label }]);
        setHasStarted(true);
    }

    // Reset if fields change significantly (optional, but good for preview)
    // For now, we'll just let the user reset manually or rely on component remounting when switching tabs

    const handleSend = () => {
        if (!input.trim()) return;

        const field = fields[currentStep];

        // Format the display value for dates
        let displayValue = input;
        if (field.type === 'date' && input) {
            try {
                displayValue = format(new Date(input), "MMMM d, yyyy");
            } catch {
                displayValue = input;
            }
        }

        // Add user answer
        const userMsg: { role: 'user', content: string } = { role: 'user', content: displayValue };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput("");

        // Determine next step
        const nextStep = currentStep + 1;

        setTimeout(() => {
            if (nextStep < fields.length) {
                // Ask next question
                const aiMsg: { role: 'ai', content: string } = { role: 'ai', content: fields[nextStep].label };
                setMessages(prev => [...prev, aiMsg]);
                setCurrentStep(nextStep);
            } else {
                // Completion
                const completionMsg: { role: 'ai', content: string } = { role: 'ai', content: "Thank you! I have collected all the information." };
                setMessages(prev => [...prev, completionMsg]);
            }
        }, 600);
    };

    const handleReset = () => {
        setCurrentStep(0);
        setMessages(fields.length > 0 ? [{ role: 'ai', content: fields[0].label }] : []);
        setInput("");
    };

    if (fields.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-neutral-500">
                Add fields to see the preview
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full relative">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 md:p-6">
                <div className="space-y-6 pb-4">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                        >
                            {/* Avatar */}
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai'
                                ? 'bg-muted text-foreground border border-border'
                                : 'bg-primary text-primary-foreground'
                                }`}>
                                {msg.role === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                            </div>

                            {/* Message Bubble */}
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${msg.role === 'ai'
                                ? 'bg-muted border border-border text-foreground rounded-tl-none'
                                : 'bg-primary text-primary-foreground rounded-tr-none'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border flex-shrink-0">
                <div className="relative flex items-end gap-2">
                    <div className="flex-1">
                        {currentStep < fields.length ? (
                            (() => {
                                const field = fields[currentStep];
                                switch (field.type) {
                                    case 'select':
                                        return (
                                            <Select value={input} onValueChange={setInput}>
                                                <SelectTrigger className="w-full h-10 rounded-lg">
                                                    <SelectValue placeholder="Select an option" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {field.options?.map((opt: string) => (
                                                        <SelectItem key={opt} value={opt} className="cursor-pointer">
                                                            {opt}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        );
                                    case 'date':
                                        return (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal h-10 rounded-lg",
                                                            !input && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {input ? format(new Date(input), "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={input ? new Date(input) : undefined}
                                                        onSelect={(date) => setInput(date ? date.toISOString() : "")}
                                                        initialFocus
                                                        captionLayout="dropdown"
                                                        fromYear={1900}
                                                        toYear={new Date().getFullYear() + 10}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        );
                                    case 'long_text':
                                    case 'textarea':
                                        return (
                                            <Textarea
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSend();
                                                    }
                                                }}
                                                placeholder={`Answer for ${field.label}...`}
                                                className="min-h-[80px] rounded-lg resize-none"
                                            />
                                        );
                                    default:
                                        return (
                                            <Input
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                                placeholder={`Answer for ${field.label}...`}
                                                className="h-10 rounded-lg"
                                            />
                                        );
                                }
                            })()
                        ) : (
                            <Input
                                value={input}
                                disabled
                                placeholder="Chat completed"
                                className="h-10 rounded-lg opacity-50 cursor-not-allowed"
                            />
                        )}
                    </div>
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || currentStep >= fields.length}
                        size="icon"
                        className="h-10 w-10 rounded-lg flex-shrink-0"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <div className="text-center mt-3">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Powered by ioZen AI</span>
                </div>
            </div>
        </div>
    );
}
