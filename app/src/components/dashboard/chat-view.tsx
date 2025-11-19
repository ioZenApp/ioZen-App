"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Send, Bot, User, Share2 } from 'lucide-react';

export function ChatView() {
    const [messages, setMessages] = useState([
        { role: 'ai', content: "Hello! I'm here to help you file your insurance claim. To start, could you please provide your policy number?" }
    ]);
    const [input, setInput] = useState("");
    const [progress, setProgress] = useState(15);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput("");
        setProgress(prev => Math.min(prev + 25, 100));

        // Simulate AI response
        setTimeout(() => {
            setMessages([...newMessages, {
                role: 'ai',
                content: "Thank you. Now, could you tell me the date when the incident occurred?"
            }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 md:p-6">
                <div className="space-y-6">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                        >
                            {/* Avatar */}
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai'
                                ? 'bg-neutral-800 text-white border border-neutral-700'
                                : 'bg-blue-600 text-white'
                                }`}>
                                {msg.role === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                            </div>

                            {/* Message Bubble */}
                            <div className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-4 py-2.5 md:px-5 md:py-3 text-sm leading-relaxed ${msg.role === 'ai'
                                ? 'bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-tl-none'
                                : 'bg-blue-600 text-white rounded-tr-none'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-neutral-950 border-t border-neutral-800 flex-shrink-0">
                <div className="relative flex items-center gap-2 max-w-3xl mx-auto">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 bg-neutral-900 border-neutral-800 focus-visible:ring-neutral-700 text-neutral-200 h-10 md:h-12 rounded-full px-4 md:px-6 text-sm md:text-base"
                    />
                    <Button
                        onClick={handleSend}
                        size="icon"
                        className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white text-black hover:bg-neutral-200 absolute right-1 md:right-1.5"
                    >
                        <Send className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                </div>
                <div className="text-center mt-2 md:mt-3">
                    <span className="text-[10px] text-neutral-600 uppercase tracking-widest">Powered by ioZen AI</span>
                </div>
            </div>
        </div>
    );
}
