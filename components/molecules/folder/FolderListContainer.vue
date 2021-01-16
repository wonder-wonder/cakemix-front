<template>
  <div class="list-container">
    <BorderTitle :title="'Folder'" class="border-title" />
    <div ref="folder-container" class="item-container">
      <Folder
        v-for="(model, index) in models"
        :key="`F${index}${uuid}`"
        class="folder-cell"
        :folder="model"
        :is-selected="selectedIndex === index"
        @click.native="selected(model, index)"
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
  uuid: string
  selectedIndex: number
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
      selectedIndex: -1,
    }
  },
  mounted() {
    this.updateWidth()
    window.addEventListener('resize', this.updateWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWidth)
  },
  methods: {
    resetIndex() {
      this.selectedIndex = -1
    },
    goToFolder(folderId: string) {
      this.$router.push({ path: `/folder/${folderId}` })
    },
    selected(model: FolderModel, index: number) {
      this.selectedIndex = index
      this.$emit('select', 'FOLDER', model)
    },
    updateWidth() {
      const hMargin = 16
      const cellWidth = 288
      const cellWidthWithMargin = cellWidth + hMargin
      const folderContainer = this.$refs['folder-container'] as HTMLElement
      const listWidth = folderContainer.clientWidth
      const minNumCell = Math.floor(listWidth / cellWidthWithMargin)
      const cellWidthDiff = listWidth - minNumCell * cellWidthWithMargin
      const eCellWidthWithMargin =
        cellWidthWithMargin + Math.floor(cellWidthDiff / minNumCell)
      const eCellWidth = eCellWidthWithMargin - hMargin
      const folderCells = document.getElementsByClassName('folder-cell')
      for (let index = 0; index < folderCells.length; index++) {
        const cell = folderCells[index] as HTMLElement
        cell.style.width = `${eCellWidth}px`
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.list-container {
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

  .item-container {
    display: flex;
    flex-flow: row wrap;
    margin: 0 8px;

    .folder-box {
      margin: 8px;
    }
  }

  .border-title {
    margin: 16px 0;
    padding: 0 16px;
  }
}
</style>
