interface ChatCardProps {
    title: string;
    preview: string;
    time: string;
    unreadCount?: number;
    iconColor?: string;
}

export default function ChatCard({
    title,
    preview,
    time,
    unreadCount,
    iconColor = "bg-blue-100 text-blue-600",
}: ChatCardProps) {
    return (
        <div className="group relative rounded-2xl bg-white p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="absolute right-4 top-4 text-gray-300 group-hover:text-gray-500 transition-colors">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                </svg>
            </div>

            <div className="mb-4 flex items-start gap-4 pr-6">
                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconColor}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{title}</h3>
                </div>
            </div>

            <p className="mb-4 text-sm text-gray-500 line-clamp-2 min-h-[40px]">
                {preview}
            </p>

            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">{time}</span>
                {unreadCount ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                        {unreadCount}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
