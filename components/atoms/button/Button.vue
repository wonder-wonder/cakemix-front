<template>
  <b-field :label="labelName">
    <b-button :type="color" @click="$emit('click')" v-text="buttonName" />
  </b-field>
</template>

<script lang="ts">
import Vue from 'vue'

export type DataType = {
  text: string
}

export default Vue.extend({
  props: {
    labelName: {
      type: String,
      default: '',
    },
    buttonName: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'is-dark',
    },
  },
})
</script>

<style lang="scss" scoped>
button {
  width: 100%;
}
</style>
