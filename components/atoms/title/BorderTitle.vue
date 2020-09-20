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

<style lang="scss">
.border-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px auto;
  padding: 8px 32px;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  font-weight: bold;

  &:before,
  &:after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background: grey;
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
