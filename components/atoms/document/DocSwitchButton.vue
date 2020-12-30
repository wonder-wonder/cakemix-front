<template>
  <div
    class="document-switch-button"
    :class="isSelected ? 'active' : ''"
    :active="false"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.document-switch-button {
  height: 40px;
  width: auto;
  padding: 5px 16px;
  font-size: 20px;
  border-radius: 5px;

  &.active {
    background-color: white;
    i {
      color: black;
    }
  }
}
</style>
