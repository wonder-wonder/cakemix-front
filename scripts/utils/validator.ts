export const emailValidator = (text: string): boolean => {
  const reg: RegExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-\\+]*@.+$/
  return reg.test(text)
}

export const passwordValidator = (text: string): boolean => {
  const reg: RegExp = /^(?=.*?[a-z])(?=.*?\d)[a-z\d!-\\/:-@[-`{-~]{8,100}$/i
  return reg.test(text)
}
