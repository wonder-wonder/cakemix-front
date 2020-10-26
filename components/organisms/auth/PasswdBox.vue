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
import { successToast, failureToast } from '@/scripts/tools/toast'

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
    successToast,
    failureToast,
    emailValidator(text: string): boolean {
      const reg: RegExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return reg.test(text)
    },
    request() {
      if (!this.emailValidator(this.email)) {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Request failed', 1)
        return
      }
      this.isLoading = true
      const model: AuthPassResetReqModel = {
        email: this.email,
      }
      new AuthApi(this.$store.getters['auth/config'])
        .postPassReset(model)
        .then(() => {
          this.successToast(
            // @ts-ignore
            this.$buefy,
            'Password reset requested, a varification url will be sent'
          )
          this.$router.push('/')
        })
        .catch(() => {
          // @ts-ignore
          this.failureToast(this.$buefy, 'Request failed', 2)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
})
</script>

<style lang="scss">
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
