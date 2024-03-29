<template>
  <div class="document-container">
    <DocHeader
      class="document-header"
      :is-loaded="isLoaded"
      :is-editable="isEditable"
      :users="onlineUsers"
      :document="document"
      :current-folder-id="parentFolderId"
      @openPrintView="openPrintView"
      @toParentFolder="toParentFolder"
      @willDelete="willDelete = true"
      @cannotDelete="willDelete = false"
    />
    <div
      v-if="isLoaded"
      class="document-preview-editor-container"
      :class="displayType == 2 ? 'split' : 'editor'"
    >
      <DocEditor
        v-show="displayType !== 3"
        :p-markdown="markdown"
        :current-pos="editorPosition"
        :is-editable="isEditable"
        :will-delete="willDelete"
        @input="onChangedEditorText"
        @update="onChangedEditorPoints"
        @updatepos="onUpdatedEditorPosition"
        @toParentFolder="$emit('toParentFolder')"
        @addUser="addUser"
        @delUser="delUser"
      />
      <DocPreview
        v-show="displayType !== 1"
        :enable-divide-line="displayType == 2"
        :open-print-view="openPrintViewEmit"
        :p-markdown="markdown"
        :current-pos="previewPosition"
        :title="docTitle"
        @update="onChangedPreviewPoints"
        @updatepos="onUpdatedPreviewPosition"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DocEditor from '@/components/molecules/document/DocEditor.vue'
import DocPreview from '@/components/molecules/document/DocPreview.vue'
import DocHeader from '@/components/organisms/document/DocHeader.vue'
import {
  checkAuthWithStatus,
  DocumentApi,
  DocumentModel,
} from '@/scripts/api/index'
import { failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getToastDesc } from '@/scripts/model/toast'
import { UserManager, UserModel } from '@/scripts/model/user/manager'
import { getDocumentTitle } from '@/scripts/model/head/index'
const ss = require('@/scripts/editor/scrollsyncer')

type DataType = {
  isLoaded: boolean
  parentFolderId: string
  isEditable: boolean
  willDelete: boolean
  markdown: String | null
  editorPoints: Object[]
  previewPoints: Object[]
  editorPosition: Number
  previewPosition: Number
  userManager: UserManager
  document: DocumentModel
  openPrintViewEmit: Number
}

type HeadType = {
  title: string
}

export default Vue.extend({
  components: {
    DocHeader,
    DocEditor,
    DocPreview,
  },
  data(): DataType {
    return {
      isLoaded: false,
      parentFolderId: '',
      isEditable: false,
      willDelete: false,
      markdown: '',
      editorPoints: [],
      previewPoints: [],
      editorPosition: 0,
      previewPosition: 0,
      userManager: new UserManager(),
      document: {} as DocumentModel,
      openPrintViewEmit: 0,
    }
  },
  head(): HeadType {
    return {
      title: getDocumentTitle(this.docTitle),
    }
  },
  computed: {
    docId(): string {
      return this.$route.params.id
    },
    docTitle(): string {
      return this.document.title ?? ''
    },
    displayType(): number {
      return this.$store.getters['editor/displayType']
    },
    onlineUsers(): UserModel[] {
      return this.userManager.getUsers()
    },
  },
  created() {
    new DocumentApi(this.$store.getters['auth/config'])
      .getDocDocId(this.docId)
      .then(res => {
        this.isLoaded = true
        this.document = res.data
        this.parentFolderId = res.data.parentfolderid ?? ''
        this.isEditable = res.data.editable ?? false
      })
      .catch(err => {
        checkAuthWithStatus(this, err.response.status)
        failureToast(
          // @ts-ignore
          this.$buefy,
          getToastDesc(TOAST_TYPE.OPEN_DOCUMENT).failure,
          err.response.status
        )
        this.toParentFolder()
      })
  },
  methods: {
    toParentFolder() {
      this.$router.push(`/folder/${this.parentFolderId}`)
    },
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
    addUser(us: UserModel[]) {
      this.userManager.addUser(us)
    },
    delUser(id: string) {
      this.userManager.deleteUser(id)
    },
    openPrintView() {
      this.openPrintViewEmit = Date.now()
    },
  },
})
</script>

<style lang="scss" scoped>
.document-container {
  position: fixed;
  top: 0px;
  bottom: 0px;
  height: 100vh;

  .document-header {
    height: 56px;
  }

  .document-preview-editor-container {
    height: calc(100vh - 56px);
    display: grid;
    background-color: white; // same all theme

    &.split {
      grid-template-columns: repeat(2, 50%);
    }
  }
}
</style>
