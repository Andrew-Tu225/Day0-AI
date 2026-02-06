export default function ProgressWidget() {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <h3 className="font-semibold text-gray-900">Today's Progress</h3>

            <div className="flex flex-col items-center justify-center py-2">
                <span className="text-5xl font-bold text-gray-900">8</span>
                <span className="text-gray-500 mt-2">Tasks Completed</span>
            </div>

            <div className="flex items-center justify-center gap-1 text-sm font-medium text-green-600 bg-green-50 py-1.5 px-3 rounded-full w-fit mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                +2 from yesterday
            </div>
        </div>
    );
}
