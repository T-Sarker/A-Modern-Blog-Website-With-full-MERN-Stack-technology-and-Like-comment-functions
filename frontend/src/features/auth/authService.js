import axios from 'axios'

export const registerService = (userData) => axios.post('/api/v1/user/register', userData)

export const loginService = (userData) => axios.post('/api/v1/user/login', userData)
