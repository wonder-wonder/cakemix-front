<template>
  <div class="option-box">
    <i class="fa fa-folder fa-fw" />
    <div class="detail-items">
      <OptionInfoCell
        v-for="(mo, index) in options"
        :key="`option-info-cell${index}`"
        :model="mo"
      />
    </div>
    <Input
      v-if="modelType === 'FOLDER'"
      :label-name="'Name'"
      :is-password="false"
      :value="title"
      :disabled="!isWritable"
      @text="updateTitle"
    />
    <Select
      v-if="isWritable"
      :label-name="'Others Permission'"
      :current="permission"
      :select-items="selectModels"
      @input="selected"
    />
    <b-button
      v-if="isWritable"
      type="is-success"
      @click="update"
      v-text="'Update'"
    />
    <b-button
      v-if="isWritable"
      type="is-danger"
      @click="del"
      v-text="'Delete'"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import CloneDeep from 'lodash/cloneDeep'
import Input from '@/components/atoms/input/Input.vue'
import Select from '@/components/atoms/input/Select.vue'
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
} from '@/scripts/api/index'

export type DataType = {
  selectModels: Array<string>
  newModel: DocumentModel | FolderModel
}

export default Vue.extend({
  components: {
    Input,
    OptionInfoCell,
    Select,
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
    }
  },
  computed: {
    isSelected(): boolean {
      return 'uuid' in this.newModel
    },
    options(): Array<OptionInfoModel> {
      const toDate = (utime: number, isSelected: boolean) => {
        const dt = new Date(utime * 1000)
        if (!dt) {
          return ''
        }
        const year = dt.getFullYear()
        const month = dt.getMonth() + 1
        const day = dt.getDate()
        const hour = ('0' + dt.getHours()).slice(-2)
        const min = ('0' + dt.getMinutes()).slice(-2)
        const sec = ('0' + dt.getSeconds()).slice(-2)

        return isSelected
          ? year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
          : '---'
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
          detail: toDate(createdAt, this.isSelected),
        } as OptionInfoModel,
        {
          title: 'Updated at',
          detail: toDate(updatedAt, this.isSelected),
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
    isWritable(): boolean {
      if (this.newModel.owner === undefined) {
        return false
      }
      const owner = this.newModel.owner as ProfileModel
      if (owner.uuid === undefined) {
        return false
      }
      const uuid = owner.uuid
      const perm = this.newModel.permission
      return perm === 2 || uuid === this.$store.getters['auth/uuid']
    },
  },
  watch: {
    model() {
      // deep copy using clone deep in the lodash
      this.newModel = CloneDeep(this.model)
    },
  },
  methods: {
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
    update() {
      if (this.newModel.owner === undefined) {
        return
      }
      const uuuid = (this.newModel.owner as ProfileModel).uuid
      const perm = this.newModel.permission
      if (uuuid === undefined || perm === undefined) {
        this.failureToast(1)
        return
      }
      if (this.modelType === 'FOLDER') {
        const fModel = this.newModel as FolderModel
        if (fModel.name === undefined || fModel.name === '') {
          this.failureToast(1)
          return
        }
        const fuuid = fModel.uuid
        if (fuuid === undefined) {
          this.failureToast(1)
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
            this.successToast()
          })
          .catch(() => {
            this.failureToast(3)
          })
      } else if (this.modelType === 'DOCUMENT') {
        const dModel = this.newModel as DocumentModel
        const duuid = dModel.uuid
        if (duuid === undefined) {
          this.failureToast(1)
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
            this.successToast()
          })
          .catch(() => {
            this.failureToast(3)
          })
      } else {
        this.failureToast(2)
      }
    },
    del() {
      const fduuid = this.newModel.uuid
      if (fduuid === undefined) {
        this.failureToast(1)
        return
      }
      if (this.modelType === 'FOLDER') {
        new FolderApi(this.$store.getters['auth/config'])
          .deleteFolder(fduuid)
          .then(() => {
            this.$emit('reload')
            this.successToast()
          })
          .catch(() => {
            this.failureToast(3)
          })
      } else if (this.modelType === 'DOCUMENT') {
        new DocumentApi(this.$store.getters['auth/config'])
          .deleteDoc(fduuid)
          .then(() => {
            this.$emit('reload')
            this.successToast()
          })
          .catch(() => {
            this.failureToast(3)
          })
      } else {
        this.failureToast(2)
      }
    },
    successToast() {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Success',
        type: 'is-success',
      })
    },
    failureToast(err: Number) {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: `Failed [ Error : ${err} ]`,
        position: 'is-bottom',
        type: 'is-danger',
      })
    },
  },
})
</script>

<style lang="scss">
.option-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 20px;
  background-color: whitesmoke;
  border-radius: 16px;
  height: auto;
  width: 100%;

  i {
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

  button {
    min-width: 160px;
    margin: 4px;
  }
}
</style>
