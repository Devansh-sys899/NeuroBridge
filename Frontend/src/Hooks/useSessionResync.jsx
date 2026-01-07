import { useEffect } from 'react';
import { useSessionStore } from '../Store/Session.store';
import { useSocketStore } from '../Store/Socket.store';
import { requestSessionResync , getSocket } from '../Sockets/Socket.client';

export const useSessionResync = () => {
    const restoreSession = useSessionStore(s => s.restoreSession);
    const socketReady = useSocketStore(s => s.socketReady);

    useEffect(() => {
        if(!socketReady) return;

        const socket = getSocket();
        if(!socket) return;

        const sessionId = localStorage.getItem('activeSessionId');
        if(!sessionId) return;

        const handleResync = (session) => {
            console.log('[Resync] Session resynced:', session);
            restoreSession(session);
        }

        requestSessionResync(sessionId);
        socket.on('SESSION_RESYNCED', handleResync);

        return () => {
            socket.off('SESSION_RESYNCED', handleResync);
        }
    }, [socketReady, restoreSession]);
}

