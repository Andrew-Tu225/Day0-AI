export default function CalendarWidget() {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const dates = [
        1, 2, 3, 4, 5, 6, 7,
        8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28
    ];

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">February 2026</h3>
                <div className="flex gap-2 text-gray-400">
                    <button className="hover:text-gray-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button className="hover:text-gray-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-y-4 text-center text-sm">
                {days.map((day) => (
                    <div key={day} className="text-gray-400 font-medium text-xs">
                        {day}
                    </div>
                ))}
                {dates.map((date) => (
                    <div
                        key={date}
                        className={`flex aspect-square items-center justify-center rounded-lg text-sm transition-colors cursor-pointer
              ${date === 3 ? "bg-gray-900 text-white font-medium" : "text-gray-700 hover:bg-gray-50"}
            `}
                    >
                        {date}
                    </div>
                ))}
            </div>
        </div>
    );
}
