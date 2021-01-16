<template>
  <div class="breadcrumb-cell-container">
    <div
      :class="dark ? 'black-title' : 'white-title'"
      @click="$emit('click', folderId)"
      v-text="title"
    />
    <i
      class="fa fa-chevron-right"
      :class="dark ? 'white-triangle' : 'black-triangle'"
    />
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

<style lang="scss" scoped>
.breadcrumb-cell-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  user-select: none;

  .title {
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

  .triangle {
    font-size: 24px;
    margin-top: 2px;
  }

  .black-triangle {
    @extend .triangle;
    color: white;
  }

  .white-triangle {
    @extend .triangle;
    color: black;
  }
}
</style>
