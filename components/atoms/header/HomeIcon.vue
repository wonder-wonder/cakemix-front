<template>
  <div class="home-icon-box" @click="gotoHome">
    <div class="image-box">
      <img src="@/assets/icon.png" alt="cakemix_home_icon" />
    </div>
    <div class="service-name" v-text="'Cakemix'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    gotoHome() {
      this.$router.push({ path: `/` })
    },
  },
})
</script>

<style lang="scss" scoped>
.home-icon-box {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  .image-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    width: 42px;
    border-radius: 50%;
    padding: 8px;
    background-color: white;
  }

  .service-name {
    font-family: 'Righteous';
    font-size: 24px;
    padding: 0 16px;
    color: $font-color;
  }
}
</style>
