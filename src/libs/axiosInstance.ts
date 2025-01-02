import axios from 'axios'

import authConfig from '@/configs/auth'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem(authConfig.storageTokenKeyName)

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default axiosInstance
