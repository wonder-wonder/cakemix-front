<template>
  <div class="passwd-box">
    <ValidateInput
      :label-name="'Email'"
      :message="['OK', 'Invalid email']"
      :is-valid="emailValidator(email)"
      @text="email = $event"
    />
    <b-button :loading="isLoading" @click="request" v-text="'Reset request'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ValidateInput from '@/components/atoms/input/ValidateInput.vue'
import { AuthPassResetReqModel, AuthApi } from '@/scripts/api/index'
import { successToast, failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getDesc } from '@/scripts/model/toast/index'
import { emailValidator } from '@/scripts/utils/validator'

export type DataType = {
  email: string
  isLoading: boolean
}

export default Vue.extend({
  components: {
    ValidateInput,
  },
  data(): DataType {
    return {
      email: '',
      isLoading: false,
    }
  },
  methods: {
    emailValidator,
    request() {
      if (!this.emailValidator(this.email)) {
        // @ts-ignore
        failureToast(this.$buefy, getDesc(TOAST_TYPE.RESET_PASSWD).failure, 1)
        return
      }
      this.isLoading = true
      const model: AuthPassResetReqModel = {
        email: this.email,
      }
      new AuthApi(this.$store.getters['auth/config'])
        .postPassReset(model)
        .then(() => {
          successToast(
            // @ts-ignore
            this.$buefy,
            getDesc(TOAST_TYPE.RESET_PASSWD).success
          )
          this.$router.push('/')
        })
        .catch(err => {
          failureToast(
            // @ts-ignore
            this.$buefy,
            getDesc(TOAST_TYPE.RESET_PASSWD).failure,
            err.response.status
          )
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.passwd-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 24px 32px;
  background-color: white;

  .field {
    width: 100%;
  }

  button {
    width: 50%;
  }
}
</style>
