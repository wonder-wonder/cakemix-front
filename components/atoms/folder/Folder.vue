<template>
  <div :class="selected">
    <div class="icon-box">
      <i class="fa fa-folder fa-fw" />
    </div>
    <div class="title-box">
      <span v-text="folder.name" />
    </div>
    <div class="desc1-box">
      <span v-text="folder.owner.name" />
    </div>
    <div class="desc2-box">
      <span v-text="toDate(folder.updated_at)" />
    </div>
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
  },
  computed: {
    selected() {
      return this.isSelected ? 'folder-box selected' : 'folder-box'
    },
  },
  methods: {
    toDate,
  },
})
</script>

<style lang="scss">
.folder-box {
  display: grid;
  width: 344px;
  grid-template-rows: 32px 20px 24px;
  grid-template-columns: 64px 280px;
  border: solid 1px white;
  border-radius: 5px;
  color: white;
  background-color: black;
  transition: all 100ms;
  user-select: none;

  &:hover {
    background-color: rgb(50, 50, 50);
  }

  &.selected {
    background-color: rgb(120, 120, 120);
  }

  .icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 4;
    grid-column: 1;
    font-size: 40px;
  }

  .title-box {
    display: flex;
    align-items: center;
    grid-row: 1;
    grid-column: 2;
    font-size: 24px;
    font-weight: bold;
  }

  .desc1-box {
    display: flex;
    align-items: center;
    grid-row: 2;
    grid-column: 2;
    font-size: 16px;
  }

  .desc2-box {
    display: flex;
    align-items: center;
    grid-row: 3;
    grid-column: 2;
    font-size: 16px;
  }
}
</style>
