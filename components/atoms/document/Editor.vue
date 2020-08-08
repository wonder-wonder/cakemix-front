<template>
  <div>
    <textarea
      :ref="`editor`"
      :placeholder="'Text or Markdown'"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
import editor from '@/scripts/editor/editor'

export default {
  data() {
    return {
      cMirror: null,
    }
  },
  mounted() {
    const editorDom = this.$refs.editor
    this.cMirror = editor.newEditor(editorDom)
    this.cMirror.on('change', ev => {
      this.$emit('input', ev.getValue())
    })
    this.cMirror.on('drop', (data, ev) => {
      editor.utils.drop(this.cMirror, ev, 'geekers-user-comment-image')
    })
  },
  methods: {},
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
