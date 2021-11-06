<template>
  <div class="uploadable-image-container">
    <b-field :label="labelName" class="image-container">
      <b-image
        class="image-box"
        :src="src"
        :alt="labelName"
        :ratio="ratio"
        :rounded="rounded"
        :placeholder="placeholder"
      />
      <b-upload class="image-upload-overlay" @input="$emit('upload', $event)">
        <fa-icon class="upload-icon" icon="arrow-up" />
      </b-upload>
    </b-field>
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
  margin-bottom: 12px;

  .image-container {
    .image-box {
      width: 192px;
      height: 192px;
    }
    .image-upload-overlay {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 192px;
      height: 192px;
      border-radius: 8px;
      transition: all 200ms;

      &:hover {
        background-color: $sub-main-color;
        opacity: 0.7;

        .upload-icon {
          color: $contrast-color;
          opacity: 1;
        }
      }

      .upload-icon {
        color: $contrast-color;
        opacity: 0;
        font-size: 48px;
      }
    }
  }
  .b-image-wrapper ::v-deep img {
    border-radius: 8px;
  }
}
</style>
