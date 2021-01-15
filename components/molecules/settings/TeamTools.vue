<template>
  <div class="team-tools-container">
    <b-button
      type="is-success"
      icon-left="account-group"
      @click="$emit('create-team')"
    >
      Create Team
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export type DataType = {}

export default Vue.extend({
  props: {
    models: {
      type: Array,
      default: null,
    },
  },
})
</script>

<style lang="scss" scoped>
.team-tools-container {
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  justify-content: center;
  width: auto;

  button {
    width: auto;
    font-weight: bold;
    margin: 4px;
  }
}
</style>
