import { useQuery } from '@tanstack/react-query';
import { fetchMetrics } from '../Services/Metrics.api';

export const useMetrics = () => {
    return useQuery({
        queryKey: ['metrics'],
        queryFn: fetchMetrics,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    })
}

