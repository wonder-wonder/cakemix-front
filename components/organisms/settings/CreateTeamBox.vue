<template>
  <form class="create-team-box" @submit.prevent="create">
    <fa-icon icon="users" class="icon" />
    <Input
      class="field-input"
      :label-name="'Team Name'"
      :is-password="false"
      :value="name"
      :autofocus="true"
      @text="name = $event"
    />
    <div class="button-container">
      <b-button
        class="close-button"
        @click="$emit('close')"
        v-text="'Cancel'"
      />
      <b-button
        class="submit-button"
        :native-type="'submit'"
        v-text="'Create'"
      />
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'
import { TeamApi, checkAuthWithStatus } from '@/scripts/api/index'
import { successToast, failureToast } from '@/scripts/utils/toast'
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
    create() {
      if (this.name === '') {
        failureToast(
          // @ts-ignore
          this.$buefy,
          getToastDesc(TOAST_TYPE.SET_TEAM_NAME).failure,
          1
        )
        return
      }
      this.createTeam(this.name)
    },
    createTeam(name: string) {
      new TeamApi(this.$store.getters['auth/config'])
        .postTeam(name)
        .then(() => {
          this.$emit('created')
          successToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.CREATE_NEW_TEAM).success
          )
          this.$emit('close')
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.CREATE_NEW_TEAM).failure,
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

    .close-button {
      width: 120px;
      margin: 4px;
      font-weight: bold;
      color: $font-color;
      background-color: $danger-color;
    }
    .submit-button {
      width: 120px;
      margin: 4px;
      font-weight: bold;
      color: $font-color;
      background-color: $accent-color;
    }
  }
}
</style>
