<template>
  <div class="nav-header-container">
    <HomeIcon class="home-icon-box" />
    <DropDown v-if="isLoggedin && isDropDownEnable" class="dropdown-box" />
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
  props: {
    isDropDownEnable: {
      type: Boolean,
      default: true,
    },
  },
  data(): DataType {
    return {
      isLoggedin: true,
    }
  },
})
</script>

<style lang="scss" scoped>
.nav-header-container {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  background-color: black;
  z-index: 999;

  .dropdown-box {
    margin: 0 0 0 auto;
    right: 0;
  }
}
</style>
