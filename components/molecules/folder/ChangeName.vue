<template>
  <form class="rename-box-box" @submit.prevent="rename">
    <fa-icon icon="signature" class="icon" />
    <Input
      class="field-input"
      :label-name="'Folder Name'"
      :is-password="false"
      :value="name"
      :autofocus="true"
      @text="name = $event"
    />
    <div class="button-container">
      <b-button
        class="cancel-button"
        @click="$emit('close')"
        v-text="'Cancel'"
      />
      <b-button
        class="rename-button"
        :native-type="'submit'"
        v-text="'Rename'"
      />
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'
import { failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getToastDesc } from '@/scripts/model/toast'

type DataType = {
  name: string
}

export default Vue.extend({
  components: {
    Input,
  },
  props: {
    initial: {
      type: String,
      default: '',
    },
  },
  data(): DataType {
    return {
      name: '',
    }
  },
  created() {
    this.name = this.initial
  },
  methods: {
    rename() {
      if (this.name === '') {
        // @ts-ignore
        failureToast(this.$buefy, getToastDesc(TOAST_TYPE.SET_NAME).failure)
        return
      }
      this.$emit('updated', this.name)
      this.$emit('close')
    },
  },
})
</script>

<style lang="scss" scoped>
.rename-box-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 16px;
  background-color: $sub-main-color;
  border-radius: 16px;
  height: auto;
  width: 400px;
  max-width: 100vw;

  .field-input {
    width: 100%;
    max-width: 400px;
  }
  .icon {
    height: 80px;
    font-size: 80px;
    color: $contrast-color;
  }
  .button-container {
    display: flex;
    flex-flow: row wrap;

    .cancel-button {
      width: 120px;
      margin: 4px;
      color: $font-color;
      background-color: $dangerous-color;
      font-weight: bold;
    }

    .rename-button {
      width: 120px;
      margin: 4px;
      color: $font-color;
      background-color: $accent-color;
      font-weight: bold;
    }
  }
}
</style>
