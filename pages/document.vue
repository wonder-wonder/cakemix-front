<template>
  <div>
    <EditorHeader />
    <EditorView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import EditorHeader from '@/components/organisms/document/EditorHeader.vue'
import EditorView from '@/components/molecules/document/EditorView.vue'

@Component({
  components: {
    EditorHeader,
    EditorView,
  },
})
export default class document extends Vue {
  markdown: string = ''
  mounted() {
    this.markdown = require('@/scripts/markdown/samplemd.ts').sample
  }
}
</script>
