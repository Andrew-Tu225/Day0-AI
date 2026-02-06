"use client";

import { useState } from "react";

export default function IdeaBoardWidget() {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Review user feedback", completed: false },
        { id: 2, text: "Update design system", completed: true },
        { id: 3, text: "Plan sprint meeting", completed: true },
        { id: 4, text: "Write documentation", completed: true },
    ]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.1.6-3.003"></path>
                </svg>
                <h3 className="font-semibold text-gray-900">Idea Board</h3>
            </div>

            <div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 group cursor-pointer" onClick={() => toggleTask(task.id)}>
                        <div className={`
                            mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors
                            ${task.completed ? 'bg-black border-black text-white' : 'border-gray-300 bg-white group-hover:border-gray-400'}
                        `}>
                            {task.completed && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            )}
                        </div>
                        <span className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                            {task.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
