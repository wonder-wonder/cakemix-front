<template>
  <div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash'

export default Vue.extend({
  mounted() {
    this.updateDisplayWidth()
    window.addEventListener('resize', this.updateDisplayWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateDisplayWidth)
  },
  methods: {
    updateDisplayWidth: debounce(function (this: any) {
      this.$store.commit('device/windowWidth', window.innerWidth)
    }, 100),
  },
})
</script>

<style lang="scss" src="../styles/foundation.scss"></style>
