<template>
  <div class="breadcrumb-cell-container">
    <div
      :class="dark ? 'black-title' : 'white-title'"
      @click="$emit('click', folderId)"
      v-text="title"
    />
    <div :class="dark ? 'black-triangle-right' : 'white-triangle-right'" />
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
    dark: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.breadcrumb-cell-container {
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
  margin-top: 4px;
  width: auto;
  user-select: none;

  .title {
    height: 30px;
    line-height: 28px;
    width: auto;
    border-radius: 8px;
    padding: 0 8px;
    margin: 0;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
  }
  .white-title {
    @extend .title;
    color: whitesmoke;
    &:hover {
      color: black;
      background-color: whitesmoke;
    }
  }
  .black-title {
    @extend .title;
    color: black;
    &:hover {
      color: whitesmoke;
      background-color: black;
    }
  }

  .triangle-right {
    width: 21px;
    height: 21px;
    margin-top: 4px;
    margin-left: -4px;
    margin-right: 12px;
    border: 5px solid;
    transform: rotate(45deg);
  }
  .white-triangle-right {
    @extend .triangle-right;
    border-color: whitesmoke whitesmoke transparent transparent;
  }
  .black-triangle-right {
    @extend .triangle-right;
    border-color: black black transparent transparent;
  }
}
</style>
