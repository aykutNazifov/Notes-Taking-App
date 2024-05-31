import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await apiClient.post('/auth/update-token');
                // originalRequest.headers.Cookie = `accessToken=${response.data.accessToken}`;
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