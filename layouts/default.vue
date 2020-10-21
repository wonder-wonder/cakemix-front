<template>
  <div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AuthApi } from '@/scripts/api/index'

export default Vue.extend({
  created() {
    new AuthApi(this.$store.getters['auth/config'])
      .getCheckToken()
      .catch(() => {
        this.failureToast()
        this.$store.commit('auth/logout')
        this.$router.push('/auth/login')
      })
  },
  methods: {
    failureToast() {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Token expired',
        position: 'is-bottom',
        type: 'is-danger',
      })
    },
  },
})
</script>

<style lang="scss" src="../styles/foundation.scss"></style>
