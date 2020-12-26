<template>
  <div
    class="document-switch-button"
    :class="isSelected ? 'active' : ''"
    @click="$emit('click')"
  >
    <i v-if="iconType === 'pencil'" class="fa fa-pencil fa-fw" />
    <i v-if="iconType === 'split'" class="fa fa-columns fa-fw" />
    <i v-if="iconType === 'eye'" class="fa fa-eye fa-fw" />
    <i v-if="iconType === 'question'" class="fa fa-question-circle" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    iconType: {
      type: String,
      default: 'pencil',
    },
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
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 5px;

  &.active {
    background-color: rgb(255, 183, 50);
    .fa {
      color: white;
    }
  }
}
</style>
