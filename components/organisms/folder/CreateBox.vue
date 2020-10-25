<template>
  <div class="create-folder-box">
    <i class="fa fa-folder fa-fw" />
    <Input
      :label-name="'Name'"
      :is-password="false"
      :value="name"
      @text="name = $event"
    />
    <b-button type="is-success" @click="createFolder" v-text="'Create'" />
    <b-button type="is-danger" @click="$emit('close')" v-text="'Cancel'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'

export type DataType = {
  selectModels: Array<string>
  name: string
}

export default Vue.extend({
  components: {
    Input,
  },
  data(): DataType {
    return {
      selectModels: ['Private', 'Read', 'Read / Write'],
      name: '',
    }
  },
  methods: {
    createFolder() {
      if (this.name === '') {
        this.failureToast(1)
        return
      }
      this.$emit('create', this.name)
    },
    failureToast(err: number) {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 1000,
        queue: false,
        position: 'is-bottom-right',
        message: `Need to set folder name  [ Error : ${err} ]`,
        type: 'is-danger',
      })
    },
  },
})
</script>

<style lang="scss">
.create-folder-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 20px;
  background-color: whitesmoke;
  border-radius: 16px;
  height: auto;
  width: 100%;

  i {
    font-size: 80px;
    color: black;
  }
  button {
    min-width: 160px;
    margin: 4px;
  }
}
</style>
