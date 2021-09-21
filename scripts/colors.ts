export const setTheme = (id: string) => {
  const root = document.querySelector(':root') as HTMLElement
  if (root === null && THEME.id === undefined) {
    return
  }
  root.style.setProperty('--background-color', THEME[id]['--background-color'])
  root.style.setProperty('--base-color', THEME[id]['--base-color'])
  root.style.setProperty('--main-color', THEME[id]['--main-color'])
  root.style.setProperty('--accent-color', THEME[id]['--accent-color'])
  root.style.setProperty('--sub-color', THEME[id]['--sub-color'])
  root.style.setProperty('--subAccent-color', THEME[id]['--subAccent-color'])
}

const THEME: { [key: string]: { [key: string]: string } } = {
  dark: {
    '--background-color': '#202020',
    '--base-color': '#f3f3f3',
    '--main-color': '#6495ed',
    '--accent-color': '#f4ce2a',
    '--sub-color': '#c33461',
    '--subAccent-color': '#808080',
  },
  light: {
    '--background-color': '#FFFFFF',
    '--base-color': '#f3f3f3',
    '--main-color': '#6495ed',
    '--accent-color': '#f4ce2a',
    '--sub-color': '#c33461',
    '--subAccent-color': '#808080',
  },
}
