<template>
  <div class="editor-header" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class EditorHeader extends Vue {}
</script>

<style lang="scss">
.editor-header {
  position: relative;
  height: 50px;
  width: 100vw;
  background-color: grey;
}
</style>
