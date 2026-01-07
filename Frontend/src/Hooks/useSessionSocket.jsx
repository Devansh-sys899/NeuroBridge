import { useEffect } from "react";
import { useAuth } from '@clerk/clerk-react';
import { connectSocket, disconnectSocket } from '../Sockets/Socket.client';
import { useSocketStore } from '../Store/Socket.store';

export const useSessionSocket = () => {
    const { getToken, isLoaded, isSignedIn } = useAuth();

    useEffect( () => {
        if(!isLoaded || !isSignedIn) return;
        
        const init = async () => {
            const token = await getToken();

            const socket = connectSocket(token);

            socket.on('connect', () => {
                console.log('Socket connected:', socket.id);
                useSocketStore.getState().setSocketReady(true);
            })

            socket.on('disconnect', () => {
                console.log('Socket disconnected');
                useSocketStore.getState().setSocketReady(false);
            })
        }

        init();

        return () => {
            disconnectSocket();
        }
    }, [isLoaded, isSignedIn, getToken]);
}

