<template>
  <div class="breadcrumb-cell-container">
    <div class="cell-title" @click="$emit('click', folderId)" v-text="title" />
    <fa-icon icon="chevron-right" class="triangle" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export type DataType = {}

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
    folderId: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.breadcrumb-cell-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  user-select: none;

  .cell-title {
    height: 30px;
    line-height: 28px;
    width: auto;
    border-radius: 8px;
    padding: 0 8px;
    margin-right: 8px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
    color: $font-color;
    &:hover {
      background-color: $sub-accent-color;
    }
  }

  .triangle {
    font-size: 24px;
    color: $font-color;
  }
}
</style>
