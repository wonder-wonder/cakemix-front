<template>
  <div class="uploadable-image-container">
    <b-field :label="labelName">
      <b-image
        class="image-box"
        :src="src"
        :alt="labelName"
        :ratio="ratio"
        :rounded="rounded"
        :placeholder="placeholder"
      />
      <b-upload class="file-label" @input="$emit('upload', $event)">
        <span class="file-cta">
          <b-icon class="file-icon" icon="upload" />
        </span>
      </b-upload>
    </b-field>
    <b-field class="file is-primary file-button-box" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    labelName: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: require('@/assets/noimage.png'),
    },
    src: {
      type: String,
      default: require('@/assets/noimage.png'),
    },
    ratio: {
      type: String,
      default: '1',
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.uploadable-image-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: stretch;
  height: auto;
  width: auto;

  .image-box {
    width: 192px;
    height: 192px;
  }
  .b-image-wrapper /deep/ img {
    border-radius: 8px;
  }
  .file-label .file-cta {
    width: 48px !important;
    height: 192px !important;
    color: white;
    border-width: 0;
    background-color: #48c774;
    margin: 0 8px;
  }
}
</style>
