import Header from "../../components/Header";
import ChatInterface from "../../components/ChatInterface";

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Header />
            <main className="mx-auto max-w-5xl p-4 md:p-8">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">New Chat</h1>
                            <p className="text-gray-500 text-sm mt-1">Start a new conversation with Day0 AI</p>
                        </div>
                    </div>
                    <ChatInterface />
                </div>
            </main>
        </div>
    );
}
