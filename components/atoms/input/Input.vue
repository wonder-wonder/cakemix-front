<template>
  <b-field :label="labelName">
    <b-input
      :type="labelName.toLowerCase() === 'password' ? 'password' : 'text'"
      :password-reveal="isPassword"
      @input="$emit('text', $event)"
    />
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
    isPassword: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
