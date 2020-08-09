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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Editor from '@/components/atoms/document/Editor.vue'
import Preview from '@/components/atoms/document/Preview.vue'

@Component({
  components: {
    Editor,
    Preview,
  },
})
export default class Viewer extends Vue {
  markdown: string = ''
  mounted() {
    this.markdown = require('@/scripts/markdown/samplemd.ts').sample
  }
}
</script>

<style lang="scss">
.viewer-container {
  display: grid;
  grid-template-rows: repeat(2, auto);
  height: 100%;
}
</style>
