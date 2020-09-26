<template>
  <b-field :label="labelName">
    <b-input type="textarea" :value="value" @input="$emit('text', $event)" />
  </b-field>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    labelName: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
})
</script>
