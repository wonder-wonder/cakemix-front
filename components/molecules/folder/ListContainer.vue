<template>
  <div class="folder-list-container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ListContainer extends Vue {}
</script>

<style lang="scss">
.folder-list-container {
  display: flex;
  flex-flow: row wrap;
  .folder-box {
    margin: 16px 0 0 16px;
  }

  .document-box {
    margin: 16px 0 0 16px;
  }
}
</style>
