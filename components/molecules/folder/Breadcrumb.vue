<template>
  <div class="breadcrumb-container">
    <Cell
      v-for="(item, index) in breadcrumb"
      :key="index"
      :title="getTitle(item.title)"
      :folder-id="item.folder_id"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Cell from '@/components/atoms/cell/BreadcrumbCell.vue'
import { BreadcrumbModel } from '@/scripts/api/index'

export default Vue.extend({
  components: {
    Cell,
  },
  props: {
    breadcrumb: {
      type: Object as PropType<BreadcrumbModel[]>,
      default: [],
    },
  },
  methods: {
    getTitle(title: string): string {
      return title === '' ? 'Home' : title
    },
  },
})
</script>

<style lang="scss">
.breadcrumb-container {
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  justify-content: left;
  padding: 0 32px;
  width: auto;
}
</style>
