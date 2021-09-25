<template>
  <form class="create-folder-box" @submit.prevent="createFolder">
    <fa-icon icon="folder" class="icon" />
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
        class="create-button"
        :native-type="'submit'"
        v-text="'Create'"
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
  data(): DataType {
    return {
      name: '',
    }
  },
  methods: {
    createFolder() {
      if (this.name === '') {
        failureToast(
          // @ts-ignore
          this.$buefy,
          getToastDesc(TOAST_TYPE.SET_FOLDER_NAME).failure,
          1
        )
        return
      }
      this.$emit('create', this.name)
      this.$emit('close')
    },
  },
})
</script>

<style lang="scss" scoped>
.create-folder-box {
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
      font-weight: bold;
      color: white;
      background-color: $dangerous-color;
    }
    .create-button {
      width: 120px;
      margin: 4px;
      font-weight: bold;
      color: white;
      background-color: $accent-color;
    }
  }
}
</style>
