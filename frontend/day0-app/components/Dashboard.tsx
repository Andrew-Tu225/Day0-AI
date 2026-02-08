"use client";

import Header from "./Header";
import CalendarWidget from "./CalendarWidget";
import WeeklyGoalWidget from "./WeeklyGoalWidget";
import ProgressWidget from "./ProgressWidget";
import IdeaBoardWidget from "./IdeaBoardWidget";
import CurrentFocusWidget from "./CurrentFocusWidget";
import RecentChatCard from "./RecentChatCard";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateSession = async () => {
        setIsCreating(true);
        try {
            const response = await fetch("http://localhost:8000/create-session", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to create session");
            }

            const data = await response.json();
            router.push(`/chat/${data.session_id}`);
        } catch (error) {
            console.error("Error creating session:", error);
            setIsCreating(false);
            // Only set false on error, because on success we navigate away 
            // and want the loader to persist during navigation

            // Fallback navigation or error handling could be added here
            // router.push("/chat"); 
        }
    };
    const recentChats = [
        {
            tag: "Product",
            title: "Product Feature Discussion",
            time: "Today at 2:30 PM",
            commentCount: 24,
        },
        {
            tag: "Design",
            title: "Design Review Meeting",
            time: "Today at 10:15 AM",
            commentCount: 18,
        },
        {
            tag: "Planning",
            title: "Sprint Planning Session",
            time: "Yesterday at 4:00 PM",
            commentCount: 32,
        },
        {
            tag: "Research",
            title: "Customer Feedback Analysis",
            time: "Feb 1 at 1:45 PM",
            commentCount: 15,
        },
        {
            tag: "Engineering",
            title: "Technical Architecture Review",
            time: "Jan 31 at 3:20 PM",
            commentCount: 27,
        },
    ];

    if (isCreating) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-all">
                <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 animate-ping rounded-full bg-gray-200 opacity-75"></div>
                    <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900"></div>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-gray-900">Creating secure session...</h3>
                <p className="mt-2 text-sm text-gray-500">Connecting you to Day0 AI Coach</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Header />
            <main className="mx-auto max-w-[1600px] p-8">
                {/* 
                  Layout: Left Sidebar (Calendar + Focus) | Right Main (Metrics + Chats)
                */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-1">
                        <CalendarWidget />
                        <CurrentFocusWidget />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8 lg:col-span-3">
                        {/* Top Widgets Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <WeeklyGoalWidget />
                            <ProgressWidget />
                            <IdeaBoardWidget />
                        </div>

                        {/* Recent Chats Section */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                <h2 className="text-lg font-bold text-gray-900">This Week's Chat Sessions</h2>
                                <button
                                    onClick={handleCreateSession}
                                    className="group inline-flex items-center gap-2 rounded-full border border-gray-900 bg-white px-6 py-2.5 font-medium text-gray-900 transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-900 transition-150 hover:text-white focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Create
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {recentChats.map((chat, i) => (
                                    <RecentChatCard key={i} {...chat} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
