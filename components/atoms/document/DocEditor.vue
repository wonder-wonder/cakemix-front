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
import Vue from 'vue'
const editor = require('@/scripts/editor/editor.ts')
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
    this.cMirror = editor.newEditor(this.$refs.cmeditor)
    this.cMirror.on('change', this.changeEvent)
    this.cMirror.on('scroll', this.scrollEvent)
    // cMirror.on('drop', this.dropEvent)
    const url =
      `${process.env.WS_SCHEME}://${process.env.BASE_PATH}/doc/` +
      this.$route.params.id +
      '/ws?token=' +
      this.$store.getters['auth/token']
    this.websocket = new socket.SocketConnection(url)
    this.serverAdapter = new socket.SocketConnectionAdapter(this.websocket)
    this.editorAdapter = new ot.CodeMirrorAdapter(this.cMirror)
    this.websocket.on('registered', this.registeredEvent)
    this.websocket.on('join', this.joinEvent)
    this.websocket.on('quit', this.quitEvent)
    this.websocket.on('doc', this.docEvent)
  },
  beforeDestroy() {
    this.websocket.off('registered', this.registeredEvent)
    this.websocket.off('join', this.joinEvent)
    this.websocket.off('quit', this.quitEvent)
    this.websocket.off('doc', this.docEvent)
    this.cMirror = null
    this.serverAdapter = null
    this.editorAdapter = null
    this.otClient = null
  },
  destroyed() {
    this.websocket.close()
    this.websocket = null
  },
  methods: {
    //
    // CodeMirror Event
    //
    changeEvent(ev: any) {
      this.$emit('input', ev.getValue())
      const checkPoint = ss.analyzeMarkdown(ev.getValue())
      this.$emit('update', checkPoint)
    },
    scrollEvent(ev: any) {
      const scrollInfo = ev.getScrollInfo()
      const lineNumber = ev.lineAtHeight(scrollInfo.top, 'local')
      this.$emit('updatepos', lineNumber + 1)
    },
    dropEvent(data: any, ev: any) {
      // editor.utils.drop(this.cMirror, ev, 'geekers-user-comment-image')
    },
    //
    // EventEmitter Event
    //
    registeredEvent(clientId: any) {
      this.cMirror.setOption('readOnly', false)
      console.log(clientId)
    },
    joinEvent(data: any) {
      console.log(data)
    },
    quitEvent(data: any) {
      console.log(data)
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
  },
})
</script>

<style lang="scss">
.editor-container {
  overflow: scroll;
}

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
