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
import { FolderApi, FolderModel, DocumentModel } from '@/scripts/api/index'

export type DataType = {
  folders: Array<FolderModel>
  docs: Array<DocumentModel>
}

export default Vue.extend({
  components: {
    NavHeader,
    FolderListContainer,
    DocListContainer,
  },
  data(): DataType {
    return {
      folders: [],
      docs: [],
    }
  },
  created() {
    new FolderApi(this.$store.getters['auth/config'])
      .getList(this.$route.params.id ?? '', '')
      .then(res => {
        this.folders = res.data.folder ?? []
        this.docs = res.data.document ?? []
      })
      .catch(() => {
        this.failureToast(1)
      })
  },
  methods: {
    failureToast(err: Number) {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: `Fetch folder Failed [ Error : ${err} ]`,
        position: 'is-bottom',
        type: 'is-danger',
      })
    },
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
