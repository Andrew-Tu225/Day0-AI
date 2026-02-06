interface RecentChatCardProps {
    tag: string;
    title: string;
    time: string;
    commentCount: number;
}

export default function RecentChatCard({ tag, title, time, commentCount }: RecentChatCardProps) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    {tag}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                </button>
            </div>

            <h3 className="font-medium text-gray-900 mb-6 line-clamp-2 flex-1">
                {title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {time}
                </div>
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    {commentCount}
                </div>
            </div>
        </div>
    );
}
