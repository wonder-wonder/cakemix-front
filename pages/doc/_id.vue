<template>
  <div class="document-container">
    <DocHeader class="document-header" @input="onClicked" />
    <DocPreviewEditor class="document-preview-editor" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DocPreviewEditor from '@/components/molecules/document/DocPreviewEditor.vue'
import DocHeader from '@/components/organisms/document/DocHeader.vue'

export default Vue.extend({
  components: {
    DocHeader,
    DocPreviewEditor,
  },
  methods: {
    onClicked(ref: string) {
      switch (ref) {
        case 'question':
          this.copyToClip()
          break
        default:
          break
      }
    },
    copyToClip() {
      const str = require('@/scripts/markdown/samplemd').sample
      const listener = function (e: any) {
        e.clipboardData.setData('text/plain', str)
        e.preventDefault()
        document.removeEventListener('copy', listener)
      }
      document.addEventListener('copy', listener)
      document.execCommand('copy')
    },
  },
})
</script>

<style lang="scss">
html {
  background-color: rgb(32, 32, 32);
}
.document-container {
  height: 100vh;

  .document-header {
    height: 56px;
  }

  .document-preview-editor {
    height: calc(100vh - 56px);
  }
}
</style>
