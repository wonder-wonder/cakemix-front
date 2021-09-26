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
  root.style.setProperty('--danger-color', THEME[id]['--danger-color'])
  // preview document below
  root.style.setProperty(
    '--preview-style-background',
    THEME[id]['--preview-style-background']
  )
  root.style.setProperty(
    '--preview-style-font',
    THEME[id]['--preview-style-font']
  )
  root.style.setProperty('--preview-style1', THEME[id]['--preview-style1'])
  root.style.setProperty('--preview-style2', THEME[id]['--preview-style2'])
  root.style.setProperty('--preview-style3', THEME[id]['--preview-style3'])
}
export const THEMELIST = ['Light', 'Dark']

const THEME: { [key: string]: { [key: string]: string } } = {
  light: {
    '--main-color': '#EEEEEE',
    '--sub-main-color': '#FFFFFF',
    '--contrast-color': '#000000',
    '--font-color': '#000000',
    '--accent-color': '#16A085',
    '--sub-accent-color': '#CC8D2E',
    '--danger-color': '#E74C3C',
    // preview document below
    '--preview-style-background': '#FFFFFF',
    '--preview-style-font': '#000000',
    '--preview-style1': '#1b1f23',
    '--preview-style2': '#6a737d',
    '--preview-style3': '#0366d6',
  },
  dark: {
    '--main-color': '#202020',
    '--sub-main-color': '#000000',
    '--contrast-color': '#FFFFFF',
    '--font-color': '#FFFFFF',
    '--accent-color': '#16A085',
    '--sub-accent-color': '#CC8D2E',
    '--danger-color': '#E74C3C',
    // preview document below
    '--preview-style-background': '#202020',
    '--preview-style-font': '#FFFFFF',
    '--preview-style1': '#1b1f23',
    '--preview-style2': '#cecece',
    '--preview-style3': '#3b99ff',
  },
}
