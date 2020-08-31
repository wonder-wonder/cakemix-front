<template>
  <div class="folder-container">
    <NavHeader />
    <FolderListContainer />
    <DocListContainer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FolderListContainer from '@/components/molecules/folder/FolderListContainer.vue'
import DocListContainer from '@/components/molecules/folder/DocListContainer.vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'

export default Vue.extend({
  components: {
    NavHeader,
    FolderListContainer,
    DocListContainer,
  },
})
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
