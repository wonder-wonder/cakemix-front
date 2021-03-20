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
        @click.native="getFolder(item.uuid)"
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
    getFolder(id: string) {
      new FolderApi(this.$store.getters['auth/config'])
        .getList(id, 'folder')
        .then(res => {
          this.folderList = res.data
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            'folder list request failed',
            err.response.status
          )
        })
    },
    transfer() {
      const tId = this.breadcrumb[this.breadcrumb.length - 1].folder_id ?? ''
      if (!tId || tId === this.itemId) {
        // @ts-ignore
        failureToast(this.$buefy, 'Unable to move folder or document', 1)
        return
      }
      if (this.isFolder) {
        new FolderApi(this.$store.getters['auth/config'])
          .moveFolder(this.itemId, tId)
          .then(() => {
            // @ts-ignore
            successToast(this.$buefy, 'Moved folder')
            this.$emit('updated')
            this.$emit('close')
          })
          .catch(err => {
            failureToast(
              // @ts-ignore
              this.$buefy,
              'Unable to move folder',
              err.response.status
            )
          })
      } else {
        new DocumentApi(this.$store.getters['auth/config'])
          .moveDoc(this.itemId, tId)
          .then(() => {
            // @ts-ignore
            successToast(this.$buefy, 'Document moved ')
            this.$emit('updated')
            this.$emit('close')
          })
          .catch(err => {
            failureToast(
              // @ts-ignore
              this.$buefy,
              'Unable to move document',
              err.response.status
            )
          })
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.change-directory-container {
  display: flex;
  flex-flow: column nowrap;
  width: 700px;
  max-width: 100vw;
  padding: 12px;
  background-color: white;
  border-radius: 16px;

  .breadcrumb-box {
    margin: 0;
  }
  .folder-cell-container {
    height: 300px;
    margin: 8px 4px;
    overflow: scroll;
  }
  .change-directory-button {
    width: 250px;
    margin: 8px auto 4px auto;
  }
}
</style>
