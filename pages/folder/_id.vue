<template>
  <div class="folder-container">
    <NavHeader />
    <FolderListContainer :models="folders" />
    <DocListContainer :models="docs" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FolderListContainer from '@/components/molecules/folder/FolderListContainer.vue'
import DocListContainer from '@/components/molecules/folder/DocListContainer.vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'

export type DataType = {
  folders: Array<Object>
  docs: Array<Object>
}

export default Vue.extend({
  components: {
    NavHeader,
    FolderListContainer,
    DocListContainer,
  },
  data(): DataType {
    return {
      folders: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      docs: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    }
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
  width: 100vw;
  background-color: rgb(32, 32, 32);
}
</style>
