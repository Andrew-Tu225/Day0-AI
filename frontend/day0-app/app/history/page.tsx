"use client";

import Header from "../../components/Header";
import ChatCard from "../../components/ChatCard";

export default function HistoryPage() {
    const chats = [
        {
            title: "Product Design Discussion",
            preview: "Let me know if you need any changes to the mockups",
            time: "2 hours ago",
            unreadCount: 3,
            iconColor: "bg-blue-50 text-blue-600",
        },
        {
            title: "Marketing Campaign Ideas",
            preview: "The social media strategy looks great!",
            time: "5 hours ago",
            iconColor: "bg-indigo-50 text-indigo-600",
        },
        {
            title: "Technical Support",
            preview: "Thank you for helping me resolve the issue",
            time: "Yesterday",
            iconColor: "bg-red-50 text-red-600",
        },
        {
            title: "Weekly Team Sync",
            preview: "Meeting notes have been shared",
            time: "Yesterday",
            unreadCount: 1,
            iconColor: "bg-orange-50 text-orange-600",
        },
        {
            title: "Client Project Review",
            preview: "The deliverables are ready for review",
            time: "2 days ago",
            iconColor: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Budget Planning Q1",
            preview: "Updated the spreadsheet with new figures",
            time: "3 days ago",
            iconColor: "bg-cyan-50 text-cyan-600",
        },
        {
            title: "Feature Requests",
            preview: "Added to the backlog for next sprint",
            time: "4 days ago",
            iconColor: "bg-violet-50 text-violet-600",
        },
        {
            title: "Customer Feedback Analysis",
            preview: "Survey results are looking positive",
            time: "1 week ago",
            iconColor: "bg-rose-50 text-rose-600",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="mx-auto max-w-[1600px] p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Chat History</h1>
                    <p className="text-gray-500">View all your past conversations</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {chats.map((chat, i) => (
                        <ChatCard key={i} {...chat} />
                    ))}
                </div>
            </main>
        </div>
    );
}
