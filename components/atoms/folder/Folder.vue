<template>
  <div class="folder-box" :class="selected">
    <div class="title-box">
      <span v-text="folder.name" />
    </div>
    <div class="icon-box">
      <fa-icon icon="folder" />
    </div>
    <div class="desc1-box" :class="selected">
      <span class="desc1-title" v-text="'UPDATER'" />
      <span class="desc1-detail" v-text="folder.updater.name" />
    </div>
    <div class="desc2-box" :class="selected">
      <span class="desc2-title" v-text="'DATE'" />
      <span class="desc2-detail" v-text="toDate(folder.updated_at)" />
    </div>
    <ActionMenu
      class="action-box"
      :class="selected"
      :current-folder-id="currentFolderId"
      :model="folder"
      :model-type="'FOLDER'"
      @reload="$emit('reload')"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { FolderModel } from '@/scripts/api/index'
import { toDate } from '@/scripts/utils/date'

export default Vue.extend({
  props: {
    folder: {
      type: Object as PropType<FolderModel>,
      default: Object as FolderModel,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    currentFolderId: {
      type: String,
      default: '',
    },
  },
  computed: {
    selected() {
      return this.isSelected ? 'selected' : ''
    },
  },
  methods: {
    toDate,
  },
})
</script>

<style lang="scss" scoped>
.folder-box {
  display: grid;
  min-width: 288px;
  grid-template-rows: 48px 4px 16px 16px;
  grid-template-columns: 36px 1fr 32px;
  border: solid 1px white;
  border-radius: 5px;
  color: white;
  background-color: black;
  user-select: none;

  &:hover {
    background-color: rgb(50, 50, 50);
  }

  &.selected {
    background-color: rgb(120, 120, 120);
  }

  .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
    grid-column: 1 / 4;
    font-size: 18px;
    font-weight: bold;
    padding: 0 4px;
    overflow: hidden;

    span {
      max-height: 48px;
    }
  }

  .icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 3 / 5;
    grid-column: 1 / 2;
    font-size: 28px;
    padding-top: 4px;
  }

  .desc1-box {
    display: flex;
    align-items: center;
    grid-row: 3 / 4;
    grid-column: 2 / 3;
    font-size: 12px;
    padding: 0 4px;
    border-top-left-radius: 8px;
    color: white;
    background-color: rgb(50, 50, 50);

    .desc1-title {
      display: flex;
      align-items: center;
      width: 68px;
      padding-left: 4px;
      font-size: 10px;
      font-weight: bold;
    }

    &.selected {
      background-color: rgb(120, 120, 120);
    }
  }

  .desc2-box {
    display: flex;
    align-items: center;
    grid-row: 4 / 5;
    grid-column: 2 / 3;
    font-size: 12px;
    padding: 0 4px;
    color: white;
    background-color: rgb(50, 50, 50);
    border-bottom-right-radius: 5px;

    .desc2-title {
      display: flex;
      align-items: center;
      width: 68px;
      padding-left: 4px;
      font-size: 10px;
      font-weight: bold;
    }

    &.selected {
      background-color: rgb(120, 120, 120);
    }
  }

  .action-box {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 3 / 5;
    grid-column: 3 / 4;
    background-color: rgb(50, 50, 50);
    font-size: 16px;

    &.selected {
      background-color: rgb(120, 120, 120);
    }
  }
}
</style>
