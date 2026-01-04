import { api, attachAuthInterceptor } from './Api';

export const startSessionApi = async (payload) => {
    const response = await api.post('api/session/start', payload);
    return response.data;
}
export const endSessionApi = async ({ sessionId, payload }) => {
    const response = await api.post(`/api/session/end/${sessionId}`, payload);
    return response.data;
}



