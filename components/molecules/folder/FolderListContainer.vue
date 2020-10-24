<template>
  <div>
    <BorderTitle :title="'Folder'" class="border-title" />
    <div class="list-container">
      <Folder
        v-for="(model, index) in models"
        :key="`F${index}${uuid}`"
        :folder="model"
        @click.native="$emit('select', model)"
        @dblclick.native="goToFolder(model.uuid)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import BorderTitle from '@/components/atoms/title/BorderTitle.vue'
import Folder from '@/components/atoms/folder/Folder.vue'
import { FolderModel } from '@/scripts/api/index'

export type DataType = {
  uuid: String
}

export default Vue.extend({
  components: {
    BorderTitle,
    Folder,
  },
  props: {
    models: {
      type: Array as PropType<FolderModel[]>,
      default: [],
    },
  },
  data(): DataType {
    return {
      uuid: uuidv4(),
    }
  },
  methods: {
    goToFolder(folderId: string) {
      this.$router.push({ path: `/folder/${folderId}` })
    },
  },
})
</script>

<style lang="scss">
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px auto;
  padding: 8px 32px;
  border-radius: 8px;
  color: white;
  font-size: 24px;

  &:before,
  &:after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background: grey;
    display: block;
  }
  &:before {
    margin-right: 16px;
  }
  &:after {
    margin-left: 16px;
  }
}

.list-container {
  display: flex;
  flex-flow: row wrap;
  margin: 16px;

  .folder-box {
    margin: 16px 0 0 16px;
  }
}

.border-title {
  margin-top: 24px;
  margin-bottom: 24px;
  padding-left: 32px;
  padding-right: 32px;
}
</style>
