<template>
  <div class="menu-view-container">
    <VerticalMenu :models="models" @click="clickedCell" />
    <Profile />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VerticalMenu, {
  MenuModels,
  MenuModel,
} from '@/components/molecules/menu/VerticalMenu.vue'
import Profile from '@/components/organisms/settings/Profile.vue'

export type SelectedModel = {
  hIndex: Number
  cIndex: Number
}

export type DataType = {
  models: MenuModels[]
  current: SelectedModel
}

export default Vue.extend({
  components: {
    VerticalMenu,
    Profile,
  },
  data(): DataType {
    return {
      models: [
        {
          title: 'User',
          isAdmin: false,
          cells: [
            { title: 'Profile', isSelected: false } as MenuModel,
            { title: 'Auth', isSelected: false } as MenuModel,
          ],
        } as MenuModels,
        {
          title: 'Admin',
          isAdmin: true,
          cells: [{ title: 'Users', isSelected: false } as MenuModel],
        } as MenuModels,
      ],
      current: { hIndex: 0, cIndex: 0 } as SelectedModel,
    }
  },
  methods: {
    clickedCell(h: number, c: number) {
      this.models.forEach(model =>
        model.cells.forEach(cell => (cell.isSelected = false))
      )
      this.models[h].cells[c].isSelected = true
      if (this.current.hIndex === h && this.current.cIndex === c) {
        return
      }
      this.current.hIndex = h
      this.current.cIndex = c
      console.log(this.current)
    },
  },
})
</script>

<style lang="scss">
.menu-view-container {
  display: flex;
  flex-flow: columns wrap;
  width: 1000px;
  margin: 32px auto;
  background-color: rgb(32, 32, 32);
}
</style>
