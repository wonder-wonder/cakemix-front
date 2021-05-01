const TOAST_TYPE = {
  LOGIN: 'login',
  RESET_PASSWD: 'reset_passwd',
  CHANGE_PASSWD: 'change_passed',
  SIGNUP: 'signup',
  VERITY_TOKEN: 'verify_token',
  GET_FOLDER: 'get_folder',
  MOVE_FOLDER_DOCUMENT: 'move_folder_document',
  SET_NAME: 'set_name',
  SEARCH: 'search',
  ADD_NEW_MEMBER: 'add_new_member',
  REMOVE_MEMBER: 'remove_member',
  GET_PERMISSION: 'get_permission',
  CHANGE_PERMISSION: 'change_permission',
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
  CANNOT_OPEN: 'cannot_open',
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
    failure: 'Failed to login',
  } as descModel,
  reset_passwd: {
    success: 'Password reset requested. Confirmation mail will be sent',
    failure: 'Failed to reset password',
  } as descModel,
  change_passed: {
    success: 'Password changed',
    failure: 'Failed to change password',
  } as descModel,
  signup: {
    success: 'Signup requested. Confirmation mail will be sent',
    failure: 'Failed to signup',
  } as descModel,
  verify_token: {
    success: 'Token verified',
    failure: 'Failed to verify token',
  } as descModel,
  get_folder: {
    success: '',
    failure: 'Failed to get folder list',
  } as descModel,
  move_folder_document: {
    success: 'Moved',
    failure: 'Failed to move',
  } as descModel,
  set_name: {
    success: '',
    failure: 'Need to set name',
  } as descModel,
  search: {
    success: '',
    failure: 'Failed to search',
  } as descModel,
  add_new_member: {
    success: 'Member added',
    failure: 'Failed to add member',
  } as descModel,
  remove_member: {
    success: 'Member removed',
    failure: 'Failed to remove member',
  } as descModel,
  get_member: {
    success: '',
    failure: 'Failed to get member',
  } as descModel,
  get_permission: {
    success: '',
    failure: 'Failed to get permission',
  } as descModel,
  change_permission: {
    success: 'Permission changed',
    failure: 'Failed to change permission',
  } as descModel,
  delete_team: {
    success: 'Team deleted',
    failure: 'Failed to delete team',
  } as descModel,
  update_folder_document: {
    success: 'Updated',
    failure: 'Failed to update',
  } as descModel,
  delete_folder_document: {
    success: 'Deleted',
    failure: 'Failed to delete',
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
    success: 'Team created',
    failure: 'Failed to create team',
  } as descModel,
  update_profile: {
    success: 'Profile updated',
    failure: 'Failed to update profile',
  } as descModel,
  get_auth_log: {
    success: '',
    failure: 'Failed to get security log',
  } as descModel,
  get_session: {
    success: '',
    failure: 'Failed to get session',
  } as descModel,
  delete_session: {
    success: 'Selected session deleted',
    failure: 'Failed to delete session',
  } as descModel,
  generate_new_link: {
    success: '',
    failure: 'Failed to generate invitation link',
  } as descModel,
  open_document: {
    success: '',
    failure: 'Failed to open document',
  } as descModel,
  create_folder: {
    success: '',
    failure: 'Failed to create folder',
  } as descModel,
  create_document: {
    success: '',
    failure: 'Failed to create document',
  } as descModel,
  cannot_open: {
    success: '',
    failure: "You don't have permission to open",
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
