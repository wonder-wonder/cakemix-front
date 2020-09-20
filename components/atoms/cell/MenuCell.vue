<template>
  <div class="menu-cell-container" :class="customClass">
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
    isSelected: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    customClass() {
      return `${this.isSelected ? 'active' : 'inactive'} ${
        this.isLast ? 'bottom-radius' : ''
      }`
    },
  },
})
</script>

<style lang="scss">
.menu-cell-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 100%;
  height: 40px;
  padding: 0px 16px 0px 16px;
  color: white;
  background-color: rgb(32, 32, 32);
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background-color: rgb(50, 50, 50);
  }

  &.active {
    color: white;
    background-color: grey;
  }

  &.bottom-radius {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
}
</style>
