import { useEffect } from "react";
import { useAuth } from '@clerk/clerk-react';
import { connectSocket, disconnectSocket } from '../Sockets/Socket.client';

export const useSessionSocket = () => {
    const { getToken, isLoaded, isSignedIn } = useAuth();

    useEffect( () => {
        if(!isLoaded || !isSignedIn) return;
        
        const init = async () => {
            const token = await getToken();

            const socket = connectSocket(token);

            socket.on('connect', () => {
                console.log('Socket connected:', socket.id);
            })

            socket.on('disconnect', () => {
                console.log('Socket disconnected');
            })
        }

        init();

        return () => {
            disconnectSocket();
        }
    }, [isLoaded, isSignedIn, getToken]);
}

