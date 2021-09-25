<template>
  <div class="toolbar-container">
    <b-input
      placeholder="Search..."
      type="search"
      icon="magnify"
      class="search-input"
      @input="$emit('search', $event)"
    />
    <b-button
      class="folder-button"
      icon-left="folder"
      @click="$emit('create-folder')"
    >
      Create
    </b-button>
    <b-button
      class="doc-button"
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
})
</script>

<style lang="scss" scoped>
.toolbar-container {
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  justify-content: center;
  width: auto;

  .search-input {
    max-width: 400px;
    width: 100%;
    margin: 4px;

    ::v-deep input {
      color: $font-color;
      background-color: $sub-main-color;
    }
  }
  .folder-button {
    width: auto;
    font-weight: bold;
    margin: 4px;
    color: white;
    background-color: $accent-color;
  }
  .doc-button {
    width: auto;
    font-weight: bold;
    margin: 4px;
    color: white;
    background-color: $accent-color;
  }
}
</style>
