"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/ui/button";
import { Input, Textarea } from "@/ui/forms";
import { Send, Loader2, Calendar as CalendarIcon, CheckCircle2, Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/forms";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/overlays";
import { Calendar } from "@/ui/data-display";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ChatflowField, SubmissionData } from "@/types";

interface Message {
    id: string;
    role: "assistant" | "user";
    content: string;
    type?: "text" | "input" | "select" | "date" | "image";
    fieldId?: string;
    options?: string[];
}

export function PublicChatView({ chatflowId, fields, chatflowName }: { chatflowId: string, fields: ChatflowField[], chatflowName: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [answers, setAnswers] = useState<SubmissionData>({});
    const [isTyping, setIsTyping] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [submissionId, setSubmissionId] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Focus input after messages update
    useEffect(() => {
        scrollToBottom();
        // Focus input field after a short delay to ensure it's ready
        if (!isCompleted && !isTyping) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [messages, isTyping, isCompleted]);

    // Initial greeting
    useEffect(() => {
        if (fields.length > 0 && messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                setMessages([
                    {
                        id: "welcome",
                        role: "assistant",
                        content: `Welcome to ${chatflowName}! I'll help you complete this form.`
                    },
                    {
                        id: "q1",
                        role: "assistant",
                        content: fields[0].label,
                        type: getInputType(fields[0].type),
                        fieldId: fields[0].id,
                        options: fields[0].options
                    }
                ]);
                setIsTyping(false);
            }, 1000);
        }
    }, [fields, chatflowName, messages.length]);

    const getInputType = (fieldType: string): Message["type"] => {
        switch (fieldType) {
            case "select": return "select";
            case "date": return "date";
            case "image":
            case "file": return "image";
            case "textarea": return "input"; // Will be handled as multiline input
            case "phone":
            case "url":
            case "email":
            case "number":
            case "text":
            default: return "input";
        }
    };

    const saveFieldToBackend = async (fieldName: string, fieldValue: string): Promise<string | null> => {
        try {
            const response = await fetch('/api/chatflows/submissions/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    submissionId: submissionId,
                    chatflowId,
                    fieldName,
                    fieldValue,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save field');
            }

            const result = await response.json();
            return result.submissionId;
        } catch (error) {
            console.error('Save error:', error);
            throw error;
        }
    };

    const handleSubmit = async (value: string) => {
        if (!value.trim()) return;

        const currentField = fields[currentFieldIndex];

        // Format the display value for dates
        let displayValue = value;
        if (currentField.type === 'date' && value) {
            try {
                displayValue = format(new Date(value), "MMMM d, yyyy");
            } catch {
                // If formatting fails, use original value
                displayValue = value;
            }
        }

        // Add user message
        const newMessages = [
            ...messages,
            { id: `ans-${currentField.id}`, role: "user" as const, content: displayValue }
        ];
        setMessages(newMessages);
        setInputValue("");

        // Save answer locally
        const newAnswers = { ...answers, [currentField.name]: value };
        setAnswers(newAnswers);

        // Save to backend immediately
        setIsTyping(true);
        try {
            const newSubmissionId = await saveFieldToBackend(currentField.name, value);
            if (newSubmissionId && !submissionId) {
                setSubmissionId(newSubmissionId);
            }

            // Move to next field or finish
            const nextIndex = currentFieldIndex + 1;

            if (nextIndex < fields.length) {
                const nextField = fields[nextIndex];
                setTimeout(() => {
                    setMessages(prev => [
                        ...prev,
                        {
                            id: `q-${nextField.id}`,
                            role: "assistant",
                            content: nextField.label,
                            type: getInputType(nextField.type),
                            fieldId: nextField.id,
                            options: nextField.options
                        }
                    ]);
                    setIsTyping(false);
                    setCurrentFieldIndex(nextIndex);
                }, 800);
            } else {
                // Finish - mark submission as complete
                setTimeout(async () => {
                    setIsSubmitting(true);
                    try {
                        const response = await fetch('/api/chatflows/submit', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                submissionId,
                                chatflowId,
                                data: newAnswers,
                                status: 'COMPLETED'
                            }),
                        });

                        if (!response.ok) throw new Error('Submission failed');

                        setMessages(prev => [
                            ...prev,
                            {
                                id: "done",
                                role: "assistant",
                                content: "Thank you! Your response has been recorded."
                            }
                        ]);
                        setIsCompleted(true);
                    } catch (error) {
                        console.error(error);
                        setMessages(prev => [
                            ...prev,
                            {
                                id: "error",
                                role: "assistant",
                                content: "Sorry, something went wrong saving your response. Please try again."
                            }
                        ]);
                    } finally {
                        setIsSubmitting(false);
                        setIsTyping(false);
                    }
                }, 1000);
            }
        } catch {
            // Handle save error
            setIsTyping(false);
            setMessages(prev => [
                ...prev,
                {
                    id: "save-error",
                    role: "assistant",
                    content: "Sorry, I couldn't save your answer. Please check your connection and try again."
                }
            ]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(inputValue);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto bg-background border border-border rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="h-14 border-b border-border bg-muted/30 flex items-center justify-between px-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">{chatflowName}</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs text-muted-foreground">Online</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted border border-border text-foreground"
                                }`}>
                                {msg.role === "user" ? (
                                    <User className="h-4 w-4" />
                                ) : (
                                    <Bot className="h-4 w-4" />
                                )}
                            </div>
                            <div className={`space-y-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-muted border border-border text-foreground rounded-tl-none"
                                    }`}>
                                    {msg.content}
                                </div>

                                {/* Input Types for Assistant Messages */}
                                {msg.role === "assistant" && msg.type === "select" && !isCompleted && msg.id === messages[messages.length - 1]?.id && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {msg.options?.map((opt) => (
                                            <Button
                                                key={opt}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleSubmit(opt)}
                                            >
                                                {opt}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0">
                                <Bot className="h-4 w-4 text-foreground" />
                            </div>
                            <div className="bg-muted border border-border px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border">
                {isCompleted ? (
                    <div className="flex flex-col items-center justify-center py-4 space-y-2 text-green-600 dark:text-green-500 animate-in fade-in slide-in-from-bottom-4">
                        <CheckCircle2 className="h-8 w-8" />
                        <span className="font-medium">Submission Received</span>
                    </div>
                ) : (
                    <div className="relative flex items-end gap-2">
                        <div className="flex-1">
                            {(() => {
                                const currentField = fields[currentFieldIndex];
                                const fieldType = getInputType(currentField.type);

                                if (fieldType === 'select') {
                                    return (
                                        <Select value={inputValue} onValueChange={setInputValue}>
                                            <SelectTrigger className="w-full h-10 rounded-lg">
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {currentField.options?.map((opt) => (
                                                    <SelectItem key={opt} value={opt} className="cursor-pointer">
                                                        {opt}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    );
                                }

                                if (fieldType === 'date') {
                                    return (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal h-10 rounded-lg",
                                                        !inputValue && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {inputValue ? format(new Date(inputValue), "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={inputValue ? new Date(inputValue) : undefined}
                                                    onSelect={(date) => setInputValue(date ? date.toISOString() : "")}
                                                    initialFocus
                                                    captionLayout="dropdown"
                                                    fromYear={1900}
                                                    toYear={new Date().getFullYear() + 10}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    );
                                }

                                if (currentField.type === 'textarea') {
                                    return (
                                        <Textarea
                                            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSubmit(inputValue);
                                                }
                                            }}
                                            placeholder={isTyping ? "Wait for bot..." : "Type your answer..."}
                                            disabled={isTyping || isSubmitting}
                                            className="min-h-[80px] rounded-lg text-base resize-none"
                                        />
                                    );
                                }

                                return (
                                    <Input
                                        ref={inputRef as React.RefObject<HTMLInputElement>}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder={isTyping ? "Wait for bot..." : "Type your answer..."}
                                        disabled={isTyping || isSubmitting}
                                        className="h-10 rounded-lg text-base"
                                    />
                                );
                            })()}
                        </div>
                        <Button
                            size="icon"
                            onClick={() => handleSubmit(inputValue)}
                            disabled={!inputValue.trim() || isTyping || isSubmitting}
                            className="h-10 w-10 rounded-lg flex-shrink-0"
                        >
                            {isSubmitting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                )}
                <div className="text-center mt-3">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Powered by IoZen</span>
                </div>
            </div>
        </div>
    );
}

