import { useSessionStore } from '../Store/Session.store';
import { useEndSession, useStartSession } from '../Queries/Session.queries';

export const useSessionFlow = () => {
    const isRunning = useSessionStore(state => state.isRunning);
    const activeSessionId = useSessionStore(state => state.activeSessionId);
    const startMutation = useStartSession();
    const endMutation = useEndSession();

    const startSession = (payload) => {
        if (startMutation.isPending) return;
        startMutation.mutate(payload);
    };

    const endSession = (payload) => {

        endMutation.mutate({
            sessionId: activeSessionId,
            payload,
        });
    };

    return {
        isRunning,
        isStarting: startMutation.isPending,
        isEnding: endMutation.isPending,
        startSession,
        endSession,
    };
};