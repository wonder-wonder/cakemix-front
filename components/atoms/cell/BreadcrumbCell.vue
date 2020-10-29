<template>
  <div class="breadcrumb-cell-container">
    <div class="title" @click="goToFolder" v-text="title" />
    <div class="triangle-right" />
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
  data(): DataType {
    return {}
  },
  methods: {
    goToFolder() {
      this.$router.push(`/folder/${this.folderId}`)
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
    color: whitesmoke;
    border-radius: 8px;
    padding: 0 8px;
    margin: 0;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      color: black;
      background-color: whitesmoke;
    }
  }
  .triangle-right {
    width: 21px;
    height: 21px;
    margin-top: 4px;
    margin-left: -4px;
    margin-right: 12px;
    border: 5px solid;
    border-color: whitesmoke whitesmoke transparent transparent;
    transform: rotate(45deg);
  }
}
</style>
