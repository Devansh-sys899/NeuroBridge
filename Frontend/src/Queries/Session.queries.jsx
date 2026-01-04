import { useMutation } from '@tanstack/react-query';
import { useSessionStore } from '../Store/Session.store';
import { startSessionApi, endSessionApi } from '../Services/Session.api';

export const useStartSession = () => {
    const startSession = useSessionStore(state => state.startSession);
    
    return useMutation({
        mutationFn: (payload) => startSessionApi(payload),
        onSuccess: (data) => {
            console.log('Data:', data);
            startSession(data.sessionId);
        }
    })
}

export const useEndSession = () => {
    const { stopSession } = useSessionStore();

    return  useMutation({
        mutationFn: ({ sessionId, payload }) => {
            return endSessionApi({ sessionId, payload });
        },
        onSuccess: (data) => {
            stopSession();
        }
        })
}

