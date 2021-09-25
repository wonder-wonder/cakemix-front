export const setTheme = (id: string) => {
  const root = document.querySelector(':root') as HTMLElement
  if (root === null && THEME.id === undefined) {
    return
  }
  root.style.setProperty('--main-color', THEME[id]['--main-color'])
  root.style.setProperty('--sub-main-color', THEME[id]['--sub-main-color'])
  root.style.setProperty('--contrast-color', THEME[id]['--contrast-color'])
  root.style.setProperty('--font-color', THEME[id]['--font-color'])
  root.style.setProperty('--sub-accent-color', THEME[id]['--sub-accent-color'])
  root.style.setProperty('--accent-color', THEME[id]['--accent-color'])
  root.style.setProperty('--dangerous-color', THEME[id]['--dangerous-color'])
}

const THEME: { [key: string]: { [key: string]: string } } = {
  dark: {
    '--main-color': '#202020',
    '--sub-main-color': '#000000',
    '--contrast-color': '#FFFFFF',
    '--font-color': '#FFFFFF',
    '--accent-color': '#16A085',
    '--sub-accent-color': '#CC8D2E',
    '--dangerous-color': '#E74C3C',
  },
  light: {
    '--main-color': '#EEEEEE',
    '--sub-main-color': '#FFFFFF',
    '--contrast-color': '#000000',
    '--font-color': '#000000',
    '--accent-color': '#16A085',
    '--sub-accent-color': '#CC8D2E',
    '--dangerous-color': '#E74C3C',
  },
}
