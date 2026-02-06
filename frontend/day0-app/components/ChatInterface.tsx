"use client";

import { useState } from "react";

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hello! How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessages = [
            ...messages,
            { role: "user", content: inputValue }
        ];

        setMessages(newMessages);
        setInputValue("");

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: "assistant", content: "I'm just a demo bot for now, but I like your style!" }]);
        }, 1000);
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
                    />
                    <button
                        onClick={handleSendMessage}
                        className="absolute right-2 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!inputValue.trim()}
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
