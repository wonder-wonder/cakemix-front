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
    <b-button type="is-success" :native-type="'submit'" v-text="'Create'" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'
import { failureToast } from '@/scripts/utils/toast'

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
    failureToast,
    createFolder() {
      if (this.name === '') {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Need to set folder name', 1)
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
  background-color: whitesmoke;
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
    color: black;
  }
  button {
    width: 190px;
    margin: 4px;
  }
}
</style>
