<template>
  <div class="index-container">
    <div class="image-box">
      <img ref="icon" src="@/assets/icon.png" alt="cakemix_icon" />
    </div>
    <div class="description">
      <div class="service-name" v-text="'Cakemix'" />
      <span v-text="'Document management system for all creative team'" />
      <span v-text="'Real-time edit with multiple users'" />
      <span v-text="'Open source'" />
    </div>
    <b-button rounded class="login-button" @click="gotoLogin"> Login </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const CMD_KEYS = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export default Vue.extend({
  data() {
    return {
      konamiKeysMatch: 0,
    }
  },
  mounted() {
    document.addEventListener('keydown', this.keyDown)
  },
  destroyed() {
    document.removeEventListener('keydown', this.keyDown)
  },
  methods: {
    gotoLogin() {
      this.$router.push('/auth/login')
    },
    keyDown(e: KeyboardEvent) {
      if (this.konamiKeysMatch === CMD_KEYS.length) return
      if (CMD_KEYS[this.konamiKeysMatch] === e.key) {
        this.konamiKeysMatch += 1
        if (this.konamiKeysMatch === CMD_KEYS.length) {
          const icon: any = this.$refs.icon
          if (icon instanceof HTMLImageElement) {
            icon.src = require('@/assets/icon_eat.gif')
          }
        }
      } else {
        this.konamiKeysMatch = 0
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.index-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 0 16px;
  font-family: 'Righteous';
  background-color: $main-color;

  .image-box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
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
    color: $font-color;

    .service-name {
      font-size: 60px;
    }
  }

  .login-button {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-content: center;
    margin-top: 40px;
    height: 48px;
    width: 160px;
    font-family: 'Righteous';
    font-size: 24px;
    border-width: 5px;
    border-color: $contrast-color;
    color: $font-color;
    background-color: $sub-main-color;
    outline: none;

    &:hover {
      color: $sub-main-color;
      background-color: $contrast-color;
    }
  }
}
</style>
