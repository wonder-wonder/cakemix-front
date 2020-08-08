<template>
  <div class="viewer-container">
    <editor
      @input="
        text => {
          markdown = text
          console.log('###### ' + text)
        }
      "
    />
    <preview :markdown="markdown" />
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
}
</script>

<style lang="scss">
.viewer-container {
  display: grid;
  grid-template-rows: repeat(2, auto);
  height: 100%;
}
</style>
