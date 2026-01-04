import { getSocket } from './Socket.client';

export const joinSessionRoom = (sessionId) => {
    const socket = getSocket();
    socket.emit("JOIN_SESSION", { sessionId });
}

export const sendHeartbeat = (sessionId) => {
    const socket = getSocket();
    socket.emit("SESSION_HEARTBEAT", { sessionId, ts: Date.now() });
    console.log('Session Heartbeat emitted');
}

export const forceEndSession = (sessionId) => {
    const socket = getSocket();
    socket.emit("SESSION_FORCE_END", { sessionId });
}

