<template>
  <div class="image-container">
    <b-field :label="labelName">
      <b-image
        class="image-box"
        :src="src"
        :alt="labelName"
        :ratio="ratio"
        :placeholder="placeholder"
        :rounded="rounded"
      />
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
      default: 'https://picsum.photos/256/256',
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
  data() {
    return {
      file: null,
    }
  },
})
</script>

<style lang="scss" scoped>
.image-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: stretch;
  height: auto;
  width: auto;

  .image-box {
    width: 216px;
    height: 216px;
  }

  .file-button-box {
    margin-bottom: 12px;
  }
}
</style>
