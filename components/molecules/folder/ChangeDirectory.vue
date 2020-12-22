<template>
  <div class="change-directory-container">
    <Breadcrumb
      class="breadcrumb-box"
      :breadcrumb="breadcrumb"
      :dark="true"
      @click="getFolder"
    />
    <div class="folder-cell-container">
      <FolderWideCell
        v-for="(item, index) in folder"
        :key="`folder-cell-${index}`"
        :folder="item"
        @dblclick.native="getFolder(item.uuid)"
      />
    </div>
    <b-button type="is-dark" class="change-directory-button" @click="transfer">
      Move to here
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FolderWideCell from '@/components/atoms/cell/FolderWideCell.vue'
import Breadcrumb from '@/components/molecules/folder/Breadcrumb.vue'
import { failureToast, successToast } from '@/scripts/utils/toast'
import {
  checkAuthWithStatus,
  DocumentApi,
  FolderApi,
  FolderListModel,
  BreadcrumbModel,
  FolderModel,
} from '@/scripts/api/index'

type DataType = {
  folderList: FolderListModel
}

export default Vue.extend({
  components: {
    FolderWideCell,
    Breadcrumb,
  },
  props: {
    currentFolderId: {
      type: String,
      default: '',
    },
    itemId: {
      type: String,
      default: '',
    },
    isFolder: {
      type: Boolean,
      default: false,
    },
  },
  data(): DataType {
    return {
      folderList: {} as FolderListModel,
    }
  },
  computed: {
    breadcrumb(): BreadcrumbModel[] {
      return (this.folderList.path ?? []) as BreadcrumbModel[]
    },
    folder(): FolderModel[] {
      return (this.folderList.folder ?? []) as FolderModel[]
    },
  },
  created() {
    this.getFolder(this.currentFolderId)
  },
  methods: {
    failureToast,
    successToast,
    checkAuthWithStatus,
    getFolder(id: string) {
      new FolderApi(this.$store.getters['auth/config'])
        .getList(id, 'folder')
        .then(res => {
          this.folderList = res.data
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'folder list request failed', 1)
        })
    },
    transfer() {
      const tId = this.breadcrumb[this.breadcrumb.length - 1].folder_id ?? ''
      if (!tId || tId === this.itemId) {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Unable to move folder or document', 1)
        return
      }
      if (this.isFolder) {
        new FolderApi(this.$store.getters['auth/config'])
          .moveFolder(this.itemId, tId)
          .then(() => {
            // @ts-ignore
            this.successToast(this.$buefy, 'Moved folder')
            this.$emit('updated')
          })
          .catch(() => {
            // @ts-ignore
            this.failureToast(this.$buefy, 'Unable to move folder', 2)
          })
      } else {
        new DocumentApi(this.$store.getters['auth/config'])
          .moveDoc(this.itemId, tId)
          .then(() => {
            // @ts-ignore
            this.successToast(this.$buefy, 'Document moved ')
            this.$emit('updated')
          })
          .catch(() => {
            // @ts-ignore
            this.failureToast(this.$buefy, 'Unable to move document', 2)
          })
      }
    },
  },
})
</script>

<style lang="scss">
.change-directory-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 16px;

  .folder-cell-container {
    width: 100%;
    margin: 8px;
    height: 300px;
    overflow: scroll;
  }

  .change-directory-button {
    width: 250px;
  }
}
</style>