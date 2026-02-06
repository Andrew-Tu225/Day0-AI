export default function Header() {
    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200/50 bg-white/80 px-6 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
            <div className="flex items-center gap-2 h-full">
                <a href="/" className="flex items-center h-full">
                    <img src="/logo.svg" alt="Dayo AI Logo" className="h-12 w-auto object-contain" />
                </a>
            </div>

            <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8">
                <a href="/history" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">History</a>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Contact</a>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Settings</a>
            </nav>

            <div className="flex items-center gap-4">
                <button className="rounded-full p-2 text-gray-500 hover:bg-black/5 hover:text-black transition-colors">
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
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.09a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.09a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                </button>
                <button className="rounded-full p-2 text-gray-500 hover:bg-black/5 hover:text-black transition-colors">
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
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
