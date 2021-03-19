const siteName = 'Cakemix'

const PAGES = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  FORGOT_PASSWD: 'forget_passwd',
  RESET_PASSWD: 'reset_passwd',
  VERIFY_TOKEN: 'verify_token',
  PROFILE: 'profile',
  AUTH: 'authentication',
  USERS: 'users',
  TEAMS: 'teams',
  SECURITY_LOG: 'security_log',
  SESSION: 'session',
} as const
type Pages = typeof PAGES[keyof typeof PAGES]

type pageModel = {
  title: string
}

const titles: { [key: string]: pageModel } = {
  login: {
    title: 'Login',
  } as pageModel,
  signup: {
    title: 'Signup',
  } as pageModel,
  forget_passwd: {
    title: 'Forget Password',
  } as pageModel,
  reset_passwd: {
    title: 'Reset Password',
  } as pageModel,
  verify_token: {
    title: 'Verifying Token',
  } as pageModel,
  profile: {
    title: 'Profile',
  } as pageModel,
  authentication: {
    title: 'Authentication',
  } as pageModel,
  users: {
    title: 'Users',
  } as pageModel,
  teams: {
    title: 'Teams',
  } as pageModel,
  security_log: {
    title: 'Security Log',
  } as pageModel,
  session: {
    title: 'Session',
  } as pageModel,
}

const getTitle = (key: Pages): string => {
  if (titles[key] === undefined) {
    return `${siteName}`
  }
  return `${titles[key].title} | ${siteName}`
}
const getDocumentTitle = (docName: string): string => {
  return `${docName} | ${siteName}`
}
const getFolderTitle = (folderName: string): string => {
  return `${folderName} | ${siteName}`
}

export { PAGES, getTitle, getDocumentTitle, getFolderTitle }
