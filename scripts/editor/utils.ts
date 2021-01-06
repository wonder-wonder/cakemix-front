import { ImageApi } from '@/scripts/api/index'

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
            insertTextAtCursor(cm, `![${f.name}](${url})`)
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
