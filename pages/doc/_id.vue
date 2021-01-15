<template>
  <div class="document-container">
    <DocHeader
      class="document-header"
      :is-loaded="isLoaded"
      :is-editable="isEditable"
      @input="onClicked"
      @toParentFolder="toParentFolder"
    />
    <DocPreviewEditor
      v-if="isLoaded"
      :is-editable="isEditable"
      class="document-preview-editor"
      @toParentFolder="toParentFolder"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DocPreviewEditor from '@/components/molecules/document/DocPreviewEditor.vue'
import DocHeader from '@/components/organisms/document/DocHeader.vue'
import { DocumentApi, checkAuthWithStatus } from '@/scripts/api/index'
import { failureToast } from '@/scripts/utils/toast'

type DataType = {
  isLoaded: boolean
  parentFolderId: string
  isEditable: boolean
}

export default Vue.extend({
  components: {
    DocHeader,
    DocPreviewEditor,
  },
  data(): DataType {
    return {
      isLoaded: false,
      parentFolderId: '',
      isEditable: false,
    }
  },
  computed: {
    docId(): string {
      return this.$route.params.id
    },
  },
  created() {
    new DocumentApi(this.$store.getters['auth/config'])
      .getDocDocId(this.docId)
      .then(res => {
        this.isLoaded = true
        this.parentFolderId = res.data.parentfolderid ?? ''
        this.isEditable = res.data.editable ?? false
      })
      .catch(err => {
        this.checkAuthWithStatus(this, err.response.status)
        this.failureToast(
          // @ts-ignore
          this.$buefy,
          'Unable to open this document',
          err.response.status
        )
        this.toParentFolder()
      })
  },
  methods: {
    failureToast,
    checkAuthWithStatus,
    toParentFolder() {
      this.$router.push(`/folder/${this.parentFolderId}`)
    },
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

<style lang="scss" scoped>
html {
  background-color: rgb(32, 32, 32);
}
.document-container {
  position: fixed;
  top: 0px;
  bottom: 0px;
  height: 100vh;

  .document-header {
    height: 56px;
  }

  .document-preview-editor {
    height: calc(100vh - 56px);
  }
}
</style>
