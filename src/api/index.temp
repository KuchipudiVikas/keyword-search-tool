import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
const api: AxiosInstance = axios.create({
  baseURL: 'http://url', // Your API base URL
  // Add any other configuration here
});

// Request interceptor to add the user token to every request
api.interceptors.request.use(async (config) => {
  const userToken = 'userToken'
  if(userToken) {
    config.headers.Authorization = `Bearer ${userToken}`; // You may need to adjust this line based on how your API expects the token
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle global response behavior
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    // Handle global error behavior
    return Promise.reject(error);
  }
);

export {
    api
}