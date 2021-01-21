<template>
  <form class="create-team-box" @submit.prevent="create">
    <fa-icon icon="users" class="icon" />
    <Input
      :label-name="'Team Name'"
      :is-password="false"
      :value="name"
      :autofocus="true"
      @text="name = $event"
    />
    <b-button type="is-success" :native-type="'submit'" v-text="'Create'" />
    <b-button type="is-danger" @click="$emit('close')" v-text="'Cancel'" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'
import { TeamApi, checkAuthWithStatus } from '@/scripts/api/index'
import { successToast, failureToast } from '@/scripts/utils/toast'

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
    successToast,
    failureToast,
    checkAuthWithStatus,
    create() {
      if (this.name === '') {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Need to set team name', 1)
        return
      }
      this.createTeam(this.name)
    },
    createTeam(name: string) {
      new TeamApi(this.$store.getters['auth/config'])
        .postTeam(name)
        .then(() => {
          this.$emit('created')
          // @ts-ignore
          this.successToast(this.$buefy, 'Success to create new team')
          this.$emit('close')
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'Failed to create',
            err.response.status
          )
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.create-team-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 16px;
  background-color: whitesmoke;
  border-radius: 16px;
  height: auto;

  .icon {
    height: 80px;
    font-size: 80px;
    color: black;
  }
  button {
    width: 190px;
    margin: 4px;
  }
  label {
    color: black;
  }
}
</style>
