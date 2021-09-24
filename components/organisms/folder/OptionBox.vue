<template>
  <div class="option-box-container">
    <fa-icon :icon="imageType" class="icon" />
    <div class="detail-items">
      <OptionInfoCell
        v-for="(mo, index) in options"
        :key="`option-info-cell${index}`"
        :model="mo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import OptionInfoCell, {
  OptionInfoModel,
} from '@/components/atoms/cell/OptionInfoCell.vue'
import { FolderModel, DocumentModel, ProfileModel } from '@/scripts/api/index'
import { toDate } from '@/scripts/utils/date'

export type DataType = {
  selectModels: Array<string>
}

export default Vue.extend({
  components: {
    OptionInfoCell,
  },
  props: {
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
  },
  data(): DataType {
    return {
      selectModels: ['Private', 'Read', 'Read / Write'],
    }
  },
  computed: {
    imageType(): string {
      return this.modelType === 'FOLDER'
        ? 'folder'
        : this.modelType === 'DOCUMENT'
        ? 'file'
        : 'minus'
    },
    isSelected(): boolean {
      return 'uuid' in this.model
    },
    options(): Array<OptionInfoModel> {
      const toDate = (utime: number) => {
        return this.isSelected ? this.toDate(utime) : '---'
      }

      const uuid = this.model.uuid !== undefined ? this.model.uuid : '---'
      const owner = this.model.owner as ProfileModel
      const ownerName = owner !== undefined ? owner.name : '---'
      const updater = this.model.updater as ProfileModel
      const updaterName = updater !== undefined ? updater.name : '---'
      const createdAt = this.model.created_at ?? 0
      const updatedAt = this.model.updated_at ?? 0

      return [
        { title: 'UUID', detail: uuid } as OptionInfoModel,
        {
          title: 'Owner',
          detail: ownerName,
        } as OptionInfoModel,
        {
          title: 'Updater',
          detail: updaterName,
        } as OptionInfoModel,
        {
          title: 'Others',
          detail: this.permission,
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
          ? (this.model as FolderModel).name ?? ''
          : this.modelType === 'DOCUMENT'
          ? (this.model as DocumentModel).title ?? ''
          : ''
      return name
    },
    permission(): string {
      return this.model.permission !== undefined
        ? this.selectModels[this.model.permission]
        : '---'
    },
  },
  methods: {
    toDate,
  },
})
</script>

<style lang="scss" scoped>
.option-box-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 16px;
  background-color: $sub-main-color;
  border-radius: 4px;
  height: auto;
  width: 400px;
  max-width: 100vw;

  .icon {
    height: 60px;
    font-size: 60px;
    color: $contrast-color;
  }
  .detail-items {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
