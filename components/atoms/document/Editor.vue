<template>
  <div>
    <textarea
      :ref="`editor`"
      :placeholder="'Text or Markdown'"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import editor from '@/scripts/editor/editor.ts'

@Component
export default class Editor extends Vue {
  cMirror: any

  mounted() {
    const editorDom = this.$refs.editor as HTMLTextAreaElement
    this.cMirror = editor.newEditor(editorDom)
    this.cMirror.on('change', (ev: any) => {
      this.$emit('input', ev.getValue())
    })
    // this.cMirror.on('drop', (data: any, ev: any) => {
    //   editor.utils.drop(this.cMirror, ev, 'geekers-user-comment-image')
    // })
  }
}
</script>

<style lang="scss">
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
