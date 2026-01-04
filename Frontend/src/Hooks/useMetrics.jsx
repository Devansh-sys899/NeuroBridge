import { useQuery } from '@tanstack/react-query';
import { fetchMetrics } from '../Services/Metrics.api';

export const useMetrics = () => {
    return useQuery({
        queryKey: ['Metrics'],
        queryFn: fetchMetrics,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    })
}

