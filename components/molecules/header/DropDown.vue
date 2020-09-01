<template>
  <b-dropdown aria-role="list">
    <button slot="trigger" slot-scope="{ active }" class="button">
      <span>Menu</span>
      <b-icon :icon="active ? 'menu-up' : 'menu-down'" />
    </button>

    <b-dropdown-item aria-role="listitem">
      <span><i class="fa fa-cog title-icon" />Settings</span>
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem">
      <span><i class="fa fa-sign-out title-icon" />Logout</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss">
.title-icon {
  margin-right: 8px;
}
</style>
