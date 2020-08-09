<template>
  <div :ref="`previewer`" class="previewer" />
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import vdom from '@/scripts/markdown/vdom.ts'

@Component
export default class Preview extends Vue {
  baseDom: HTMLElement | null = null

  @Prop({ default: '' })
  markdown!: string

  @Watch('markdown')
  textChanged(nText: string) {
    if (!this.baseDom) {
      return
    }
    vdom.update(this.baseDom, nText)
  }

  mounted() {
    this.baseDom = this.$refs.previewer as HTMLElement
  }
}
</script>

<style lang="scss">
.previewer {
  height: 100%;
  width: 100%;
}
</style>
