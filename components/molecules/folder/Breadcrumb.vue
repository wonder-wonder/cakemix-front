<template>
  <div ref="breadcrumb" class="breadcrumb-container">
    <Cell
      v-for="(item, index) in breadcrumb"
      :key="index"
      class="breadcrumb-cell"
      :title="getTitle(item.title)"
      :folder-id="item.folder_id"
      @click="$emit('click', $event)"
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
      type: Array as PropType<BreadcrumbModel[]>,
      default: [] as BreadcrumbModel[],
    },
  },
  methods: {
    getTitle(title: string): string {
      return title === '' ? 'Home' : title
    },
  },
})
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: left;
  min-height: 38px;
  height: auto;

  .breadcrumb-cell {
    margin: 4px;
  }
}
</style>
