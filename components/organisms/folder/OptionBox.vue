<template>
  <div class="option-box-container">
    <i class="fa fa-fw" :class="imageType" />
    <div class="detail-items">
      <OptionInfoCell
        v-for="(mo, index) in options"
        :key="`option-info-cell${index}`"
        :model="mo"
      />
    </div>
    <Button
      v-if="isEditable"
      :label-name="'Owner'"
      :button-name="'Change Owner'"
      @click="isChangeOwnerEnable = true"
    />
    <Input
      v-if="isEditable"
      :label-name="'Name'"
      :is-password="false"
      :value="title"
      :disabled="!isNameEditable"
      @text="updateTitle"
    />
    <Select
      v-if="isEditable"
      :label-name="'Others Permission'"
      :current="permission"
      :select-items="selectModels"
      @input="selected"
    />
    <b-button
      v-if="isEditable"
      class="option-button"
      type="is-success"
      @click="update"
      v-text="'Update'"
    />
    <b-button
      v-if="isEditable"
      class="option-button"
      type="is-danger"
      @click="del"
      v-text="'Delete'"
    />
    <b-modal v-model="isChangeOwnerEnable">
      <ChangeOwner :current-owner="model.owner" @update-user="updateOwner" />
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import CloneDeep from 'lodash/cloneDeep'
import Input from '@/components/atoms/input/Input.vue'
import Select from '@/components/atoms/input/Select.vue'
import Button from '@/components/atoms/button/Button.vue'
import ChangeOwner from '@/components/molecules/folder/ChangeOwner.vue'
import OptionInfoCell, {
  OptionInfoModel,
} from '@/components/atoms/cell/OptionInfoCell.vue'
import {
  FolderModel,
  DocumentModel,
  ProfileModel,
  FolderApi,
  FolderModifyReqModel,
  DocumentModifyReqModel,
  DocumentApi,
  checkAuthWithStatus,
} from '@/scripts/api/index'
import { toDate } from '@/scripts/utils/date'
import { successToast, failureToast } from '@/scripts/utils/toast'

export type DataType = {
  selectModels: Array<string>
  newModel: DocumentModel | FolderModel
  isChangeOwnerEnable: boolean
}

export default Vue.extend({
  components: {
    Input,
    OptionInfoCell,
    Select,
    Button,
    ChangeOwner,
  },
  props: {
    model: {
      type: Object as PropType<FolderModel | DocumentModel>,
      default: {},
    },
    modelType: {
      type: String,
      default: 'NONE',
    },
  },
  data(): DataType {
    return {
      selectModels: ['Private', 'Read', 'Read / Write'],
      newModel: {},
      isChangeOwnerEnable: false,
    }
  },
  computed: {
    imageType(): string {
      return this.modelType === 'FOLDER'
        ? 'fa-folder'
        : this.modelType === 'DOCUMENT'
        ? 'fa-file'
        : 'fa-minus'
    },
    isSelected(): boolean {
      return 'uuid' in this.newModel
    },
    options(): Array<OptionInfoModel> {
      const toDate = (utime: number) => {
        return this.isSelected ? this.toDate(utime) : '---'
      }

      const uuid = this.newModel.uuid !== undefined ? this.newModel.uuid : '---'
      const owner = this.newModel.owner as ProfileModel
      const ownerName = owner !== undefined ? owner.name : '---'
      const createdAt = this.newModel.created_at ?? 0
      const updatedAt = this.newModel.updated_at ?? 0
      const perm = this.permission

      return [
        { title: 'UUID', detail: uuid } as OptionInfoModel,
        {
          title: 'Owner',
          detail: ownerName,
        } as OptionInfoModel,
        {
          title: 'Permission',
          detail: perm,
        } as OptionInfoModel,
        {
          title: 'Created at',
          detail: toDate(createdAt),
        } as OptionInfoModel,
        {
          title: 'Updated at',
          detail: toDate(updatedAt),
        } as OptionInfoModel,
      ]
    },
    title(): string {
      const name =
        this.modelType === 'FOLDER'
          ? (this.newModel as FolderModel).name ?? ''
          : this.modelType === 'DOCUMENT'
          ? (this.newModel as DocumentModel).title ?? ''
          : ''
      return name
    },
    permission(): string {
      return this.newModel.permission !== undefined
        ? this.selectModels[this.newModel.permission]
        : '---'
    },
    isNameEditable(): boolean {
      if (this.modelType === 'DOCUMENT') {
        return false
      }
      return this.isEditable
    },
    isEditable(): boolean {
      const perm: boolean = this.newModel.editable ?? false
      return perm
    },
  },
  watch: {
    model() {
      // deep copy using clone deep in the lodash
      this.newModel = CloneDeep(this.model)
    },
  },
  methods: {
    successToast,
    failureToast,
    toDate,
    checkAuthWithStatus,
    selected(type: string) {
      const perm = this.selectModels.indexOf(type) ?? this.newModel.permission
      this.newModel.permission = perm
    },
    updateTitle(title: string) {
      if (this.modelType === 'FOLDER') {
        const cModel = this.newModel as FolderModel
        cModel.name = title
      }
    },
    updateOwner(newOwner: ProfileModel) {
      this.newModel.owner = newOwner
      this.isChangeOwnerEnable = false
    },
    update() {
      if (this.newModel.owner === undefined) {
        return
      }
      const uuuid = (this.newModel.owner as ProfileModel).uuid
      const perm = this.newModel.permission
      if (uuuid === undefined || perm === undefined) {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Failed', 1)
        return
      }
      if (this.modelType === 'FOLDER') {
        const fModel = this.newModel as FolderModel
        if (fModel.name === undefined || fModel.name === '') {
          // @ts-ignore
          this.failureToast(this.$buefy, 'Failed', 1)
          return
        }
        const fuuid = fModel.uuid
        if (fuuid === undefined) {
          // @ts-ignore
          this.failureToast(this.$buefy, 'Failed', 1)
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
            // @ts-ignore
            this.successToast(this.$buefy, 'Success')
          })
          .catch(err => {
            this.checkAuthWithStatus(this, err.response.status)
            // @ts-ignore
            this.failureToast(this.$buefy, 'Failed', 3)
          })
      } else if (this.modelType === 'DOCUMENT') {
        const dModel = this.newModel as DocumentModel
        const duuid = dModel.uuid
        if (duuid === undefined) {
          // @ts-ignore
          this.failureToast(this.$buefy, 'Failed', 1)
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
            // @ts-ignore
            this.successToast(this.$buefy, 'Success')
          })
          .catch(err => {
            this.checkAuthWithStatus(this, err.response.status)
            // @ts-ignore
            this.failureToast(this.$buefy, 'Failed', 3)
          })
      } else {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Failed', 2)
      }
    },
    del() {
      const fduuid = this.newModel.uuid
      if (fduuid === undefined) {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Failed', 1)
        return
      }
      if (this.modelType === 'FOLDER') {
        new FolderApi(this.$store.getters['auth/config'])
          .deleteFolder(fduuid)
          .then(() => {
            this.$emit('reload')
            // @ts-ignore
            this.successToast(this.$buefy, 'Success')
          })
          .catch(err => {
            this.checkAuthWithStatus(this, err.response.status)
            // @ts-ignore
            this.failureToast(this.$buefy, 'Failed', 3)
          })
      } else if (this.modelType === 'DOCUMENT') {
        new DocumentApi(this.$store.getters['auth/config'])
          .deleteDoc(fduuid)
          .then(() => {
            this.$emit('reload')
            // @ts-ignore
            this.successToast(this.$buefy, 'Success')
          })
          .catch(err => {
            this.checkAuthWithStatus(this, err.response.status)
            // @ts-ignore
            this.failureToast(this.$buefy, 'Failed', 3)
          })
      } else {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Failed', 2)
      }
    },
  },
})
</script>

<style lang="scss">
.option-box-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 20px;
  background-color: whitesmoke;
  border-radius: 16px;
  height: auto;
  width: 100%;

  .fa-fw {
    font-size: 80px;
    color: black;
  }
  .detail-items {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    width: 100%;
    margin: 16px 0;
  }

  .field {
    width: 100%;
  }

  .option-button {
    width: 100%;
    margin: 4px;
  }
}
</style>
