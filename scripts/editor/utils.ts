import { ImageApi } from '@/scripts/api/index'
import { emojis } from '@/scripts/markdown/emojis'
const CodeMirror = require('@/scripts/editor/codemirror.js')

export const drop = (self: any, cm: any, ev: any) => {
  const fs = ev.dataTransfer.files
  if (fs.length === 0) {
    return
  }
  for (let index = 0; index < fs.length; index += 1) {
    const f = fs[index]
    if (f.type.includes('image/')) {
      new ImageApi(self.$store.getters['auth/config'])
        .postImage(f)
        .then(res => {
          const id = res.data.id
          if (id !== undefined) {
            const url = `${process.env.HTTP_SCHEME}://${process.env.DOMAIN}${process.env.BASE_PATH}/image/${res.data.id}`
            insertTextAtCursor(cm, `![${f.name}](${url} =500x)`)
          }
        })
    }
  }
}

const insertTextAtCursor = (cm: any, text: string) => {
  const doc = cm.getDoc()
  const cursor = doc.getCursor()
  doc.replaceRange(text, cursor)
}

//
// Emoji Auto Complete
//
type EmojiType = {
  text: string
  render: Function
}
const emojiList: EmojiType[] = []
for (const key in emojis) {
  emojiList.push({
    text: `${key}:`,
    render: (el: HTMLElement) => {
      el.innerHTML = `<img width="15" height="15" src="${emojis.key}" alt="icon" async></img> ${key}`
    },
  } as EmojiType)
}

export const emojiAC = function (cm: CodeMirror) {
  cm.showHint(
    cm,
    function () {
      const cur = cm.getCursor()
      const token = cm.getTokenAt(cur)
      const start = token.start
      const end = cur.ch
      const word = token.string.slice(0, end - start)
      let ch = cur.ch
      const line = cur.line
      let currentWord = token.string
      while (ch-- > -1) {
        const t = cm.getTokenAt({ ch, line }).string
        if (t === ':') {
          const filteredList = emojiList.filter((item: EmojiType) => {
            return item.text.indexOf(currentWord) === 0
          })
          if (filteredList.length >= 1) {
            return {
              list: filteredList,
              from: cm.Pos(line, ch),
              to: cm.Pos(line, end),
            }
          }
        }
        currentWord = t + currentWord
      }
    },
    { completeSingle: false }
  )
}
