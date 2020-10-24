<template>
  <div class="folder-container">
    <NavHeader />
    <ToolBar
      class="toolbar-item"
      @create-folder="createFolder"
      @create-doc="createDoc"
    />
    <Breadcrumb class="breadcrumb-item" :breadcrumb="breadcrumb" />
    <div class="explore-container">
      <div class="left-container">
        <FolderListContainer :models="folders" @select="selectedFolderDoc" />
        <DocListContainer :models="docs" />
      </div>
      <div class="right-container">
        <OptionBox :model="selectItem" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ToolBar from '@/components/molecules/folder/ToolBar.vue'
import Breadcrumb from '@/components/molecules/folder/Breadcrumb.vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import FolderListContainer from '@/components/molecules/folder/FolderListContainer.vue'
import DocListContainer from '@/components/molecules/folder/DocListContainer.vue'
import OptionBox from '@/components/organisms/folder/OptionBox.vue'
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
  selectItem: FolderModel | DocumentModel
}

export default Vue.extend({
  components: {
    NavHeader,
    ToolBar,
    Breadcrumb,
    OptionBox,
    FolderListContainer,
    DocListContainer,
  },
  data(): DataType {
    return {
      folders: [],
      docs: [],
      breadcrumb: [],
      selectItem: {},
    }
  },
  created() {
    this.fetchFolder()
  },
  methods: {
    selectedFolderDoc(model: FolderModel | DocumentModel) {
      this.selectItem = model
    },
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
      const fId = this.breadcrumb[this.breadcrumb.length - 1].folder_id
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
      const fId = this.breadcrumb[this.breadcrumb.length - 1].folder_id
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

  .toolbar-item {
    position: sticky;
    top: 50px;
    background-color: rgb(32, 32, 32);
  }
  .breadcrumb-item {
    position: sticky;
    top: 146px;
    padding-bottom: 16px;
    border-bottom: solid 1px whitesmoke;
    background-color: rgb(32, 32, 32);
  }
  .explore-container {
    display: flex;
    flex-flow: row nowrap;
    height: auto;

    .left-container {
      height: 100%;
      width: calc(100vw - 300px);
    }
    .right-container {
      position: sticky;
      top: 232px;
      max-height: 400px;
      width: 268px;
      margin: 32px;
      margin-left: 0;
    }
  }
}
</style>
