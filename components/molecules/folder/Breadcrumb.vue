<template>
  <div ref="breadcrumb" class="breadcrumb-container">
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
      type: Array as PropType<BreadcrumbModel[]>,
      default: [],
    },
  },
  watch: {
    breadcrumb() {
      setTimeout(() => {
        const bc = this.$refs.breadcrumb as HTMLDivElement
        bc.scrollTop = bc.clientHeight
      }, 200)
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
  justify-content: left;
  padding: 0 32px;
  min-height: 40px;
  height: auto;
  width: 100vw;
  overflow-x: scroll;
}
</style>
