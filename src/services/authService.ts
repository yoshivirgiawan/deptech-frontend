import axiosInstance from '@/libs/axiosInstance'

export const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const { data } = await axiosInstance.post('/auth/login', { email, password })

    return data
  },
  session: async () => {
    const { data } = await axiosInstance.get('/auth/sessions')

    return data
  },
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout')

    return response
  }
}
