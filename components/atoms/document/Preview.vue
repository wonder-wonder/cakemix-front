<template>
  <div :ref="`previewer`" class="previewer" />
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import vdom from '@/scripts/markdown/vdom'

@Component
export default class Preview extends Vue {
  baseDom: object | null = null

  @Prop({ default: '' })
  markdown!: string

  @Watch('markdown')
  textChanged(nText: string) {
    if (typeof this.baseDom === 'undefined') {
      return
    }
    vdom.update(this.baseDom, nText)
  }

  mounted() {
    this.baseDom = this.$refs.previewer
  }
}
</script>

<style lang="scss">
.previewer {
  height: 100%;
  width: 100%;
}
</style>
