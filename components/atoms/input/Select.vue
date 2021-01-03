<template>
  <b-field :label="labelName">
    <b-select
      :value="current"
      :placeholder="placeholder"
      :disabled="disabled"
      expanded
      @input="$emit('input', $event)"
    >
      <option
        v-for="(item, index) in selectItems"
        :key="`select-option-${uuid}-${index}`"
        v-text="item"
      />
    </b-select>
  </b-field>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export type DataType = {
  uuid: String
}

export default Vue.extend({
  props: {
    labelName: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    current: {
      type: String,
      default: '',
    },
    selectItems: {
      type: Array as PropType<String[]>,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data(): DataType {
    return {
      uuid: uuidv4(),
    }
  },
})
</script>
