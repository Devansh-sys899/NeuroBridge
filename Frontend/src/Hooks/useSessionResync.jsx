import { useEffect } from 'react';
import { useSessionStore } from '../Store/Session.store';
import { requestSessionResync, onSessionResynced, getSocket } from '../Sockets/Socket.client';

export const useSessionResync = () => {
    const restoreSession = useSessionStore(s => s.restoreSession);

    useEffect(() => {

        const socket = getSocket();
        if(!socket) return;

        const sessionId = localStorage.getItem('activeSessionId');
        if(!sessionId) return;

        const onConnect = () => {
            requestSessionResync(sessionId);
        }

        socket.on("connect", onConnect);

        onSessionResynced((session) => {
            console.log('Session resynced:', session);
            restoreSession(session);
        })

        return () => {
            socket.off('SESSION_RESYNCED', handleResync);
        }
    }, []);
}

