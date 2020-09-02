<template>
  <div class="viewer-container" :class="displayType == 2 ? 'split' : 'editor'">
    <DocEditor
      v-show="displayType !== 3"
      :p-markdown="markdown"
      @input="onChangedText"
    />
    <DocPreview v-show="displayType !== 1" :p-markdown="markdown" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DocEditor from '@/components/atoms/document/DocEditor.vue'
import DocPreview from '@/components/atoms/document/DocPreview.vue'

@Component({
  components: {
    DocEditor,
    DocPreview,
  },
})
export default class DocView extends Vue {
  markdown: string = ''

  onChangedText(text: string) {
    this.markdown = text
  }

  get displayType() {
    return this.$store.state.editor.displayType
  }
}
</script>

<style lang="scss" scope>
.viewer-container {
  display: grid;
  height: 100%;
  background-color: white;
}

.split {
  grid-template-columns: repeat(2, 50%);
}
</style>
