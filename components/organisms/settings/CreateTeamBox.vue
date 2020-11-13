<template>
  <div class="create-team-box">
    <i class="fa fa-users fa-fw" />
    <Input
      :label-name="'Team Name'"
      :is-password="false"
      :value="name"
      @text="name = $event"
    />
    <b-button type="is-success" @click="createTeam" v-text="'Create'" />
    <b-button type="is-danger" @click="$emit('close')" v-text="'Cancel'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'
import { failureToast } from '@/scripts/tools/toast'

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
    createTeam() {
      if (this.name === '') {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Need to set team name', 1)
        return
      }
      this.$emit('create', this.name)
    },
  },
})
</script>

<style lang="scss">
.create-team-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 20px;
  background-color: whitesmoke;
  border-radius: 16px;
  height: auto;

  i {
    font-size: 80px;
    color: black;
  }
  button {
    min-width: 160px;
    margin: 4px;
  }
  label {
    color: black;
  }
}
</style>
