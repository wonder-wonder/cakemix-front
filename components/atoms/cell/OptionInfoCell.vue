<template>
  <div class="option-info-cell">
    <div class="option-info-title" v-text="model.title" />
    <div class="option-info-detail" v-text="model.detail" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export type DataType = {
  uuid: String
}

export type OptionInfoModel = {
  title: string
  detail: string
}

export default Vue.extend({
  props: {
    model: {
      type: Object as PropType<OptionInfoModel>,
      default: {} as OptionInfoModel,
    },
  },
  data(): DataType {
    return {
      uuid: uuidv4(),
    }
  },
})
</script>

<style lang="scss" scoped>
.option-info-cell {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: left;
  height: 20px;
  width: 100%;
  color: black;
  font-size: 12px;

  .option-info-title {
    width: 120px;
    font-weight: bold;
    white-space: nowrap;
    overflow-x: scroll;
  }
  .option-info-detail {
    width: 100%;
    white-space: nowrap;
    overflow-x: scroll;
  }
}
</style>
