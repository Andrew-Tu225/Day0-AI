export default function CurrentFocusWidget() {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                </svg>
                <h3 className="font-semibold text-gray-900">Current Focus</h3>
            </div>

            <div className="space-y-6">
                {/* Niche Section */}
                <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Niche</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700">
                            Product Design
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700">
                            UX Research
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Add niche..." className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm outline-none focus:border-gray-300 focus:ring-0" />
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>
                </div>

                {/* Tone Section */}
                <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Tone</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700">
                            Professional
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700">
                            Friendly
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Add tone..." className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm outline-none focus:border-gray-300 focus:ring-0" />
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>
                </div>

                {/* Format Section */}
                <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Format</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700">
                            Video
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700">
                            Article
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700">
                            Tutorial
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Add format..." className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm outline-none focus:border-gray-300 focus:ring-0" />
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
