<template>
  <div class="border-title" v-text="title" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.border-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  color: $font-color;
  font-size: 24px;
  font-weight: bold;

  &:before,
  &:after {
    content: '';
    flex-grow: 1;
    height: 4px;
    background-color: $sub-main-color;
    display: block;
  }
  &:before {
    margin-right: 16px;
  }
  &:after {
    margin-left: 16px;
  }
}
</style>
