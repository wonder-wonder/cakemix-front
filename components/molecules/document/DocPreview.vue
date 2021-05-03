<template>
  <div :ref="`previewerc`" class="preview-container">
    <div :ref="`previewer`" class="previewer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import print from '@/scripts/utils/print'
import { debounce } from 'lodash'
import vdom from '@/scripts/markdown/vdom'
const ss = require('@/scripts/editor/scrollsyncer.ts')

export type DataType = {
  baseDom: HTMLElement | null
  scrollDom: HTMLElement | null
  updater: number
}

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
    openPrintView: {
      type: Number,
      default: 0,
    },
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
      updater: 0,
    }
  },
  watch: {
    openPrintView(num: Number) {
      if (num < 100) {
        return
      }
      this.print()
    },
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
    this.updater = window.setInterval(this.autoUpdatePoint, 10000)
  },
  beforeDestroy() {
    window.clearInterval(this.updater)
  },
  methods: {
    updatePoint: debounce(function (this: any) {
      this.autoUpdatePoint()
    }, 500),
    autoUpdatePoint() {
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
    print() {
      const preview: HTMLElement = this.$refs.previewerc as HTMLElement
      print.createView(this.title, preview)
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

<style lang="scss" scoped>
.preview-container {
  display: flex;
  justify-content: center;
  overflow: scroll;
  max-height: calc(100vh - 56px);

  .invisible {
    display: none;
  }

  .previewer {
    width: 100%;
    max-width: 800px;
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
