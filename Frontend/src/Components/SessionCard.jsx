import { useEffect, useState } from "react";
import { useSessionStore } from '../Store/Session.store';
import { useSessionFlow } from '../Hooks/useSessionFlow';
import EndSessionModal from "./EndSessionModal";

const SessionCard = () => {
    const isRunning = useSessionStore(s => s.isRunning);
    const startTime = useSessionStore(s => s.startTime);

    const { startSession, endSession } = useSessionFlow();

    const [elapsed, setElapsed] = useState(0);
    const [showEndModal, setShowEndModal] = useState(false);

    useEffect(() => {
        if(!isRunning || !startTime) return;

        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    return (
        <div className="max-w-xl w-full bg-surface border border-border rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-textMain">
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

                        <p className="text-sm text-textMuted">
                            Stay focused. You're doing deep work.
                        </p>
                    </> 
                    ) : (
                    <>
                        <p className="text-textMuted text-sm">
                            No active session
                        </p>
                        <p className="text-textMuted text-xs">
                            Start a session when you're ready to focus
                        </p>
                    </>
                    )}
            </div>

            <button 
            onClick={() => {
                if(isRunning) {
                    setShowEndModal(true)
                } else {
                    startSession({
                        topic: "Deep work",
                        difficulty: 3,
                        intent: 'Revise'
                    })
                };
            }}
            className={`w-full py-2 rounded-xl font-medium transition ${ isRunning ? 'bg-red-600 hover:bg-red-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
                {isRunning ? 'End Session' : 'Start Session'}
            </button>

            <EndSessionModal 
            open={showEndModal}
            onClose={() => setShowEndModal(false)}
            onConfirm={(focus) => {
                endSession({ selfReportedFocus: focus });
                setShowEndModal(false);
            }}
            />
        </div>

    )
}

export default SessionCard;