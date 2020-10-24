<template>
  <div class="toolbar-container">
    <b-input
      placeholder="Search..."
      type="search"
      icon="magnify"
      class="search-input"
    />
    <b-button
      type="is-success"
      icon-left="folder"
      @click="$emit('create-folder')"
    >
      Create
    </b-button>
    <b-button
      type="is-success"
      icon-left="file-document"
      @click="$emit('create-doc')"
    >
      Create
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export type DataType = {}

export default Vue.extend({
  props: {
    models: {
      type: Array,
      default: null,
    },
  },
  data(): DataType {
    return {}
  },
})
</script>

<style lang="scss">
.toolbar-container {
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  justify-content: center;
  padding: 0 32px;
  width: auto;

  .search-input {
    max-width: 500px;
    width: 100%;
    margin: 4px;
  }
  button {
    width: auto;
    font-weight: bold;
    margin: 4px;
  }
}
</style>
