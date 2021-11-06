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
import { WS_BASE_URL } from '@/scripts/api/base'
import { Editor } from '@/node_modules/@types/codemirror/index'
import { UserModel } from '@/scripts/model/user/manager'
import { getModalDesc, MODAL_TYPE } from '@/scripts/model/toast'
const editor = require('@/scripts/editor/editor.ts')
const utils = require('@/scripts/editor/utils.ts')
const ss = require('@/scripts/editor/scrollsyncer.ts')
const ot = require('@/scripts/editor/ot/ot.js')
const socket = require('@/scripts/editor/ot/websocket.js')
const colormaker = require('@/scripts/editor/colormaker.js')

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
    willDelete: {
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
      const url = `${WS_BASE_URL}/doc/${this.$route.params.id}/ws`
      this.websocket = new socket.SocketConnection(url, !this.isEditable)
      this.serverAdapter = new socket.SocketConnectionAdapter(this.websocket)
      this.websocket.on('join', this.joinEvent)
      this.websocket.on('quit', this.quitEvent)
      this.websocket.on('doc', this.docEvent)
      this.websocket.on('close', this.closeEvent)
      this.websocket.on('open', this.openEvent)
    },
    //
    // CodeMirror Event
    //
    changeEvent(cm: Editor) {
      this.$emit('input', cm.getValue())
      const checkPoint = ss.analyzeMarkdown(cm.getValue())
      this.$emit('update', checkPoint)
      utils.emojiAC(editor.CodeMirror, cm)
    },
    scrollEvent(cm: Editor) {
      const scrollInfo = cm.getScrollInfo()
      const lineNumber = cm.lineAtHeight(scrollInfo.top, 'local')
      this.$emit('updatepos', lineNumber + 1)
    },
    dropEvent(data: any, cm: Editor) {
      utils.drop(this, data, cm)
    },
    //
    // EventEmitter Event
    //
    joinEvent(user: any) {
      const u = {
        id: user.id,
        uuid: user.uuid,
        name: user.name,
        icon: user.icon_uri,
        color: colormaker.hsl2hex(colormaker.hueFromName(user.name), 0.75, 0.5),
      } as UserModel
      this.$emit('addUser', [u])
    },
    quitEvent(id: string) {
      this.$emit('delUser', id)
    },
    docEvent(data: any) {
      this.cMirror.setValue(data.document)
      this.otClient = new ot.EditorClient(
        data.revision,
        data.clients,
        this.serverAdapter,
        this.editorAdapter
      )

      const us: UserModel[] = []
      for (const [k, v] of Object.entries(data.clients)) {
        const u = v as any
        us.push({
          id: k,
          uuid: u.uuid,
          name: u.name,
          icon: u.icon_uri,
          color: colormaker.hsl2hex(colormaker.hueFromName(u.name), 0.75, 0.5),
        } as UserModel)
      }
      this.$emit('addUser', us)
    },
    closeEvent() {
      if (this.willDelete) {
        return
      }
      // @ts-ignore
      this.$buefy.dialog.confirm({
        message: getModalDesc(MODAL_TYPE.CLOSE_DOCUMENT_SESSION),
        type: 'is-danger',
        onConfirm: () => this.makeConnection(),
        onCancel: () => this.$emit('toParentFolder'),
      })
    },
    openEvent() {
      this.websocket.send('auth', this.$store.getters['auth/token'])
    },
  },
})
</script>

<style lang="scss">
@import '../../../styles/codemirror.scss';

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
