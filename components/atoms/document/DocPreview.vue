<template>
  <div class="preview-container">
    <div :ref="`previewer`" class="previewer" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import vdom from '@/scripts/markdown/vdom.ts'

@Component
export default class DocPreview extends Vue {
  baseDom: HTMLElement | null = null

  @Prop({ default: '' })
  pMarkdown!: string

  @Watch('pMarkdown')
  onChangedText(text: string) {
    if (!this.baseDom) {
      return
    }
    vdom.update(this.baseDom, text)
  }

  mounted() {
    this.baseDom = this.$refs.previewer as HTMLElement
  }
}
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

<style lang="css" src="abcjs/abcjs-midi.css"></style>
