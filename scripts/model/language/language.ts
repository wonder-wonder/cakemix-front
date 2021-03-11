export type languageModel = {
  abb: string
  full: string
}

export const languages: languageModel[] = [
  {
    abb: 'ja',
    full: 'Japanese',
  },
  {
    abb: 'en',
    full: 'English',
  },
]

export const getFullName = (abb: string): string => {
  let langs: string[] = languages.map(l => l.full)
  langs = langs.concat(languages.map(l => l.abb))
  const idx = langs.indexOf(abb)
  if (idx === -1) {
    return ''
  }
  return languages[idx % (langs.length / 2)].full
}

export const getAbbreviation = (full: string): string => {
  let langs: string[] = languages.map(l => l.abb)
  langs = langs.concat(languages.map(l => l.full))
  const idx = langs.indexOf(full)
  if (idx === -1) {
    return ''
  }
  return languages[idx % (langs.length / 2)].abb
}

export const getLanguageList = (): string[] => {
  return languages.map(l => l.full)
}
