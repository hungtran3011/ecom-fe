import axiosInstance from './axios';

export function useApiClient() {
  return {
    get: async (url, options = {}) => {
      const response = await axiosInstance.get(url.replace(axiosInstance.defaults.baseURL, ''), options);
      return response;
    },
    
    post: async (url, data, options = {}) => {
      const response = await axiosInstance.post(url.replace(axiosInstance.defaults.baseURL, ''), data, options);
      return response;
    },
    
    put: async (url, data, options = {}) => {
      const response = await axiosInstance.put(url.replace(axiosInstance.defaults.baseURL, ''), data, options);
      return response;
    },
    
    delete: async (url, options = {}) => {
      const response = await axiosInstance.delete(url.replace(axiosInstance.defaults.baseURL, ''), options);
      return response;
    }
  };
}