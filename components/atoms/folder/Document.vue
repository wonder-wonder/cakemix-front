<template>
  <div class="document-box" :class="selected">
    <div class="title-box">
      <span v-text="doc.title" />
    </div>
    <div class="icon-box">
      <fa-icon icon="file" />
    </div>
    <div class="desc1-box" :class="selected">
      <span class="desc1-title" v-text="'UPDATER'" />
      <span v-text="doc.updater.name" />
    </div>
    <div class="desc2-box" :class="selected">
      <span class="desc2-title" v-text="'DATE'" />
      <span v-text="toDate(doc.updated_at)" />
    </div>
    <ActionMenu class="action-box" :class="selected" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import ActionMenu from '@/components/organisms/folder/ActionMenu.vue'
import { DocumentModel } from '@/scripts/api/index'

export default Vue.extend({
  components: {
    ActionMenu,
  },
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
      return this.isSelected ? 'selected' : ''
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

<style lang="scss" scoped>
.document-box {
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
    font-size: 16px;
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
    font-size: 24px;
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
