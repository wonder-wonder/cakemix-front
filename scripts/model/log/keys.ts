export const getKey = (key: string): string => {
  switch (key) {
    case 'sessionid':
      return 'Session ID'
    case 'ipaddr':
      return 'IP Address'
    case 'devinfo':
      return 'Device Information'
    default:
      return 'Unknown'
  }
}
