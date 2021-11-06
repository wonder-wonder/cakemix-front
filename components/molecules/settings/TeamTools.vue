<template>
  <div class="team-tools-container">
    <b-button
      class="create-button"
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
  width: 100%;
  padding: 0 8px;

  .create-button {
    width: auto;
    font-weight: bold;
    margin: 4px 0;
    margin-left: auto;
    color: white;
    background-color: $accent-color;
  }
}
</style>
