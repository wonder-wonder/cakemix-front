<template>
  <div class="nav-header-container">
    <HomeIcon class="home-icon-box" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HomeIcon from '@/components/atoms/header/HomeIcon.vue'

export default Vue.extend({
  components: { HomeIcon },
})
</script>

<style lang="scss">
.nav-header-container {
  display: grid;
  height: 50px;
  width: 100vw;
  grid-template-rows: 50px;
  grid-template-columns: repeat(10, 1fr);
  background-color: black;

  .home-icon-box {
    grid-column: 1 / 3;
  }
}
</style>
