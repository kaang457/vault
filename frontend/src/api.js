import axios from 'axios'
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN)
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}token/refresh/`,
    {
      refresh: refreshToken
    }
  )
  const newAccessToken = response.data.access
  localStorage.setItem(ACCESS_TOKEN, newAccessToken)
  return newAccessToken
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newAccessToken = await refreshAccessToken()

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError)

        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api
