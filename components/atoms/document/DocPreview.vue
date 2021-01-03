<template>
  <div :ref="`previewerc`" class="preview-container">
    <div :ref="`previewer`" class="previewer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import vdom from '@/scripts/markdown/vdom.ts'
const ss = require('@/scripts/editor/scrollsyncer.ts')

export type DataType = {
  baseDom: HTMLElement | null
  scrollDom: HTMLElement | null
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
      baseDom: null,
      scrollDom: null,
    }
  },
  watch: {
    pMarkdown(text: string) {
      if (!this.baseDom) {
        return
      }
      vdom.update(this.baseDom, text)
      this.updatePoint()
    },
    currentPos(height: number) {
      const el: HTMLElement = this.$refs.previewerc as HTMLElement
      el.scrollTop = height
    },
  },
  created() {
    vdom.init()
  },
  mounted() {
    this.baseDom = this.$refs.previewer as HTMLElement
    // this.scrollDom = this.$refs.previewerc as HTMLElement
    // this.scrollDom.addEventListener('scroll', this.scrolled)
  },
  methods: {
    updatePoint() {
      if (!this.baseDom) {
        return
      }
      const el = this.baseDom.firstChild
      if (!el) {
        return
      }
      const checkPoint = ss.analyzeDom(el)
      this.$emit('update', checkPoint)
    },
    // scrolled() {
    //   if (!this.scrollDom) {
    //     return
    //   }
    //   this.$emit('updatepos', this.scrollDom.scrollTop)
    // },
  },
})
</script>

<style lang="scss">
.preview-container {
  display: flex;
  justify-content: center;
  overflow: scroll;

  .invisible {
    display: none;
  }

  .previewer {
    width: 100%;
    max-width: 800px;
    height: 100%;
    padding: 16px;
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
