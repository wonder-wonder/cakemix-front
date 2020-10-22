<template>
  <div class="folder-container">
    <NavHeader />
    <ToolBar />
    <Breadcrumb v-if="breadcrumb.length > 0" :breadcrumb="breadcrumb" />
    <FolderListContainer :models="folders" />
    <DocListContainer :models="docs" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ToolBar from '@/components/molecules/folder/ToolBar.vue'
import Breadcrumb from '@/components/molecules/folder/Breadcrumb.vue'
import NavHeader from '@/components/organisms/header/NavHeader.vue'
import FolderListContainer from '@/components/molecules/folder/FolderListContainer.vue'
import DocListContainer from '@/components/molecules/folder/DocListContainer.vue'
import {
  FolderApi,
  FolderModel,
  DocumentModel,
  BreadcrumbModel,
} from '@/scripts/api/index'

export type DataType = {
  folders: Array<FolderModel>
  docs: Array<DocumentModel>
  breadcrumb: Array<BreadcrumbModel>
}

export default Vue.extend({
  components: {
    NavHeader,
    ToolBar,
    Breadcrumb,
    FolderListContainer,
    DocListContainer,
  },
  data(): DataType {
    return {
      folders: [],
      docs: [],
      breadcrumb: [],
    }
  },
  created() {
    new FolderApi(this.$store.getters['auth/config'])
      .getList(this.$route.params.id ?? '', '')
      .then(res => {
        this.folders = res.data.folder ?? []
        this.docs = res.data.document ?? []
        this.breadcrumb = res.data.path ?? []
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
