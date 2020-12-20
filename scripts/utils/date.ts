export const toDate = (utime: number): string => {
  const dt = new Date(utime * 1000)
  if (dt.toString() === 'Invalid Date') {
    return ''
  }
  const year = dt.getFullYear()
  const month = dt.getMonth() + 1
  const day = dt.getDate()
  const hour = ('0' + dt.getHours()).slice(-2)
  const min = ('0' + dt.getMinutes()).slice(-2)
  const sec = ('0' + dt.getSeconds()).slice(-2)

  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
}
