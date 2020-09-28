<template>
  <div class="menu-view-container">
    <VerticalMenu :models="models" @click="clickedCell" />
    <Profile v-if="currentView === 'Profile'" />
    <Auth v-if="currentView === 'Auth'" />
    <Users v-if="currentView === 'Users'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VerticalMenu, {
  MenuModels,
  MenuModel,
} from '@/components/molecules/menu/VerticalMenu.vue'
import Profile from '@/components/organisms/settings/Profile.vue'
import Auth from '@/components/organisms/settings/Auth.vue'
import Users from '@/components/organisms/settings/Users.vue'

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
    Auth,
    Users,
  },
  data(): DataType {
    return {
      models: [
        {
          title: 'User',
          isAdmin: false,
          cells: [
            { title: 'Profile', isSelected: true } as MenuModel,
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
  computed: {
    currentView(): String {
      const h = this.current.hIndex as number
      const c = this.current.cIndex as number
      return this.models[h].cells[c].title
    },
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
