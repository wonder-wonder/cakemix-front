<template>
  <Select
    :label-name="''"
    :current="current"
    :select-items="selectModel"
    @input="selected"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Select from '@/components/atoms/input/Select.vue'
import { FolderModel, DocumentModel } from '@/scripts/api/index'

type DataType = {
  current: string
  selectModel: string[]
}

const selectModel = ['Alphabet', 'Date']

const alphabetFolderSort = (items: FolderModel[]): FolderModel[] => {
  return items.sort((a, b) => ((a.name ?? '') < (b.name ?? '') ? 1 : -1))
}
const dateFolderSort = (items: FolderModel[]): FolderModel[] => {
  return items.sort((a, b) =>
    (a.updated_at ?? 0) < (b.updated_at ?? 0) ? 1 : -1
  )
}
const alphabetDocuementSort = (items: DocumentModel[]): DocumentModel[] => {
  return items.sort((a, b) => ((a.title ?? '') < (b.title ?? '') ? 1 : -1))
}
const dateDocuementSort = (items: DocumentModel[]): DocumentModel[] => {
  return items.sort((a, b) =>
    (a.updated_at ?? 0) < (b.updated_at ?? 0) ? 1 : -1
  )
}

export type SortModel = {
  folder: Function
  document: Function
}
export const alphabetSort: SortModel = {
  folder: alphabetFolderSort,
  document: alphabetDocuementSort,
}
export const dateSort: SortModel = {
  folder: dateFolderSort,
  document: dateDocuementSort,
}

export default Vue.extend({
  components: {
    Select,
  },
  data(): DataType {
    return {
      current: selectModel[0],
      selectModel,
    }
  },
  methods: {
    selected(s: string) {
      if (s === 'Alphabet') {
        return this.$emit('input', alphabetSort)
      } else if (s === 'Date') {
        return this.$emit('input', dateSort)
      }
    },
  },
})
</script>

<style lang="scss"></style>
