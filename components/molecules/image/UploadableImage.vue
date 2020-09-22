<template>
  <div class="uploadable-image-container">
    <b-field :label="labelName">
      <b-image
        class="image-box"
        :src="current"
        :alt="labelName"
        :ratio="ratio"
        :rounded="rounded"
      >
        <b-skeleton
          slot="placeholder"
          class="skeleton-placeholder"
          height="100%"
        />
      </b-image>
    </b-field>
    <b-field
      class="file is-primary file-button-box"
      :class="{ 'has-name': !!file }"
    >
      <b-upload v-model="file" class="file-label">
        <span class="file-cta">
          <b-icon class="file-icon" icon="upload" />
          <span class="file-label">Click to upload</span>
        </span>
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
      default: '',
    },
    current: {
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
.uploadable-image-container {
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

/deep/ .b-skeleton {
  height: 100%;
  position: absolute;
  top: 0;
}
</style>
