import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL!,
    withCredentials: true,
});


apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.response.data.updateToken && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await apiClient.get('/auth/update-token');
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;