<template>
  <div class="menu-header-container">
    <div v-text="title" />
  </div>
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
.menu-header-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 100%;
  height: 28px;
  padding: 0px 16px 0px 16px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  font-size: 14px;
  font-weight: bold;
  color: black;
  background-color: white;
}
</style>
