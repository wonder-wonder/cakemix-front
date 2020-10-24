<template>
  <div class="option-box">
    <i class="fa fa-folder fa-fw" />
    <div class="detail-items">
      <OptionInfoCell
        v-for="(model, index) in options"
        :key="`option-info-cell${index}`"
        :model="model"
      />
    </div>
    <Input
      :label-name="'Name'"
      :is-password="false"
      :value="title"
      :disabled="!isWritable"
      @text="password = $event"
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
      @click="$emit('cupdate')"
      v-text="'Update'"
    />
    <b-button
      v-if="isWritable"
      type="is-danger"
      @click="$emit('cdelete')"
      v-text="'Delete'"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Input from '@/components/atoms/input/Input.vue'
import Select from '@/components/atoms/input/Select.vue'
import OptionInfoCell, {
  OptionInfoModel,
} from '@/components/atoms/cell/OptionInfoCell.vue'
import { FolderModel, DocumentModel, ProfileModel } from '@/scripts/api/index'

export type DataType = {
  selectModels: Array<String>
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
  },
  data(): DataType {
    return {
      selectModels: ['Private', 'Read', 'Read / Write'],
    }
  },
  computed: {
    isSeleted() {
      return !!this.model.uuid
    },

    options() {
      const permType = ['Private', 'Read', 'Read / Write']
      const owner = this.model.owner as ProfileModel
      const toDate = (utime: number) => {
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

        return (
          year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
        )
      }
      return [
        { title: 'UUID', detail: this.model.uuid } as OptionInfoModel,
        {
          title: 'Owner',
          detail: owner ? owner.name : '',
        } as OptionInfoModel,
        {
          title: 'Permission',
          detail: permType[this.model.permission ?? 0],
        } as OptionInfoModel,
        {
          title: 'Created at',
          detail: toDate(this.model.created_at ?? 0),
        } as OptionInfoModel,
        {
          title: 'Updated at',
          detail: toDate(this.model.updated_at ?? 0),
        } as OptionInfoModel,
      ]
    },
    title(): String {
      let name = ''
      if ('name' in this.model) {
        name = this.model.name ?? ''
      } else if ('title' in this.model) {
        name = this.model.title ?? ''
      }
      return name
    },
    permission(): String {
      return this.selectModels[this.model.permission ?? 0]
    },
    isWritable(): boolean {
      const owner = this.model.owner as ProfileModel
      return this.model.permission === 2 || owner.uuid === ''
    },
  },
  methods: {
    selected(type: string) {
      const perm = this.selectModels.indexOf(type)
      this.model.permission = perm
    },
    failureToast(err: Number) {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: `Update Failed [ Error : ${err} ]`,
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
