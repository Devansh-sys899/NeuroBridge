import { create } from 'zustand';
import { joinSessionRoom, sendHeartbeat, forceEndSession } from '../Sockets/Socket.session';

export const useSessionStore = create((set, get) => ({
    activeSessionId: null,
    startTime: null,
    elapsedTime: 0,
    interruptions: 0,
    isRunning: false,

    startSession: (sessionId) => {
        localStorage.setItem('activeSessionId:', sessionId);

        set({
        activeSessionId: sessionId,
        startTime: Date.now(),
        elapsedTime: 0,
        interruptions: 0,
        isRunning: true,
    })
        joinSessionRoom(sessionId);
        console.log('Start Session from Zustand');
    },

    restoreSessoin: (session) => {
        set({
            activeSessionId: session._id,
            isRunning: session.status === 'Active',
            startTime: session.startTime,
            interruptions: session.interruptions ?? 0
        })        
    },

    heartbeat: () => {
        const { activeSessionId, isRunning } = get();
        if(!activeSessionId || !isRunning) return;

        sendHeartbeat(activeSessionId);
    },

    stopSession: () => {
        localStorage.removeItem('activeSessionId');
        
        set({
        isRunning: false,
        activeSessionId: null,
        startTime: null
    })
    console.log('Stop session called from zustand'); 
}
}));