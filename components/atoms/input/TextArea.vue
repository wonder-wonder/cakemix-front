<template>
  <b-field :label="labelName">
    <b-input type="textarea" @input="$emit('text', $event)" />
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
  },
})
</script>
