import { ImageApi } from '@/scripts/api/index'
import { emojiList, EmojiType } from '@/scripts/markdown/emojis'
import CodeMirror from '@/node_modules/@types/codemirror/index'

export const drop = (self: any, cm: CodeMirror.Editor, ev: any) => {
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
export const emojiAC = (CodeMirror: any, cm: CodeMirror.Editor) => {  
  CodeMirror.showHint(
    cm,
    function () {
      const cur = cm.getCursor()
      const line = cur.line
      const end = cur.ch
      const token = cm.getTokenAt(cur).string.slice(0, end)
      const start = token.lastIndexOf(":") + 1
      const cnt = (token.match(/:/g) ?? []).length    
      if (start === -1 || cnt % 2 === 0) return
      const word = token.slice(start, end)
      const list = emojiList.filter((item: EmojiType) => {
        return item.text.indexOf(word) !== -1
      }).slice(0, 10)
      if (list.length === 0) return
      return {
        list: list,
        from: CodeMirror.Pos(line, start),
        to: CodeMirror.Pos(line, end),
      }
    },
    { completeSingle: false }
  )
}
