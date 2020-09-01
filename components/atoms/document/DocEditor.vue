<template>
  <div class="editor-container">
    <textarea
      :ref="`cmeditor`"
      :placeholder="'Text or Markdown'"
      @input="$emit('input', $event.target.value)"
      v-text="pMarkdown"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
const editor = require('@/scripts/editor/editor.ts')
const ot = require('@/scripts/editor/ot/ot.js')
const socket = require('@/scripts/editor/ot/websocket.js')

@Component
export default class DocEditor extends Vue {
  websocket: any = null
  cMirror: any = null
  serverAdapter: any = null
  editorAdapter: any = null
  otClient: any = null

  @Prop({ default: '' })
  pMarkdown!: string

  mounted() {
    this.cMirror = editor.newEditor(this.$refs.cmeditor)

    this.cMirror.on('change', this.changeEvent)
    // cMirror.on('drop', this.dropEvent)

    const url = 'ws://localhost:8081/v1/ws'
    // const url = 'ws://localhost:3001/ws'
    this.websocket = new socket.SocketConnection(url)
    this.serverAdapter = new socket.SocketConnectionAdapter(this.websocket)
    this.editorAdapter = new ot.CodeMirrorAdapter(this.cMirror)
    this.websocket.on('registered', this.registeredEvent)
    this.websocket.on('join', this.joinEvent)
    this.websocket.on('quit', this.quitEvent)
    this.websocket.on('doc', this.docEvent)
  }

  beforeDestroy() {
    this.websocket.off('registered', this.registeredEvent)
    this.websocket.off('join', this.joinEvent)
    this.websocket.off('quit', this.quitEvent)
    this.websocket.off('doc', this.docEvent)
    this.cMirror = null
    this.serverAdapter = null
    this.editorAdapter = null
    this.otClient = null
  }

  destroyed() {
    this.websocket.close()
    this.websocket = null
  }

  //
  // CodeMirror Event
  //

  changeEvent(ev: any) {
    this.$emit('input', ev.getValue())
  }

  dropEvent(data: any, ev: any) {
    // editor.utils.drop(this.cMirror, ev, 'geekers-user-comment-image')
  }

  //
  // EventEmitter Event
  //

  registeredEvent(clientId: any) {
    this.cMirror.setOption('readOnly', false)
    console.log(clientId)
  }

  joinEvent(data: any) {
    console.log(data)
  }

  quitEvent(data: any) {
    console.log(data)
  }

  docEvent(data: any) {
    this.cMirror.setValue(data.document)
    this.otClient = new ot.EditorClient(
      data.revision,
      data.clients,
      this.serverAdapter,
      this.editorAdapter
    )
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
  background-color: #444;
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
