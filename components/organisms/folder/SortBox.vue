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

const selectModel = ['Newest', 'Oldest', 'Alphabet']

const alphabetFolderSort = (items: FolderModel[]): FolderModel[] => {
  return items.sort((a, b) => ((a.name ?? '') > (b.name ?? '') ? 1 : -1))
}
const alphabetDocuementSort = (items: DocumentModel[]): DocumentModel[] => {
  return items.sort((a, b) => ((a.title ?? '') > (b.title ?? '') ? 1 : -1))
}

const oldestFolderSort = (items: FolderModel[]): FolderModel[] => {
  return items.sort((a, b) =>
    (a.updated_at ?? 0) > (b.updated_at ?? 0) ? 1 : -1
  )
}
const oldestDocuementSort = (items: DocumentModel[]): DocumentModel[] => {
  return items.sort((a, b) =>
    (a.updated_at ?? 0) > (b.updated_at ?? 0) ? 1 : -1
  )
}

const newestFolderSort = (items: FolderModel[]): FolderModel[] => {
  return items.sort((a, b) =>
    (a.updated_at ?? 0) < (b.updated_at ?? 0) ? 1 : -1
  )
}
const newestDocuementSort = (items: DocumentModel[]): DocumentModel[] => {
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
export const oldestSort: SortModel = {
  folder: oldestFolderSort,
  document: oldestDocuementSort,
}

export const newestSort: SortModel = {
  folder: newestFolderSort,
  document: newestDocuementSort,
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
      if (s === 'Newest') {
        return this.$emit('input', newestSort)
      } else if (s === 'Oldest') {
        return this.$emit('input', oldestSort)
      } else if (s === 'Alphabet') {
        return this.$emit('input', alphabetSort)
      }
    },
  },
})
</script>
