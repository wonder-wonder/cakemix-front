<template>
  <div class="settings-container">
    <NavHeader :is-drop-down-enable="true" />
    <MenuView :current="view" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import MenuView from '@/components/organisms/settings/MenuView.vue'

export default Vue.extend({
  components: {
    NavHeader,
    MenuView,
  },
  computed: {
    view(): string {
      return this.$route.params.id
    },
  },
})
</script>

<style lang="scss">
html {
  background-color: rgb(32, 32, 32);
}
.settings-container {
  display: flex;
  flex-flow: column wrap;
  width: 100vw;
  background-color: rgb(32, 32, 32);
}
</style>
