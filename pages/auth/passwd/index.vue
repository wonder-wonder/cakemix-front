<template>
  <div class="passwd-container">
    <NavHeader :is-drop-down-enable="false" />
    <PasswdBox class="passwd-box" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import PasswdBox from '@/components/organisms/auth/PasswdBox.vue'
import { getTitle, PAGES } from '@/scripts/model/head/index'

export default Vue.extend({
  components: {
    NavHeader,
    PasswdBox,
  },
  head: {
    title: getTitle(PAGES.FORGOT_PASSWD),
  },
})
</script>

<style lang="scss" scoped>
.passwd-container {
  height: 100vh;
  width: 100vw;

  .passwd-box {
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
