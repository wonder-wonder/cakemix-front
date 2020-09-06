<template>
  <div class="preview-container">
    <div :ref="`previewer`" class="previewer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import vdom from '@/scripts/markdown/vdom.ts'

export type DataType = {
  baseDom: HTMLElement | null
}

export default Vue.extend({
  props: {
    pMarkdown: {
      type: String,
      default: '',
    },
  },
  data(): DataType {
    return {
      baseDom: null,
    }
  },
  watch: {
    pMarkdown(text: string) {
      if (!this.baseDom) {
        return
      }
      vdom.update(this.baseDom, text)
    },
  },
  mounted() {
    this.baseDom = this.$refs.previewer as HTMLElement
  },
})
</script>

<style lang="scss">
.preview-container {
  display: flex;
  justify-content: center;
  overflow: scroll;

  .previewer {
    width: 100%;
    max-width: 800px;
    height: 100%;
    padding: 10px;
  }

  .previewer::after {
    display: block;
    height: 32px;
    content: '';
  }
}
</style>

<style lang="css" src="katex/dist/katex.min.css"></style>
<style lang="css" src="abcjs/abcjs-midi.css"></style>
