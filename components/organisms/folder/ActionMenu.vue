<template>
  <div @dblclick.stop="">
    <b-dropdown
      aria-role="list"
      :mobile-modal="false"
      :position="position"
      :triggers="['click', 'contextmenu']"
    >
      <template #trigger>
        <slot />
      </template>
      <b-dropdown-item
        v-if="isNavHeader"
        aria-role="listitem"
        :class="'row-grid'"
        :paddingless="true"
        @click="openPrintView()"
      >
        <div class="icon">
          <fa-icon icon="print" />
        </div>
        <span class="title">Print Viewer</span>
      </b-dropdown-item>
      <b-dropdown-item
        v-if="isNavHeader"
        aria-role="listitem"
        :separator="true"
      />
      <b-dropdown-item
        v-if="isNameEditable"
        aria-role="listitem"
        :class="'row-grid'"
        :paddingless="true"
        :disabled="!isEditable"
        @click="openRenameView"
      >
        <div class="icon">
          <fa-icon icon="signature" />
        </div>
        <span class="title">Rename</span>
      </b-dropdown-item>
      <b-dropdown-item
        aria-role="listitem"
        :class="'row-grid'"
        :paddingless="true"
        :disabled="!isEditable"
        @click="openOwnerView"
      >
        <div class="icon">
          <fa-icon icon="user" />
        </div>
        <span class="title">Change Owner</span>
      </b-dropdown-item>
      <b-dropdown-item
        aria-role="listitem"
        :class="'row-grid'"
        :paddingless="true"
        :disabled="!isEditable"
        @click="openMoveView"
      >
        <div class="icon">
          <fa-icon icon="folder-open" />
        </div>
        <span class="title">Transfer</span>
      </b-dropdown-item>
      <b-dropdown-item aria-role="listitem" :separator="true" />

      <b-dropdown-item
        aria-role="listitem"
        :class="'row-title-grid'"
        :custom="true"
        :focusable="false"
        :paddingless="true"
      >
        <span class="subject">Others Permission</span>
      </b-dropdown-item>
      <b-dropdown-item
        aria-role="listitem"
        :class="'row-grid'"
        :custom="true"
        :focusable="false"
        :paddingless="true"
        :disabled="!isEditable"
      >
        <div class="icon">
          <fa-icon icon="eye" />
        </div>
        <span class="title">Read</span>
        <b-switch
          v-model="readSwitch"
          class="switch"
          size="is-small"
          :disabled="!isEditable"
          @input="updateItem"
        />
      </b-dropdown-item>
      <b-dropdown-item
        aria-role="listitem"
        :class="'row-grid'"
        :custom="true"
        :focusable="false"
        :paddingless="true"
        :disabled="!isWriteEnable || !isEditable"
      >
        <div class="icon">
          <fa-icon icon="pencil-alt" />
        </div>
        <span class="title">Write </span>
        <b-switch
          v-model="writeSwitch"
          class="switch"
          size="is-small"
          :disabled="!isWriteEnable || !isEditable"
          @input="updateItem"
        />
      </b-dropdown-item>
      <b-dropdown-item aria-role="listitem" :separator="true" />
      <b-dropdown-item
        aria-role="listitem"
        :class="'row-grid delete-color'"
        :paddingless="true"
        :disabled="!isEditable"
        @click="deleteItemConfirm()"
      >
        <div class="icon">
          <fa-icon class="icon delete-color" icon="trash" />
        </div>
        <span class="title delete-color">Delete</span>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import CloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import ChangeName from '@/components/molecules/folder/ChangeName.vue'
import ChangeOwner from '@/components/molecules/folder/ChangeOwner.vue'
import ChangeDirectory from '@/components/molecules/folder/ChangeDirectory.vue'
import {
  checkAuthWithStatus,
  FolderModel,
  DocumentModel,
  ProfileModel,
  FolderApi,
  FolderModifyReqModel,
  DocumentModifyReqModel,
  DocumentApi,
} from '@/scripts/api/index'
import { successToast, failureToast } from '@/scripts/utils/toast'
import {
  TOAST_TYPE,
  getToastDesc,
  getModalDesc,
  MODAL_TYPE,
} from '@/scripts/model/toast'

export type DataType = {
  readSwitch: boolean
  writeSwitch: boolean
  newModel: DocumentModel | FolderModel
}

export default Vue.extend({
  props: {
    isNavHeader: {
      type: Boolean,
      default: false,
    },
    currentFolderId: {
      type: String,
      default: '',
    },
    model: {
      type: Object as PropType<FolderModel | DocumentModel>,
      default: {} as FolderModel | DocumentModel,
    },
    modelType: {
      type: String,
      default: 'NONE',
    },
    position: {
      type: String,
      default: 'is-top-right',
    },
  },
  data(): DataType {
    return {
      readSwitch: false,
      writeSwitch: false,
      newModel: {},
    }
  },
  computed: {
    switchToPerm(): number {
      if (this.readSwitch && this.writeSwitch) {
        return 2
      } else if (this.readSwitch) {
        return 1
      } else {
        return 0
      }
    },
    isWriteEnable(): boolean {
      return this.readSwitch
    },
    isNameEditable(): boolean {
      if (this.modelType === 'DOCUMENT') {
        return false
      }
      return this.isEditable
    },
    isEditable(): boolean {
      return this.newModel.editable ?? false
    },
    isFolder(): Boolean {
      return this.modelType === 'FOLDER'
    },
  },
  watch: {
    model() {
      this.copyToModel()
      this.permToSwitch()
    },
    readSwitch(sw: boolean) {
      if (!sw) {
        this.writeSwitch = false
      }
    },
    switchToPerm(perm: number) {
      this.newModel.permission = perm
    },
  },
  created() {
    this.copyToModel()
    this.permToSwitch()
  },
  methods: {
    copyToModel() {
      // deep copy using clone deep in the lodash
      this.newModel = CloneDeep(this.model)
    },
    permToSwitch() {
      if (this.newModel.permission === 2) {
        this.readSwitch = true
        this.writeSwitch = true
      } else if (this.newModel.permission === 1) {
        this.readSwitch = true
        this.writeSwitch = false
      } else {
        this.readSwitch = false
        this.writeSwitch = false
      }
    },
    openRenameView() {
      // @ts-ignore
      this.$buefy.modal.open({
        parent: this.$root,
        component: ChangeName,
        props: {
          initial: (this.newModel as FolderModel).name,
        },
        events: { updated: this.renamed },
      })
    },
    openMoveView() {
      // @ts-ignore
      this.$buefy.modal.open({
        parent: this.$root,
        component: ChangeDirectory,
        props: {
          'current-folder-id': this.currentFolderId,
          'item-id': this.newModel.uuid,
          'is-folder': this.isFolder,
        },
        events: { updated: this.moved },
      })
    },
    openOwnerView() {
      // @ts-ignore
      this.$buefy.modal.open({
        parent: this.$root,
        component: ChangeOwner,
        props: {
          'current-owner': this.newModel.owner,
        },
        events: { 'update-user': this.changedOwner },
      })
    },
    openPrintView() {
      this.$emit('openPrintView')
    },
    renamed(name: string) {
      ;(this.newModel as FolderModel).name = name
      this.updateItem()
    },
    moved() {
      this.$emit('reload')
    },
    changedOwner(user: ProfileModel) {
      this.newModel.owner = user
      this.updateItem()
    },
    updateItem: debounce(function (this: any) {
      if (this.newModel.owner === undefined) {
        return
      }
      const uuuid = (this.newModel.owner as ProfileModel).uuid
      const perm = this.newModel.permission
      if (uuuid === undefined || perm === undefined) {
        failureToast(
          // @ts-ignore
          this.$buefy,
          getToastDesc(TOAST_TYPE.UPDATE_FOLDER_DOCUMENT).failure,
          1
        )
        return
      }
      if (this.modelType === 'FOLDER') {
        const fModel = this.newModel as FolderModel
        if (fModel.name === undefined || fModel.name === '') {
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.UPDATE_FOLDER_DOCUMENT).failure,
            1
          )
          return
        }
        const fuuid = fModel.uuid
        if (fuuid === undefined) {
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.UPDATE_FOLDER_DOCUMENT).failure,
            1
          )
          return
        }
        const req = {
          owneruuid: uuuid,
          name: fModel.name,
          permission: perm,
        } as FolderModifyReqModel
        new FolderApi(this.$store.getters['auth/config'])
          .modifyFolder(fuuid, req)
          .then(() => {
            this.$emit('reload')
            successToast(
              // @ts-ignore
              this.$buefy,
              getToastDesc(TOAST_TYPE.UPDATE_FOLDER_DOCUMENT).success
            )
          })
          .catch(err => {
            checkAuthWithStatus(this, err.response.status)
            failureToast(
              // @ts-ignore
              this.$buefy,
              getToastDesc(TOAST_TYPE.UPDATE_FOLDER_DOCUMENT).failure,
              err.response.status
            )
          })
      } else if (this.modelType === 'DOCUMENT') {
        const dModel = this.newModel as DocumentModel
        const duuid = dModel.uuid
        if (duuid === undefined) {
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.UPDATE_FOLDER_DOCUMENT).failure,
            1
          )
          return
        }
        const req = {
          owneruuid: uuuid,
          permission: perm,
        } as DocumentModifyReqModel
        new DocumentApi(this.$store.getters['auth/config'])
          .putDocDocId(duuid, req)
          .then(() => {
            this.$emit('reload')
            successToast(
              // @ts-ignore
              this.$buefy,
              getToastDesc(TOAST_TYPE.UPDATE_FOLDER_DOCUMENT).success
            )
          })
          .catch(err => {
            checkAuthWithStatus(this, err.response.status)
            failureToast(
              // @ts-ignore
              this.$buefy,
              getToastDesc(TOAST_TYPE.UPDATE_FOLDER_DOCUMENT).failure,
              err.response.status
            )
          })
      } else {
        failureToast(
          // @ts-ignore
          this.$buefy,
          getToastDesc(TOAST_TYPE.UPDATE_FOLDER_DOCUMENT).failure,
          2
        )
      }
    }, 500),
    deleteItemConfirm() {
      // @ts-ignore
      this.$buefy.dialog.confirm({
        message: getModalDesc(MODAL_TYPE.DELETE_CONFIRM),
        type: 'is-danger',
        onConfirm: () => this.deleteItem(),
        onCancel: () => {},
      })
    },
    deleteItem() {
      const fduuid = this.newModel.uuid
      if (fduuid === undefined) {
        failureToast(
          // @ts-ignore
          this.$buefy,
          getToastDesc(TOAST_TYPE.DELETE_FOLDER_DOCUMENT).failure,
          1
        )
        return
      }
      this.$emit('willDelete')
      if (this.modelType === 'FOLDER') {
        new FolderApi(this.$store.getters['auth/config'])
          .deleteFolder(fduuid)
          .then(() => {
            this.$emit('reload')
            this.$emit('close')
            this.$emit('deleted')
            successToast(
              // @ts-ignore
              this.$buefy,
              getToastDesc(TOAST_TYPE.DELETE_FOLDER_DOCUMENT).success
            )
          })
          .catch(err => {
            this.$emit('cannotDelete')
            checkAuthWithStatus(this, err.response.status)
            failureToast(
              // @ts-ignore
              this.$buefy,
              getToastDesc(TOAST_TYPE.DELETE_FOLDER_DOCUMENT).failure,
              err.response.status
            )
          })
      } else if (this.modelType === 'DOCUMENT') {
        new DocumentApi(this.$store.getters['auth/config'])
          .deleteDoc(fduuid)
          .then(() => {
            this.$emit('reload')
            this.$emit('close')
            this.$emit('deleted')
            successToast(
              // @ts-ignore
              this.$buefy,
              getToastDesc(TOAST_TYPE.DELETE_FOLDER_DOCUMENT).success
            )
          })
          .catch(err => {
            this.$emit('cannotDelete')
            checkAuthWithStatus(this, err.response.status)
            failureToast(
              // @ts-ignore
              this.$buefy,
              getToastDesc(TOAST_TYPE.DELETE_FOLDER_DOCUMENT).failure,
              err.response.status
            )
          })
      } else {
        failureToast(
          // @ts-ignore
          this.$buefy,
          getToastDesc(TOAST_TYPE.DELETE_FOLDER_DOCUMENT).failure,
          2
        )
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.icon {
  font-size: 80px;
  color: $sub-main-color;
}

.row-title-grid {
  display: grid;
  grid-template-rows: 18px;
  grid-template-columns: 8px 32px auto 32px 8px;
  align-items: center;
  font-size: 12px;

  .subject {
    grid-row: 1;
    grid-column: 2 / 4;
    font-size: 12px;
    color: $contrast-color;
  }
}

.row-grid {
  display: grid;
  grid-template-rows: 32px;
  grid-template-columns: 10px 32px 1fr 32px 12px;
  align-items: center;

  .icon {
    grid-row: 1;
    grid-column: 2 / 3;
    font-size: 16px;
    color: $contrast-color;
  }
  .title {
    grid-row: 1;
    grid-column: 3 / 4;
    font-size: 14px;
    margin: 0;
    color: $contrast-color;
  }
  .switch {
    grid-row: 1;
    grid-column: 4 / 5;
  }
}

.delete-color {
  color: $danger-color !important;
}
</style>
