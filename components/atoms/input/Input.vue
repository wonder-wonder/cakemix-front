<template>
  <b-field :label="labelName" :type="isError ? 'is-danger' : ''">
    <b-input
      :type="isPassword ? 'password' : 'text'"
      :password-reveal="isPassword"
      :value="value"
      :disabled="disabled"
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
    isError: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
