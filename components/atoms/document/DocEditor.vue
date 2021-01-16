<template>
  <div class="editor-container">
    <textarea
      ref="cmeditor"
      :placeholder="'Text or Markdown'"
      @input="$emit('input', $event.target.value)"
      v-text="pMarkdown"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Editor } from "@/node_modules/@types/codemirror/index"
const editor = require('@/scripts/editor/editor.ts')
const utils = require('@/scripts/editor/utils.ts')
const ss = require('@/scripts/editor/scrollsyncer.ts')
const ot = require('@/scripts/editor/ot/ot.js')
const socket = require('@/scripts/editor/ot/websocket.js')

export type DataType = {
  websocket: any
  cMirror: any
  serverAdapter: any
  editorAdapter: any
  otClient: any
}

export default Vue.extend({
  props: {
    pMarkdown: {
      type: String,
      default: '',
    },
    currentPos: {
      type: Number,
      default: 0,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  data(): DataType {
    return {
      websocket: null,
      cMirror: null,
      serverAdapter: null,
      editorAdapter: null,
      otClient: null,
    }
  },
  watch: {
    currentPos(pos: number) {
      this.cMirror.scrollIntoView(
        Math.min(pos, this.cMirror.lineCount() - 1),
        0
      )
    },
  },
  mounted() {
    this.loadEditor()
    this.makeConnection()
  },
  beforeDestroy() {
    if (this.websocket) {
      this.websocket.off('registered', this.registeredEvent)
      this.websocket.off('join', this.joinEvent)
      this.websocket.off('quit', this.quitEvent)
      this.websocket.off('doc', this.docEvent)
      this.websocket.off('close', this.closeEvent)
      this.websocket.close()
    }
    this.cMirror = null
    this.serverAdapter = null
    this.editorAdapter = null
    this.otClient = null
    this.websocket = null
  },
  methods: {
    loadEditor() {
      this.cMirror = editor.newEditor(this.$refs.cmeditor)
      this.cMirror.on('change', this.changeEvent)
      this.cMirror.on('scroll', this.scrollEvent)
      this.cMirror.on('drop', this.dropEvent)
      this.editorAdapter = new ot.CodeMirrorAdapter(this.cMirror)
    },
    makeConnection() {
      const url = `${process.env.WS_SCHEME}://${process.env.DOMAIN}${process.env.BASE_PATH}/doc/${this.$route.params.id}/ws?token=${this.$store.getters['auth/token']}`
      this.websocket = new socket.SocketConnection(url, !this.isEditable)
      this.serverAdapter = new socket.SocketConnectionAdapter(this.websocket)
      this.websocket.on('registered', this.registeredEvent)
      this.websocket.on('join', this.joinEvent)
      this.websocket.on('quit', this.quitEvent)
      this.websocket.on('doc', this.docEvent)
      this.websocket.on('close', this.closeEvent)
    },
    //
    // CodeMirror Event
    //
    changeEvent(ev: Editor) {
      this.$emit('input', ev.getValue())
      const checkPoint = ss.analyzeMarkdown(ev.getValue())
      this.$emit('update', checkPoint)
      // utils.emojiAC(this.cMirror)
    },
    scrollEvent(ev: Editor) {
      const scrollInfo = ev.getScrollInfo()
      const lineNumber = ev.lineAtHeight(scrollInfo.top, 'local')
      this.$emit('updatepos', lineNumber + 1)
    },
    dropEvent(data: any, ev: Editor) {
      utils.drop(this, data, ev)
    },
    //
    // EventEmitter Event
    //
    registeredEvent(clientId: string) {
      this.cMirror.setOption('readOnly', !this.isEditable)
      console.log(clientId)
    },
    joinEvent(ev: Editor) {
      console.log(ev)
    },
    quitEvent(ev: Editor) {
      console.log(ev)
    },
    docEvent(data: any) {
      this.cMirror.setValue(data.document)
      this.otClient = new ot.EditorClient(
        data.revision,
        data.clients,
        this.serverAdapter,
        this.editorAdapter
      )
    },
    closeEvent() {
      // @ts-ignore
      this.$buefy.dialog.confirm({
        message: 'Do you want to reconnect?',
        onConfirm: () => this.makeConnection(),
        onCancel: () => this.$emit('toParentFolder'),
      })
    },
  },
})
</script>

<style lang="scss">
.CodeMirror {
  font-family: 'Source Code Pro', Consolas, monaco, monospace;
  font-size: 16px;
  width: 100%;
  height: 100%;
  background-color: rgb(32, 32, 32);
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

<style lang="scss" scoped>
.editor-container {
  overflow: scroll;
}
</style>
