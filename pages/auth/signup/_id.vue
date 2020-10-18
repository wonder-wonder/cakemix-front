<template>
  <div class="signup-container">
    <NavHeader :is-drop-down-enable="false" />
    <SignupBox class="signup-box" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SignupBox from '@/components/organisms/auth/SignupBox.vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import { AuthApi } from '@/scripts/api/index'

export default Vue.extend({
  components: {
    NavHeader,
    SignupBox,
  },
  created() {
    // TODO: impl: verify signup token
  },
})
</script>

<style lang="scss">
html {
  background-color: rgb(32, 32, 32);
}
.signup-container {
  height: 100%;
  width: 100vw;

  .signup-box {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    max-width: 320px;
    width: 100vw;
    border-radius: 8px;
  }
}
</style>
