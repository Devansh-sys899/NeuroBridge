import { io } from 'socket.io-client';

let socket = null

export const connectSocket = (token) => {

    if(socket) return socket;

    socket = io(import.meta.env.VITE_SOCKET_URL, {
        auth: {token},
        withCredentials: true,
        transports: ['websocket']
    });
    
    return socket;
};

export const disconnectSocket = () => {
    if(socket) {
        socket.disconnect();
        socket = null;
    }
}

export const requestSessionResync = (sessionId) => {
    console.log('session resync request triggered from hook');
    socket.emit('SESSION_RESYNC', { sessionId });
}

export const onSessionResynced = (callback) => {
    if(!socket) return;
    const handler = (session) => {
        socket.on("SESSION_RESYNCED", callback(session));

        return () => {
            socket.off('SESSION_RESYNCED', handler);
        }
    }
}


export const getSocket = () => {
    return socket;
};