<template>
  <div class="viewer-container">
    <Editor
      @input="
        text => {
          markdown = text
        }
      "
    />
    <Preview :markdown="markdown" />
  </div>
</template>

<script>
import Editor from '@/components/atoms/document/Editor'
import Preview from '@/components/atoms/document/Preview'

export default {
  components: {
    Editor,
    Preview,
  },
  data() {
    return {
      markdown: String,
    }
  },
  mounted() {
    this.markdown = require('@/scripts/markdown/samplemd').sample
  },
}
</script>

<style lang="scss">
.viewer-container {
  display: grid;
  grid-template-rows: repeat(2, auto);
  height: 100%;
}
</style>
