<template>
  <b-tooltip :label="label" position="is-bottom" :animated="false">
    <button class="button">
      <i :class="buttonIcon" />
    </button>
  </b-tooltip>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    label: {
      type: String,
      default: '',
    },
    buttonIcon: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss"></style>
