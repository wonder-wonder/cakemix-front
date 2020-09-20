<template>
  <div class="menu-view-container">
    <VerticalMenu :models="models" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VerticalMenu, {
  MenuModels,
  MenuModel,
} from '@/components/molecules/menu/VerticalMenu.vue'

export default Vue.extend({
  components: {
    VerticalMenu,
  },
  data() {
    return {
      models: [
        {
          title: 'User',
          isAdmin: false,
          cells: [
            { title: 'Profile', isSelected: false } as MenuModel,
            { title: 'Auth', isSelected: true } as MenuModel,
            { title: 'Admin', isSelected: false } as MenuModel,
          ],
        } as MenuModels,
        {
          title: 'Admin',
          isAdmin: true,
          cells: [
            { title: 'Profile', isSelected: false } as MenuModel,
            { title: 'Users', isSelected: false } as MenuModel,
            { title: 'Admin', isSelected: false } as MenuModel,
          ],
        } as MenuModels,
      ],
    }
  },
})
</script>

<style lang="scss">
.menu-view-container {
  display: flex;
  flex-flow: row wrap;
  width: 1000px;
  margin: 32px auto;
  background-color: rgb(32, 32, 32);
}
</style>
