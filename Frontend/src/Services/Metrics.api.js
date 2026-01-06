import axios from "axios";
import { api } from "./Api";

export const fetchMetrics = async () => {
    console.log('Fetching Metrics data...');
    const res = await api.get('/api/metrics/', {
        withCredentials: true
    });
    return res.data;
} 

