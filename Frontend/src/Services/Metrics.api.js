import axios from "axios";
import { api } from "./Api";

export const fetchMetrics = async () => {
    const res = await api.get('/metrics/');
    return res.data;
} 

