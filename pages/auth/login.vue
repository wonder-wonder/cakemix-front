<template>
  <div class="login-container">
    <NavHeader :is-drop-down-enable="false" />
    <LoginBox class="login-box" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginBox from '@/components/organisms/auth/LoginBox.vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import { getTitle, PAGES } from '@/scripts/model/head/index'

export default Vue.extend({
  components: {
    NavHeader,
    LoginBox,
  },
  head: {
    title: getTitle(PAGES.LOGIN),
  },
  beforeCreate() {
    // TODO: need to refactor this routing
    if (this.$store.getters['auth/isLoggedIn']) {
      // TODO: need to modify route
      this.$router.push('/folder/')
    }
  },
})
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100vw;

  .login-box {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    max-width: 320px;
    width: 100%;
    border-radius: 8px;
  }
}
</style>
