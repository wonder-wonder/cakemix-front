<template>
  <div class="viewer-container" :class="displayType == 2 ? 'split' : 'editor'">
    <DocEditor
      v-show="displayType !== 3"
      :p-markdown="markdown"
      :current-pos="editorPosition"
      @input="onChangedEditorText"
      @update="onChangedEditorPoints"
      @updatepos="onUpdatedEditorPosition"
    />
    <DocPreview
      v-show="displayType !== 1"
      :p-markdown="markdown"
      :current-pos="previewPosition"
      @update="onChangedPreviewPoints"
      @updatepos="onUpdatedPreviewPosition"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DocEditor from '@/components/atoms/document/DocEditor.vue'
import DocPreview from '@/components/atoms/document/DocPreview.vue'
const ss = require('@/scripts/editor/scrollsyncer.ts')

export type DataType = {
  markdown: String | null
  editorPoints: Object[]
  previewPoints: Object[]
  editorPosition: Number
  previewPosition: Number
}

export default Vue.extend({
  components: {
    DocEditor,
    DocPreview,
  },
  data(): DataType {
    return {
      markdown: '',
      editorPoints: [],
      previewPoints: [],
      editorPosition: 0,
      previewPosition: 0,
    }
  },
  computed: {
    displayType() {
      return this.$store.getters['editor/displayType']
    },
  },
  methods: {
    onChangedEditorText(text: string) {
      this.markdown = text
    },
    onChangedEditorPoints(points: object[]) {
      this.editorPoints = points
    },
    onChangedPreviewPoints(points: object[]) {
      this.previewPoints = points
    },
    onUpdatedEditorPosition(position: number) {
      if (this.editorPosition === position) {
        return
      }
      this.editorPosition = position
      this.editorToPreview(position)
    },
    onUpdatedPreviewPosition(position: number) {
      if (this.previewPosition === position) {
        return
      }
      this.previewPosition = position
      // this.previewToEditor(position)
    },
    editorToPreview(position: number) {
      this.previewPosition = ss.e2p(
        position,
        this.editorPoints,
        this.previewPoints
      )
    },
    // previewToEditor(position: number) {
    //   this.editorPosition = ss.p2e(
    //     position,
    //     this.editorPoints,
    //     this.previewPoints
    //   )
    // },
  },
})
</script>

<style lang="scss">
.viewer-container {
  display: grid;
  height: 100%;
  background-color: white;

  &.split {
    grid-template-columns: repeat(2, 50%);
  }
}
</style>
