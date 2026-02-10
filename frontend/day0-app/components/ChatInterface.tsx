"use client";

import { useState, useEffect } from "react";

interface ChatInterfaceProps {
    sessionId?: string;
}

interface Message {
    role: string;
    content: string;
}

export default function ChatInterface({ sessionId }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (sessionId) {
            fetchHistory();
        }
    }, [sessionId]);

    const fetchHistory = async () => {
        try {
            const response = await fetch(`http://localhost:8000/chat/${sessionId}/history`);
            if (response.ok) {
                const data = await response.json();
                if (data.history && data.history.length > 0) {
                    setMessages(data.history);
                }
            }
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue;
        setInputValue("");

        const newMessages = [
            ...messages,
            { role: "user", content: userMessage }
        ];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    message: userMessage,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
            } else {
                console.error("Failed to send message");
                setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, connection error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === 'user'
                            ? 'bg-gray-900 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-900 rounded-bl-none'
                            }`}>
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-none px-5 py-3">
                            <p className="text-sm leading-relaxed">Thinking...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="relative flex items-center gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="w-full pl-5 pr-14 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm shadow-sm"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="absolute right-2 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!inputValue.trim() || isLoading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                        </svg>
                    </button>
                </div>
                <div className="text-center mt-2 text-xs text-gray-400">
                    AI can make mistakes. Please verify important information.
                </div>
            </div>
        </div>
    );
}

