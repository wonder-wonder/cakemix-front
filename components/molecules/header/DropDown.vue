<template>
  <b-dropdown aria-role="list">
    <button slot="trigger" slot-scope="{ active }" class="button">
      <span>Menu</span>
      <b-icon :icon="active ? 'menu-up' : 'menu-down'" />
    </button>

    <b-dropdown-item aria-role="listitem" @click="moveTo('settings')">
      <span><i class="fa fa-cog title-icon" />Settings</span>
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem" @click="moveTo('logout')">
      <span><i class="fa fa-sign-out title-icon" />Logout</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  AuthApi,
  Configuration,
  ConfigurationParameters,
} from '@/scripts/api/index'

export default Vue.extend({
  methods: {
    moveTo(page: string) {
      switch (page) {
        case 'settings':
          this.$router.push({ path: `/settings` })
          break
        case 'logout':
          // eslint-disable-next-line no-case-declarations
          const config = new Configuration({
            accessToken: this.$store.state.auth.token,
          } as ConfigurationParameters)
          // eslint-disable-next-line no-case-declarations
          const authApi = new AuthApi(config)
          authApi.postLogout().finally(() => {
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

<style lang="scss">
.title-icon {
  margin-right: 8px;
}
</style>
