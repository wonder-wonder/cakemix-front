<template>
  <div class="signup-container">
    <NavHeader />
    <SignupBox class="signup-box" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SignupBox from '@/components/organisms/singup/SignupBox.vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'

export default Vue.extend({
  components: {
    NavHeader,
    SignupBox,
  },
})
</script>

<style lang="scss">
html {
  background-color: rgb(32, 32, 32);
}
.signup-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  .signup-box {
    max-width: 320px;
    width: 100vw;
    border-radius: 8px;
  }
}
</style>
