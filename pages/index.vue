<template>
  <div class="index-container">
    <div class="image-box">
      <img src="@/assets/icon.png" alt="cakemix_icon" >
    </div>
    <div class="description">
      <div class="service-name" v-text="'Cakemix'" />
      <span v-text="'Document management system for all creative team'" />
      <span v-text="'Real-time edit with multiple users'" />
      <span v-text="'Open source'" />
    </div>
    <b-button rounded @click="gotoLogin" v-text="'Login'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    gotoLogin() {
      this.$router.push({ path: `/login` })
    },
  },
})
</script>

<style lang="scss">
html {
  background-color: rgb(32, 32, 32);
}
.index-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: 'Righteous';

  .image-box {
    background-color: whitesmoke;
    border-radius: 182px;
    height: 80vw;
    max-height: 300px;
    width: 80vw;
    max-width: 300px;
    padding: 32px;
  }

  .description {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    font-size: 24px;
    color: white;

    .service-name {
      font-size: 60px;
    }
  }

  button {
    margin-top: 40px;
    height: 48px;
    width: 160px;
    font-family: 'Righteous';
    font-size: 24px;
    border-width: 5px;
  }
}
</style>
