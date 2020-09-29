<template>
  <b-dropdown aria-role="list">
    <button slot="trigger" slot-scope="{ active }" class="button">
      <span>Menu</span>
      <b-icon :icon="active ? 'menu-up' : 'menu-down'" />
    </button>

    <b-dropdown-item aria-role="listitem" @click="moveTo('settings')">
      <span><i class="fa fa-cog title-icon" />Settings</span>
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem">
      <span><i class="fa fa-sign-out title-icon" />Logout</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    moveTo(page: string) {
      switch (page) {
        case 'settings':
          this.$router.push({ path: `/settings` })
          break
        default:
          break
      }
    },
  },
})
</script>

<style lang="scss">
.title-icon {
  margin-right: 8px;
}
</style>
