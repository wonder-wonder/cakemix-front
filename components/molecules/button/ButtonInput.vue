<template>
  <b-field :label="labelName" class="button-input-container">
    <button
      class="button link-button is-primary"
      @click="$emit('click')"
      v-text="buttonName"
    />
    <b-input
      ref="linkinput"
      class="link-input"
      type="text"
      :value="value"
      :readonly="isReadOnly ? 'readonly' : ''"
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
    buttonName: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    isReadOnly: {
      type: Boolean,
      default: true,
    },
  },
})
</script>

<style lang="scss">
.button-input-container {
  width: 100%;
  .link-button {
    font-weight: bold;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .link-input {
    width: 100%;
    margin-left: 4px;
  }

  button {
    width: 160px;
  }
}
</style>
