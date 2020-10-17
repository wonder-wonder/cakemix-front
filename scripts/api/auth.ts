const common = require('@/scripts/api/common')

const AUTHLOGIN = '/auth/login'

function login(id: string, pass: string) {
  return fetch(common.APIBASE + AUTHLOGIN, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      id,
      pass,
    }),
  })
    .then(res => {
      if (!res.ok) throw res
      return res.json()
    })
    .then(res => res.jwt)
    .catch(() => '')
}
export { login }
