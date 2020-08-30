<template>
  <b-field
    :label="labelName"
    :type="isValid ? 'is-success' : 'is-danger'"
    :message="isValid ? message[0] : message[1]"
  >
    <b-input
      :type="labelName.toLowerCase() === 'password' ? 'password' : 'text'"
      :password-reveal="isPassword"
      @input="$emit('text', $event)"
    />
  </b-field>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    isValid: {
      type: Boolean,
      default: false,
    },
    labelName: {
      type: String,
      default: '',
    },
    message: {
      type: Array as PropType<string[]>,
      default: ['', ''],
    },
    isPassword: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
