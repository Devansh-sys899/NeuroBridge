import { useEffect, useState } from "react";
import { useSessionStore } from '../Store/Session.store';
import { useSessionFlow } from '../Hooks/useSessionFlow';

const SessionCard = () => {
    const isRunning = useSessionStore(s => s.isRunning);
    const startTime = useSessionStore(s => s.startTime);

    const { startSession, endSession } = useSessionFlow();

    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        if(!isRunning || !startTime) return;

        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    return (
        <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">
                    Focus Session
                </h2>

                <span className={`px-3 py-1 text-xs rounded-full ${isRunning ? 'bg-green-500/10 text-green-400' : 'bg-zinc-700/30 text-zinc-400'}`}>
                    {isRunning ? 'Active' : 'Inactive'}
                </span>
            </div>

            <div className="text-center space-y-4">
                { isRunning ? (
                    <>
                        <div className="text-5xl font-mono text-white">
                            {Math.floor(elapsed / 60)} : {String(elapsed % 60).padStart(2, "0")}
                        </div>

                        <p className="text-sm text-zinc-400">
                            Stay focused. You're doing deep work.
                        </p>
                    </> 
                    ) : (
                    <>
                        <p className="text-zinc-400 text-sm">
                            No active session
                        </p>
                        <p className="text-zinc-500 text-xs">
                            Start a session when you're ready to focus
                        </p>
                    </>
                    )}
            </div>

            <button 
            onClick={() => isRunning ? endSession({ selfReportedFocus: 3 }) : startSession({
                topic: 'Kafka Integration',
                difficulty: 4,
                intent: 'Learning'
            })}
            className={`w-full py-2 rounded-xl font-medium transition ${ isRunning ? 'bg-red-600 hover:bg-red-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
                {isRunning ? 'End Session' : 'Start Session'}
            </button>
        </div>
    )
}

export default SessionCard;