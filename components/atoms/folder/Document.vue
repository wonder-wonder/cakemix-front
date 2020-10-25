<template>
  <div :class="selected">
    <div class="icon-box">
      <i class="fa fa-file fa-fw" />
    </div>
    <div class="title-box">
      <span v-text="doc.title" />
    </div>
    <div class="desc1-box">
      <span v-text="doc.owner.name" />
    </div>
    <div class="desc2-box">
      <span v-text="toDate(doc.created_at)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { DocumentModel } from '@/scripts/api/index'

export default Vue.extend({
  props: {
    doc: {
      type: Object as PropType<DocumentModel>,
      default: Object as DocumentModel,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selected() {
      return this.isSelected ? 'document-box selected' : 'document-box'
    },
  },
  methods: {
    toDate(utime: number): string {
      const dt = new Date(utime * 1000)
      if (!dt) {
        return ''
      }
      const year = dt.getFullYear()
      const month = dt.getMonth() + 1
      const day = dt.getDate()
      const hour = ('0' + dt.getHours()).slice(-2)
      const min = ('0' + dt.getMinutes()).slice(-2)
      const sec = ('0' + dt.getSeconds()).slice(-2)

      return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
    },
  },
})
</script>

<style lang="scss">
.document-box {
  display: grid;
  width: 344px;
  grid-template-rows: 32px 20px 24px;
  grid-template-columns: 64px 266px 14px;
  border: solid 1px white;
  border-radius: 5px;
  color: white;
  background-color: black;
  transition: all 100ms;
  user-select: none;

  &:hover {
    background-color: rgb(100, 100, 100);
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
    overflow: hidden;
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
