<template>
  <b-dropdown aria-role="list" :mobile-modal="false">
    <button slot="trigger" slot-scope="{ active }" class="button">
      <span>Menu</span>
      <b-icon :icon="active ? 'menu-up' : 'menu-down'" />
    </button>

    <b-dropdown-item aria-role="listitem" @click="moveTo('settings')">
      <span><fa-icon class="title-icon" icon="cog" />Settings</span>
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem" @click="moveTo('logout')">
      <span><fa-icon class="title-icon" icon="sign-out-alt" />Logout</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'
import { AuthApi } from '@/scripts/api/index'

export default Vue.extend({
  methods: {
    moveTo(page: string) {
      switch (page) {
        case 'settings':
          this.$router.push({ path: `/settings` })
          break
        case 'logout':
          new AuthApi(this.$store.getters['auth/config'])
            .postLogout()
            .finally(() => {
              this.$store.commit('auth/logout')
              this.$router.push({ path: `/` })
            })
          break
        default:
          break
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.title-icon {
  margin-right: 8px;
}
.button {
  color: $font-color;
  background-color: $sub-main-color;
}
</style>
