import { useAuth } from '@clerk/clerk-react'

const useAuthToken = () => {
    const { getToken } = useAuth();

    const getAuthToken = async () => {
        return await getToken();
    }
}

export default useAuthToken;