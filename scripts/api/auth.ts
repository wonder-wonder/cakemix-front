import axios from 'axios'
const common = require('@/scripts/api/common')

const AUTHLOGIN = '/auth/login'

interface LoginResponse {
  jwt: string
}

function login(id: string, pass: string) {
  return axios
    .post<LoginResponse>(common.APIBASE + AUTHLOGIN, {
      id,
      pass,
    })
    .then(res => res.data.jwt)
    .catch(() => '')
}

export { login }
