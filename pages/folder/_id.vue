<template>
  <div class="folder-container">
    <FolderListContainer />
    <DocListContainer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FolderListContainer from '@/components/molecules/folder/FolderListContainer.vue'
import DocListContainer from '@/components/molecules/folder/DocListContainer.vue'

@Component({
  components: {
    FolderListContainer,
    DocListContainer,
  },
})
export default class FolderList extends Vue {}
</script>

<style lang="scss">
html {
  background-color: rgb(32, 32, 32);
}
.folder-container {
  display: flex;
  flex-flow: column wrap;
  height: 100vh;
  width: 100vw;
  background-color: rgb(32, 32, 32);
}
</style>
