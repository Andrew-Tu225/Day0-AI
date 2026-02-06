export default function WeeklyGoalWidget() {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <h3 className="font-semibold text-gray-900 mb-4">Weekly Goal</h3>

            <div className="flex flex-col items-center justify-center relative">
                {/* Gauge Container */}
                <div className="relative w-48 h-24 overflow-hidden">
                    {/* SVG Gauge */}
                    <svg viewBox="0 0 100 50" className="w-full h-full transform translate-y-1">
                        {/* Background Arc */}
                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f3f4f6" strokeWidth="8" strokeLinecap="round" />
                        {/* Progress Arc (approx 72%) */}
                        {/* 
                            Total length of arc is PI * R = 3.14159 * 40 ≈ 125.6
                            72% of 125.6 ≈ 90.4
                            Dasharray: 90.4 (visible) 35.2 (gap) ? 
                            Easier to use strokeDasharray/offset or just calculate end point.
                            72% = 0.72 * 180 deg = 129.6 deg.
                            Start angle 180. End angle 180 - 129.6 = 50.4 deg.
                            Coordinates:
                            Cx=50, Cy=50, R=40.
                            x = 50 + 40 * cos(angle)
                            y = 50 - 40 * sin(angle) (SVG y is down, but we want up from 50)
                         */}
                        {/* Simpler approach: Use dasharray. 
                             Path length ~ 126.
                             Dasharray = "90.7 126"
                         */}
                        <path
                            d="M 10 50 A 40 40 0 0 1 90 50"
                            fill="none"
                            stroke="#111827"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray="125.6"
                            strokeDashoffset="35.1" /* 125.6 * (1 - 0.72) = 35.16 */
                        />
                    </svg>
                </div>

                {/* Labels under the ends */}
                <div className="flex w-full justify-between px-6 -mt-2">
                    <span className="text-xl font-bold text-gray-900">18</span>
                    <span className="text-xl font-bold text-gray-300">25</span>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
                72% complete
            </div>
        </div>
    );
}
