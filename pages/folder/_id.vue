<template>
  <div class="folder-container">
    <ListContainer>
      <Folder v-for="(item, index) in 5" :key="index" />
    </ListContainer>
    <ListContainer>
      <Document v-for="(item, index) in 5" :key="index" />
    </ListContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Folder from '@/components/atoms/folder/Folder.vue'
import Document from '@/components/atoms/folder/Document.vue'
import ListContainer from '@/components/molecules/folder/ListContainer.vue'

@Component({
  components: {
    Folder,
    Document,
    ListContainer,
  },
})
export default class FolderList extends Vue {}
</script>

<style lang="scss">
.folder-container {
  display: flex;
  flex-flow: column wrap;
  height: 500px;
  width: 100vw;
  padding: 0 16px;
}
</style>
