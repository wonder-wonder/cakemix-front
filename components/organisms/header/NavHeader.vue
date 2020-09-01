<template>
  <div class="nav-header-container">
    <HomeIcon class="home-icon-box" />
    <DropDown v-if="isLoggedin" class="dropdown-box" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HomeIcon from '@/components/atoms/header/HomeIcon.vue'
import DropDown from '@/components/molecules/header/DropDown.vue'

export type DataType = {
  isLoggedin: boolean
}

export default Vue.extend({
  components: { HomeIcon, DropDown },
  data(): DataType {
    return {
      isLoggedin: true,
    }
  },
})
</script>

<style lang="scss">
.nav-header-container {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  height: 50px;
  width: 100vw;
  background-color: black;

  .home-icon-box {
    margin-left: 32px;
  }
  .dropdown-box {
    margin: 0 32px 0 auto;
    right: 0;
  }
}
</style>
