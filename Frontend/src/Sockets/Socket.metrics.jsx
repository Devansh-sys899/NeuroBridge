import { getSocket } from './Socket.server';
import { queryClient } from '../Lib/reactQuery';

export const registerMetricsSocketEvents = () => {
    const socket = getSocket();

    socket.on('metrics:updated', () => {
        queryClient.invalidateQueries(['Metrics']);
    })
}

