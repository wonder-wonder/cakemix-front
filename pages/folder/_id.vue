<template>
  <div class="folder-container">
    <NavHeader />
    <ToolBar
      class="toolbar-item"
      @create-folder="isCreateViewEnable = true"
      @create-doc="createDoc"
      @search="searchText = $event"
    />
    <Breadcrumb
      class="breadcrumb-item"
      :breadcrumb="breadcrumb"
      @click="goToFolder"
    />
    <div v-if="!isNoItems" class="explore-container">
      <div class="left-container">
        <FolderListContainer
          v-if="isFolderAvailable"
          :models="folders"
          :reset-index="selectedFolderIndex"
          @select="selectedFolderDoc"
        />
        <DocListContainer
          v-if="isDocAvailable"
          :models="docs"
          :reset-index="selectedDocIndex"
          @select="selectedFolderDoc"
        />
      </div>
      <div class="right-container">
        <OptionBox
          :current-folder-id="currentFolderId"
          :model="selectItem"
          :model-type="selectType"
          @reload="fetchFolder"
        />
      </div>
    </div>
    <NoList v-if="isNoItems && isLoaded" />
    <b-modal v-model="isCreateViewEnable">
      <CreateFolderBox
        @create="createFolder"
        @close="isCreateViewEnable = false"
      />
    </b-modal>
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
import CreateFolderBox from '@/components/organisms/folder/CreateFolderBox.vue'
import NoList from '@/components/atoms/folder/NoList.vue'
import {
  FolderApi,
  DocumentApi,
  FolderModel,
  DocumentModel,
  BreadcrumbModel,
  checkAuthWithStatus,
} from '@/scripts/api/index'
import { failureToast } from '@/scripts/utils/toast'

export type DataType = {
  folders: Array<FolderModel>
  docs: Array<DocumentModel>
  breadcrumb: Array<BreadcrumbModel>
  selectType: string
  selectItem: FolderModel | DocumentModel
  selectedFolderIndex: number
  selectedDocIndex: number
  isCreateViewEnable: boolean
  searchText: string
  isLoaded: boolean
}

export default Vue.extend({
  components: {
    NavHeader,
    ToolBar,
    Breadcrumb,
    OptionBox,
    FolderListContainer,
    DocListContainer,
    CreateFolderBox,
    NoList,
  },
  data(): DataType {
    return {
      folders: [],
      docs: [],
      breadcrumb: [],
      selectType: 'NONE',
      selectItem: {},
      selectedFolderIndex: -1,
      selectedDocIndex: -1,
      isCreateViewEnable: false,
      searchText: '',
      isLoaded: false,
    }
  },
  computed: {
    filteredFolder(): Array<FolderModel> {
      if (this.searchText === '') {
        return this.folders
      }
      return this.folders.filter(f => {
        const name = f.name ?? ''
        return name.toLowerCase().match(RegExp(`^(?=.*${this.searchText}).*$`))
      })
    },
    filteredDoc(): Array<DocumentModel> {
      if (this.searchText === '') {
        return this.docs
      }
      return this.docs.filter(f => {
        const name = f.title ?? ''
        return name.toLowerCase().match(RegExp(`^(?=.*${this.searchText}).*$`))
      })
    },
    isFolderAvailable(): boolean {
      return this.filteredFolder.length > 0
    },
    isDocAvailable(): boolean {
      return this.filteredDoc.length > 0
    },
    isNoItems(): boolean {
      return !this.isFolderAvailable && !this.isDocAvailable
    },
    currentFolderId(): string {
      const fId = this.breadcrumb[this.breadcrumb.length - 1].folder_id ?? ''
      return fId
    },
  },
  created() {
    this.fetchFolder()
  },
  methods: {
    failureToast,
    checkAuthWithStatus,
    selectedFolderDoc(modelType: string, model: FolderModel | DocumentModel) {
      this.selectType = modelType
      this.selectItem = model
      if (modelType === 'FOLDER') {
        this.selectedDocIndex = Date.now()
      } else if (modelType === 'DOCUMENT') {
        this.selectedFolderIndex = Date.now()
      }
    },
    resetSelect() {
      this.selectType = ''
      this.selectItem = {}
      this.selectedFolderIndex = Date.now()
      this.selectedDocIndex = Date.now()
    },
    fetchFolder() {
      this.resetSelect()

      new FolderApi(this.$store.getters['auth/config'])
        .getList(this.$route.params.id ?? '', '')
        .then(res => {
          this.folders = res.data.folder ?? []
          this.docs = res.data.document ?? []
          this.breadcrumb = res.data.path ?? []
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'Failed to fetch folder', 1)
        })
        .finally(() => {
          this.isLoaded = true
        })
    },
    createFolder(name: string) {
      const fId = this.breadcrumb[this.breadcrumb.length - 1].folder_id
      if (!fId) {
        return
      }
      new FolderApi(this.$store.getters['auth/config'])
        .createNewFolder(fId, name)
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'Failed to fetch folder', 2)
        })
        .finally(() => {
          this.isCreateViewEnable = false
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
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'Failed to fetch folder', 3)
        })
        .finally(() => {
          this.fetchFolder()
        })
    },
    goToFolder(id: string) {
      this.$router.push(`/folder/${id}`)
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
