<template>
  <div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash'
import { setTheme, THEMELIST } from '@/scripts/colors'

export default Vue.extend({
  created() {
    const theme = this.$store.getters['device/theme']
    setTheme(THEMELIST[theme].toLowerCase())
  },
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
