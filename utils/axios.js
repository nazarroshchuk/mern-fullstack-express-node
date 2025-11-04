// utils/axios.js
import axios from 'axios';

// Create axios instance with default configuration
const apiAxios = axios.create({
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor for adding auth tokens, logging, etc.
apiAxios.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = process.env.API_TOKEN;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        }

        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for handling common errors
apiAxios.interceptors.response.use(
    (response) => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        }
        return response;
    },
    (error) => {
        // Handle common HTTP errors
        if (error.response) {
            const { status, data } = error.response;
            console.error(`❌ API Error ${status}:`, data.message || data);

            // Handle specific status codes
            switch (status) {
                case 401:
                    console.error('Unauthorized access - check your API credentials');
                    break;
                case 404:
                    console.error('API endpoint not found');
                    break;
                case 500:
                    console.error('Internal server error');
                    break;
                default:
                    console.error('API request failed');
            }
        } else if (error.request) {
            console.error('❌ Network Error: No response received');
        } else {
            console.error('❌ Request Setup Error:', error.message);
        }

        return Promise.reject(error);
    }
);

// Helper functions for common HTTP methods
export const api = {
    get: (url, config) => apiClient.get(url, config),
    post: (url, data, config) => apiClient.post(url, data, config),
    put: (url, data, config) => apiClient.put(url, data, config),
    delete: (url, config) => apiClient.delete(url, config),
    patch: (url, data, config) => apiClient.patch(url, data, config),
};

export default apiAxios;
