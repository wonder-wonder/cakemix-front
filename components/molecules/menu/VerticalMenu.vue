<template>
  <div class="vertical-menu-container">
    <div
      v-for="(model, headerIndex) in models"
      :key="`menu-header-${headerIndex}`"
    >
      <MenuHeader
        v-if="isVisibleMenu(model.isAdmin)"
        :title="convertUpper(model.title)"
        :is-first="headerIndex === 0"
      />
      <div v-if="isVisibleMenu(model.isAdmin)">
        <MenuCell
          v-for="(cell, cellIndex) in model.cells"
          :key="`menu-cell-${headerIndex}-${cellIndex}`"
          :title="cell.title"
          :is-selected="cell.isSelected"
          :is-last="isLast(headerIndex, cellIndex)"
          @click="$emit('click', headerIndex, cellIndex)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import MenuHeader from '@/components/atoms/cell/MenuHeader.vue'
import MenuCell from '@/components/atoms/cell/MenuCell.vue'

export type MenuModel = {
  title: String
  isSelected: Boolean
}

export type MenuModels = {
  title: String
  cells: MenuModel[]
}

export default Vue.extend({
  components: {
    MenuHeader,
    MenuCell,
  },
  props: {
    models: {
      type: Array as PropType<MenuModels[]>,
      default: [],
    },
  },
  methods: {
    isLast(hIndex: number, cIndex: number) {
      return cIndex === this.models[hIndex].cells.length - 1
    },
    convertUpper(text: string) {
      return text.toUpperCase()
    },
    isVisibleMenu(isAdminContent: boolean) {
      if (isAdminContent) {
        // TODO: isAdmin ( user have admin permission )
        const isAdmin = true
        return isAdmin
      }
      return true
    },
  },
})
</script>

<style lang="scss">
.vertical-menu-container {
  display: flex;
  flex-flow: column wrap;
  width: 200px;
  height: auto;
  background-color: rgb(32, 32, 32);
  border: solid 1px rgb(100, 100, 100);
  border-radius: 8px;
}
</style>
