export default function ({ route, store, redirect }) {
  if (store.getters['auth/isLoggedIn']) {
    if (route.path === '/' || route.path.match(/^\/auth\/.*/)) {
      redirect('/folder/')
      return
    }
    return
  }
  if (route.path === '/' || route.path.match(/^\/auth\/.*/)) return
  redirect('/auth/login')
}
