function getAuthCategory(smallCategory: string) {
  switch (smallCategory) {
    case 'login':
      return 'Logged in'
    case 'passreset':
      return 'Reset password'
    case 'passchange':
      return 'Changed password'
    default:
      return 'Unknown operation'
  }
}

export const getDescription = (
  bigCategory: string,
  smallCategory: string
): string => {
  switch (bigCategory) {
    case 'auth':
      return getAuthCategory(smallCategory)
    default:
      return 'Unknown operation'
  }
}
