<template>
  <div class="folder-container">
    <NavHeader />
    <ToolBar @create-folder="createFolder" @create-doc="createDoc" />
    <Breadcrumb :breadcrumb="breadcrumb" />
    <FolderListContainer :models="folders" />
    <DocListContainer :models="docs" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ToolBar from '@/components/molecules/folder/ToolBar.vue'
import Breadcrumb from '@/components/molecules/folder/Breadcrumb.vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import FolderListContainer from '@/components/molecules/folder/FolderListContainer.vue'
import DocListContainer from '@/components/molecules/folder/DocListContainer.vue'
import {
  FolderApi,
  DocumentApi,
  FolderModel,
  DocumentModel,
  BreadcrumbModel,
} from '@/scripts/api/index'

export type DataType = {
  folders: Array<FolderModel>
  docs: Array<DocumentModel>
  breadcrumb: Array<BreadcrumbModel>
}

export default Vue.extend({
  components: {
    NavHeader,
    ToolBar,
    Breadcrumb,
    FolderListContainer,
    DocListContainer,
  },
  data(): DataType {
    return {
      folders: [],
      docs: [],
      breadcrumb: [],
    }
  },
  created() {
    this.fetchFolder()
  },
  methods: {
    fetchFolder() {
      new FolderApi(this.$store.getters['auth/config'])
        .getList(this.$route.params.id ?? '', '')
        .then(res => {
          this.folders = res.data.folder ?? []
          this.docs = res.data.document ?? []
          this.breadcrumb = res.data.path ?? []
        })
        .catch(() => {
          this.failureToast(1)
        })
    },
    createFolder() {
      const fId = this.breadcrumb[0].folder_id
      if (!fId) {
        return
      }
      new FolderApi(this.$store.getters['auth/config'])
        .createNewFolder(fId, 'Untitled')
        .catch(() => {
          this.failureToast(2)
        })
        .finally(() => {
          this.fetchFolder()
        })
    },
    createDoc() {
      const fId = this.breadcrumb[0].folder_id
      if (!fId) {
        return
      }
      new DocumentApi(this.$store.getters['auth/config'])
        .createNewDoc(fId, 'Untitled')
        .catch(() => {
          this.failureToast(3)
        })
        .finally(() => {
          this.fetchFolder()
        })
    },
    failureToast(err: Number) {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: `Failed to fetch folder  [ Error : ${err} ]`,
        position: 'is-bottom',
        type: 'is-danger',
      })
    },
  },
})
</script>

<style lang="scss">
html {
  background-color: rgb(32, 32, 32);
}
.folder-container {
  display: flex;
  flex-flow: column wrap;
  width: 100vw;
  background-color: rgb(32, 32, 32);
}
</style>
