<template>
  <div :ref="`previewer`" />
</template>

<script>
import editor from '@/scripts/editor/editor'
import vdom from '@/scripts/markdown/vdom'

export default {
  props: {
    markdown: String,
  },
  data() {
    return {
      baseDom: this.$refs.previewer,
    }
  },
  computed: {
    compile: () => {
      this.vdom.update(baseDom, markdown)
    },
  },
}
</script>

<style lang="scss"></style>
