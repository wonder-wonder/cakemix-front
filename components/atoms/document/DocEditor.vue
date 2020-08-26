<template>
  <div class="editor-container">
    <textarea
      :ref="`editor`"
      :placeholder="'Text or Markdown'"
      @input="$emit('input', $event.target.value)"
      v-text="pMarkdown"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import editor from '@/scripts/editor/editor.ts'
const ot = require('@/scripts/editor/ot/ot.js')
const socket = require('@/scripts/editor/ot/websocket.js')

@Component
export default class DocEditor extends Vue {
  cMirror: any
  otClient: any

  @Prop({ default: '' })
  pMarkdown!: string

  mounted() {
    const editorDom = this.$refs.editor as HTMLTextAreaElement
    this.cMirror = editor.newEditor(editorDom)
    this.cMirror.on('change', (ev: any) => {
      this.$emit('input', ev.getValue())
    })
    // this.cMirror.on('drop', (data: any, ev: any) => {
    //   editor.utils.drop(this.cMirror, ev, 'geekers-user-comment-image')
    // })

    const cMirror = this.cMirror
    const url = 'ws://localhost:8081/v1/ws'

    const conn = new socket.SocketConnection(url)
    let otClient

    conn.on('open', function () {})

    conn.on('close', function () {})

    conn.on('registered', function (clientId: any) {
      cMirror.setOption('readOnly', false)
      console.log(clientId)
    })

    conn.on('join', function (data: any) {
      console.log(data)
    })

    conn.on('quit', function (data: any) {
      console.log(data)
    })

    conn.on('doc', function (data: any) {
      cMirror.setValue(data.document)
      const serverAdapter = new socket.SocketConnectionAdapter(conn)
      const editorAdapter = new ot.CodeMirrorAdapter(cMirror)
      otClient = new ot.EditorClient(
        data.revision,
        data.clients,
        serverAdapter,
        editorAdapter
      )
    })

    this.otClient = otClient
  }
}
</script>

<style lang="scss">
.editor-container {
  overflow: scroll;
}

.CodeMirror {
  font-family: 'Source Code Pro', Consolas, monaco, monospace;
  font-size: 14px;
  width: 100%;
  height: 100%;
}

.CodeMirror[lang^='ja'] {
  font-family: 'Source Code Pro', Consolas, monaco, Meiryo, 'ＭＳ ゴシック',
    'MS Gothic', monospace;
}

.input-items {
  display: flex;
  flex-flow: row nowrap;

  .item {
    height: 25px;
    width: 25px;
    margin: 0 0 5px 5px;
  }
}

input[type='file'] {
  display: none;
}

.input-label {
  height: 25px;
  width: 30px;
}
</style>
