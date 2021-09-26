<template>
  <div class="folder-container">
    <div class="tool-container">
      <NavHeader />
      <ToolBar
        class="toolbar-box"
        @create-folder="openCreateFolderView"
        @create-doc="createDoc"
        @search="searchText = $event"
      />
      <Breadcrumb
        class="breadcrumb-box"
        :breadcrumb="breadcrumb"
        @click="goToFolder"
      />
    </div>
    <div
      v-if="!isNoItems"
      ref="folder-content-container"
      class="explore-container"
    >
      <div class="left-container">
        <SortBox class="sort-box" @input="sortFunction = $event" />
        <FolderListContainer
          v-if="isFolderAvailable"
          ref="folder-list-container"
          :models="filteredFolder"
          :current-folder-id="currentFolderId"
          @select="selectedFolderDoc"
          @reload="fetchFolder"
        />
        <DocListContainer
          v-if="isDocAvailable"
          ref="doc-list-container"
          :models="filteredDocs"
          :current-folder-id="currentFolderId"
          @select="selectedFolderDoc"
          @reload="fetchFolder"
        />
      </div>
      <div v-if="!isMobile" class="right-container">
        <OptionBox
          ref="option-content-box"
          class="option-box"
          :current-folder-id="currentFolderId"
          :model="selectItem"
          :model-type="selectType"
          @reload="fetchFolder"
        />
      </div>
    </div>
    <b-button
      class="floating-option-button"
      :rounded="true"
      @click="openOptionView"
    >
      <fa-icon icon="info" class="icon" />
    </b-button>
    <NoList v-if="isNoItems && isLoaded" />
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
import SortBox, {
  newestSort,
  SortModel,
} from '@/components/organisms/folder/SortBox.vue'
import CreateFolderBox from '@/components/organisms/folder/CreateFolderBox.vue'
import NoList from '@/components/atoms/folder/NoList.vue'
import {
  checkAuthWithStatus,
  FolderApi,
  DocumentApi,
  FolderModel,
  DocumentModel,
  BreadcrumbModel,
} from '@/scripts/api/index'
import { failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getToastDesc } from '@/scripts/model/toast'
import { getFolderTitle } from '@/scripts/model/head/index'

export type DataType = {
  folders: FolderModel[]
  docs: DocumentModel[]
  breadcrumb: BreadcrumbModel[]
  sortFunction: SortModel
  selectType: string
  selectItem: FolderModel | DocumentModel
  searchText: string
  isLoaded: boolean
}

type HeadType = {
  title: string
}

export default Vue.extend({
  components: {
    NavHeader,
    ToolBar,
    Breadcrumb,
    OptionBox,
    FolderListContainer,
    DocListContainer,
    NoList,
    SortBox,
  },
  data(): DataType {
    return {
      folders: [] as FolderModel[],
      docs: [] as DocumentModel[],
      breadcrumb: [] as BreadcrumbModel[],
      sortFunction: newestSort,
      selectType: 'NONE',
      selectItem: {} as FolderModel | DocumentModel,
      searchText: '',
      isLoaded: false,
    }
  },
  head(): HeadType {
    return {
      title: getFolderTitle(this.folderTitle),
    }
  },
  computed: {
    isMobile(): boolean {
      return this.$store.getters['device/isMobile']
    },
    sortedFolder(): FolderModel[] {
      return this.sortFunction.folder(this.folders)
    },
    sortedDocs(): DocumentModel[] {
      return this.sortFunction.document(this.docs)
    },
    filteredFolder(): FolderModel[] {
      if (this.searchText === '') {
        return this.sortedFolder
      }
      const lowerSearchText = this.searchText.toLowerCase()
      return this.sortedFolder.filter(f => {
        const name = f.name ?? ''
        return name.toLowerCase().match(RegExp(`^(?=.*${lowerSearchText}).*$`))
      })
    },
    filteredDocs(): DocumentModel[] {
      if (this.searchText === '') {
        return this.sortedDocs
      }
      const lowerSearchText = this.searchText.toLowerCase()
      return this.sortedDocs.filter(f => {
        const name = f.title ?? ''
        return name.toLowerCase().match(RegExp(`^(?=.*${lowerSearchText}).*$`))
      })
    },
    isFolderAvailable(): boolean {
      return this.filteredFolder.length > 0
    },
    isDocAvailable(): boolean {
      return this.filteredDocs.length > 0
    },
    isNoItems(): boolean {
      return !this.isFolderAvailable && !this.isDocAvailable
    },
    currentFolderId(): string {
      if (this.breadcrumb.length < 1) return ''
      const fId = this.breadcrumb[this.breadcrumb.length - 1].folder_id ?? ''
      return fId
    },
    hasSelectedItem(): boolean {
      return !!this.selectItem.uuid
    },
    folderTitle(): string {
      if (this.breadcrumb.length < 1) {
        return ''
      } else if (this.breadcrumb.length === 1) {
        return 'Home'
      }
      return this.breadcrumb[this.breadcrumb.length - 1].title ?? ''
    },
  },
  created() {
    this.fetchFolder()
  },
  methods: {
    resetFolderIndex() {
      const instance = this.$refs['folder-list-container'] as InstanceType<
        typeof FolderListContainer
      >
      if (!instance) {
        return
      }
      instance.resetIndex()
    },
    resetDocumentIndex() {
      const instance = this.$refs['doc-list-container'] as InstanceType<
        typeof DocListContainer
      >
      if (!instance) {
        return
      }
      instance.resetIndex()
    },
    updateCellWidth() {
      const fInstance = this.$refs['folder-list-container'] as InstanceType<
        typeof FolderListContainer
      >
      if (!fInstance) {
        return
      }
      fInstance.updateWidth()
      const dInstance = this.$refs['doc-list-container'] as InstanceType<
        typeof DocListContainer
      >
      if (!dInstance) {
        return
      }
      dInstance.updateWidth()
    },
    openCreateFolderView() {
      // @ts-ignore
      this.$buefy.modal.open({
        parent: this.$root,
        component: CreateFolderBox,
        events: { create: this.createFolder },
      })
    },
    openOptionView() {
      // @ts-ignore
      this.$buefy.modal.open({
        parent: this.$root,
        component: OptionBox,
        props: {
          'current-folder-id': this.currentFolderId,
          model: this.selectItem,
          'model-type': this.selectType,
        },
        events: { reload: this.fetchFolder },
      })
    },
    updateHeightAnchor() {
      const fInstance = this.$refs['folder-content-container'] as HTMLElement
      if (!fInstance) {
        return
      }
      const topOffset = fInstance.offsetTop
      const oInstance = this.$refs['option-content-box'] as Vue
      if (!oInstance) {
        return
      }
      const optionBoxEl = oInstance.$el as HTMLElement
      optionBoxEl.style.top = `${topOffset + 16}px`
    },
    selectedFolderDoc(modelType: string, model: FolderModel | DocumentModel) {
      this.selectType = modelType
      this.selectItem = model
      if (modelType === 'FOLDER') {
        this.resetDocumentIndex()
      } else if (modelType === 'DOCUMENT') {
        this.resetFolderIndex()
      }
    },
    resetSelect() {
      this.selectType = ''
      this.selectItem = {}
      this.resetFolderIndex()
      this.resetDocumentIndex()
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
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.GET_FOLDER).failure,
            err.response.status
          )
        })
        .finally(() => {
          this.isLoaded = true
          this.updateCellWidth()
          this.updateHeightAnchor()
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
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.CREATE_FOLDER).failure,
            err.response.status
          )
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
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.CREATE_DOCUMENT).failure,
            err.response.status
          )
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
// .folder-container .explore-container .left-container .sort-box .control {
//   select {
//     color: $font-color;
//     border-color: $sub-main-color;
//     background-color: $sub-main-color;
//   }
//   .select::after {
//     border-color: $font-color;
//   }
// }
//
</style>

<style lang="scss" scoped>
.folder-container {
  display: flex;
  flex-flow: column nowrap;
  width: 100vw;

  .tool-container {
    position: sticky;
    top: 0px;
    z-index: 5;
    border-bottom: solid 1px $contrast-color;
    background-color: $main-color; // for masking scrolled content

    .toolbar-box {
      margin: 8px 16px;
    }
    .breadcrumb-box {
      margin: 8px 12px;
    }

    @media only screen and (max-width: 800px) {
      position: relative;
    }
  }

  .explore-container {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 72px;

    .left-container {
      width: 100%;

      .sort-box {
        width: 200px;
        margin: 16px auto;
        margin-right: 0px;
        padding-right: 16px;
      }
    }
    .right-container {
      width: 250px;
      margin: 16px;
      margin-left: 0;

      .option-box {
        position: sticky;
        width: 250px;
      }
    }
  }

  .floating-option-button {
    display: none;
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    outline: none;
    text-decoration: none;
    color: $sub-main-color;
    background-color: $contrast-color;

    @media only screen and (max-width: 800px) {
      display: inline;
    }
  }
}
</style>
