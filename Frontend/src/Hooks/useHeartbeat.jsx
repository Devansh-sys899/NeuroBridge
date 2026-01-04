import { useEffect } from "react";
import { useSessionStore } from '../Store/Session.store';

export const useHeartbeat = () => {
    const isRunning = useSessionStore( state => state.isRunning);
    const heartbeat = useSessionStore( state => state.heartbeat);

    useEffect(() => {
        if(!isRunning) return;

        const interval = setInterval( () => {
            heartbeat()
        }, 30_000);

        return () => {
            clearInterval(interval);
        }
    }, [isRunning, heartbeat]);
}