import axios from 'axios';

// Create axios instance.
const axiosInstance = axios.create({
	baseURL: process.env.API_URL,
	withCredentials: true,
	timeout: 1000 * 2,
});

export default axiosInstance;
