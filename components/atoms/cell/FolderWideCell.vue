<template>
  <div class="folder-wide-cell-container">
    <div class="icon-box">
      <fa-icon icon="folder" />
    </div>
    <div class="title-item" v-text="folder.name" />
    <div class="detail-item" v-text="folder.uuid" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { FolderModel } from '@/scripts/api/index'

export default Vue.extend({
  props: {
    folder: {
      type: Object as PropType<FolderModel>,
      default: {} as FolderModel,
    },
  },
})
</script>

<style lang="scss" scoped>
.folder-wide-cell-container {
  display: grid;
  grid-template-rows: 20px 20px;
  grid-template-columns: 40px auto;
  align-items: center;
  height: 56px;
  width: 100%;
  padding: 8px;
  transition: all 100ms;
  color: $font-color;

  &:hover {
    background-color: $main-color;
  }

  .icon-box {
    grid-row: 1 / 3;
    grid-column: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $sub-main-color;
    height: 40px;
    width: 40px;
    font-size: 32px;
    border-radius: 8px;
    background-color: $contrast-color;
  }

  .title-item {
    grid-row: 1 / 2;
    grid-column: 2;
    font-size: 17px;
    margin-left: 16px;
    font-weight: bold;
  }

  .detail-item {
    grid-row: 2 / 3;
    grid-column: 2;
    font-size: 12px;
    margin-left: 16px;
    color: $font-color;
  }
}
</style>
