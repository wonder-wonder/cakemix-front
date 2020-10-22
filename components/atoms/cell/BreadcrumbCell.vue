<template>
  <div class="breadcrumb-cell-container">
    <a class="title" @click="goToFolder" v-text="title" />
    <a class="triangle-right" />
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
  width: auto;

  .title {
    height: 30px;
    width: auto;
    color: whitesmoke;
    border-radius: 8px;
    margin: 0;
    border-radius: 0;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      color: black;
      background-color: whitesmoke;
      border-radius: 8px;
    }

    transition: all 200ms;
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
