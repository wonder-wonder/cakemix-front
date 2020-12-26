<template>
  <div class="list-container">
    <BorderTitle :title="'Document'" class="border-title" />
    <div class="item-container">
      <Document
        v-for="(model, index) in models"
        :key="`D${index}${uuid}`"
        :doc="model"
        :is-selected="selectedIndex === index"
        @click.native="selected(model, index)"
        @dblclick.native="goToDoc(model.uuid)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import BorderTitle from '@/components/atoms/title/BorderTitle.vue'
import Document from '@/components/atoms/folder/Document.vue'
import { DocumentModel } from '~/scripts/api'

export type DataType = {
  uuid: string
  selectedIndex: Number
}

export default Vue.extend({
  components: {
    BorderTitle,
    Document,
  },
  props: {
    models: {
      type: Array as PropType<DocumentModel[]>,
      default: [],
    },
    resetIndex: {
      type: Number,
      default: -1,
    },
  },
  data(): DataType {
    return {
      uuid: uuidv4(),
      selectedIndex: -1,
    }
  },
  watch: {
    resetIndex() {
      this.selectedIndex = -1
    },
  },
  methods: {
    goToDoc(documentId: string) {
      this.$router.push({ path: `/doc/${documentId}` })
    },
    selected(model: DocumentModel, index: Number) {
      this.selectedIndex = index
      this.$emit('select', 'DOCUMENT', model)
    },
  },
})
</script>

<style lang="scss">
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
    margin: 0px 24px;

    .document-box {
      margin: 8px;
    }
  }

  .border-title {
    margin-top: 24px;
    margin-bottom: 24px;
    padding-left: 32px;
    padding-right: 32px;
  }
}
</style>
