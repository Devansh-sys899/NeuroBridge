import { useState, useEffect } from 'react';
import { useSessionStore } from '../Store/Session.store'; 
import { useSessionFlow } from '../Hooks/useSessionFlow'; 

const Dashboard = () => {
    const isRunning = useSessionStore(s => s.isRunning);
    const startTime = useSessionStore(s => s.startTime);
    const { startSession, endSession } = useSessionFlow();

    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        if(!isRunning || !startTime) return;

        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startTime) / 1000));
            console.log('Elapsed:', elapsed);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl">
                Dashboard
            </h1>

            <div className="max-w-xl bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-medium mb-2">
                    Focus Session
                </h2>
            </div>

            <p className={`text-sm mb-4 ${isRunning ? 'text-green-400' : 'text-gray-400'}`}>
                {isRunning ? 'Session is Active' : 'No active session found'}
            </p>

            { isRunning && (
                <p className="text-xl font-mono mb-4">
                    {String(Math.floor(elapsed/60))}: {String(elapsed % 60).padStart(2, "0")}
                </p>
            )}

            <button onClick={() => {
                isRunning ? endSession({ selfReportedFocus : 3}) : startSession({
                    topic: "Deepwork",
                    difficulty: 3,
                    intent: "Learning"
                })
            }} className={`px-4 py-2 rounded-md transition ${ isRunning ? 'bg-red-600 hover:bg-red-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
                { isRunning ? 'End Session' : 'Start Session' }
            </button>
        </div>
    )
}

export default Dashboard;