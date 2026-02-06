"use client";

import Header from "./Header";
import CalendarWidget from "./CalendarWidget";
import WeeklyGoalWidget from "./WeeklyGoalWidget";
import ProgressWidget from "./ProgressWidget";
import IdeaBoardWidget from "./IdeaBoardWidget";
import CurrentFocusWidget from "./CurrentFocusWidget";
import RecentChatCard from "./RecentChatCard";

export default function Dashboard() {
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
                                <a href="/chat" className="group inline-flex items-center gap-2 rounded-full border border-gray-900 bg-white px-6 py-2.5 font-medium text-gray-900 transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-900 transition-150 hover:text-white focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 active:scale-95">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Create
                                </a>
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
