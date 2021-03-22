const TOAST_TYPE = {
  LOGIN: 'login',
  RESET_PASSWD: 'reset_passwd',
  CHANGE_PASSWD: 'change_passed',
  SIGNUP: 'signup',
  TOKEN_VERITY: 'token_verify',
  GET_FOLDER: 'get_folder',
  MOVE_FOLDER_DOCUMENT: 'move_folder_document',
  SET_NAME: 'set_name',
  SEARCH: 'search',
  ADD_NEW_MEMBER: 'add_new_member',
  REMOVE_MEMBER: 'remove_member',
  GET_PERMISSION: 'get_permission',
  UPGRADE_PERMISSION: 'upgrade_permission',
  GET_MEMBER: 'get_member',
  DELETE_TEAM: 'delete_team',
  UPDATE_FOLDER_DOCUMENT: 'update_folder_document',
  DELETE_FOLDER_DOCUMENT: 'delete_folder_document',
  SET_FOLDER_NAME: 'set_folder_name',
  SET_TEAM_NAME: 'set_team_name',
  CREATE_NEW_TEAM: 'create_new_team',
  UPDATE_PROFILE: 'update_profile',
  GET_AUTH_LOG: 'get_auth_log',
  GET_SESSION: 'get_session',
  DELETE_SESSION: 'delete_session',
  GENERATE_NEW_LINK: 'generate_new_link',
  OPEN_DOCUMENT: 'open_document',
  CREATE_FOLDER: 'create_folder',
  CREATE_DOCUMENT: 'create_document',
  UNKNOWN: 'unknown',
} as const
type ToastType = typeof TOAST_TYPE[keyof typeof TOAST_TYPE]

type descModel = {
  success: string
  failure: string
}

const toastDescriptions: { [key: string]: descModel } = {
  login: {
    success: '',
    failure: 'Login failed',
  } as descModel,
  reset_passwd: {
    success: 'Reset password requested, verification URL will be sent',
    failure: 'Unable to reset password',
  } as descModel,
  change_passed: {
    success: 'Password changed',
    failure: 'Unable to change password',
  } as descModel,
  signup: {
    success: 'Signup requested, verification URL will be sent',
    failure: 'Signup failed',
  } as descModel,
  token_verify: {
    success: 'Token verified',
    failure: 'Token verification failed',
  } as descModel,
  get_folder: {
    success: '',
    failure: 'Unable to get folder list',
  } as descModel,
  move_folder_document: {
    success: 'Moved',
    failure: 'Unable to move',
  } as descModel,
  set_name: {
    success: '',
    failure: 'Need to set name',
  } as descModel,
  search: {
    success: '',
    failure: 'Unable to search',
  } as descModel,
  add_new_member: {
    success: 'Member added',
    failure: 'Unable to add a member',
  } as descModel,
  remove_member: {
    success: 'Member removed',
    failure: 'Unable to remove member',
  } as descModel,
  get_member: {
    success: '',
    failure: 'Unable to get member',
  } as descModel,
  get_permission: {
    success: '',
    failure: 'Unable to get own permission',
  } as descModel,
  upgrade_permission: {
    success: 'Permission changed',
    failure: 'Unable to change permission',
  } as descModel,
  delete_team: {
    success: 'Team deleted',
    failure: 'Unable to delete team',
  } as descModel,
  update_folder_document: {
    success: 'Updated',
    failure: 'Unable to update',
  } as descModel,
  delete_folder_document: {
    success: 'Deleted',
    failure: 'Unable to delete',
  } as descModel,
  set_folder_name: {
    success: '',
    failure: 'Need to set folder name',
  } as descModel,
  set_team_name: {
    success: '',
    failure: 'Need to set team name',
  } as descModel,
  create_new_team: {
    success: 'New team created',
    failure: 'Unable to create team',
  } as descModel,
  update_profile: {
    success: 'Profile updated',
    failure: 'Unable to update profile',
  } as descModel,
  get_auth_log: {
    success: '',
    failure: 'Unable to get security log',
  } as descModel,
  get_session: {
    success: '',
    failure: 'Unable to get session',
  } as descModel,
  delete_session: {
    success: 'Selected session deleted',
    failure: 'Unable to delete session',
  } as descModel,
  generate_new_link: {
    success: '',
    failure: 'Unable to generate invitation link',
  } as descModel,
  open_document: {
    success: '',
    failure: 'Unable to open this document',
  } as descModel,
  create_folder: {
    success: '',
    failure: 'Unable to create new folder',
  } as descModel,
  create_document: {
    success: '',
    failure: 'Unable to create new document',
  } as descModel,
  unknown: {
    success: 'Success',
    failure: 'Failure',
  } as descModel,
}

const MODAL_TYPE = {
  OWNER_TRANSFER: 'owner_transfer',
  DELETE_TEAM: 'delete_team',
  DELETE_CONFIRM: 'delete_confirm',
  DELETE_SESSION_CONFIRM: 'delete_session_confirm',
  CLOSE_DOCUMENT_SESSION: 'close_document_session',
  UNKNOWN: 'unknown',
} as const
type ModalType = typeof MODAL_TYPE[keyof typeof MODAL_TYPE]

const modalDescriptions: { [key: string]: string } = {
  owner_transfer: 'Owner will be transferred to other, are you sure?',
  delete_team: 'Do you want to delete this team?',
  delete_confirm: 'Do you want to delete this item?',
  delete_session_confirm: 'Do you want to delete this session?',
  close_document_session: 'Do you want to reconnect?',
  unknown: 'Are you sure?',
}

const getToastDesc = (key: ToastType): descModel => {
  if (toastDescriptions[key] === undefined) {
    return toastDescriptions[TOAST_TYPE.UNKNOWN]
  }
  return toastDescriptions[key]
}

const getModalDesc = (key: ModalType): string => {
  if (modalDescriptions[key] === undefined) {
    return modalDescriptions[MODAL_TYPE.UNKNOWN]
  }
  return modalDescriptions[key]
}

export { TOAST_TYPE, MODAL_TYPE, getToastDesc, getModalDesc }
