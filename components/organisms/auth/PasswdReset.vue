<template>
  <div class="passwd-reset-box">
    <ValidateInput
      :label-name="'New Password'"
      :message="['OK', 'Needs 8 or more characters']"
      :is-password="true"
      :is-valid="passwordValidator(password)"
      @text="password = $event"
    />
    <b-button :loading="isLoading" @click="request" v-text="'Reset'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ValidateInput from '@/components/atoms/input/ValidateInput.vue'
import {
  AuthPassChangeReqModel,
  AuthApi,
  checkAuthWithStatus,
} from '@/scripts/api/index'
import { successToast, failureToast } from '@/scripts/utils/toast'
import { passwordValidator } from '@/scripts/utils/validator'

export type DataType = {
  password: string
  passwordConfirm: string
  isLoading: boolean
}

export default Vue.extend({
  components: {
    ValidateInput,
  },
  data(): DataType {
    return {
      password: '',
      passwordConfirm: '',
      isLoading: false,
    }
  },
  computed: {
    passwdResetToken() {
      return this.$route.params.id
    },
  },
  methods: {
    checkAuthWithStatus,
    successToast,
    failureToast,
    passwordValidator,
    request() {
      if (!this.passwordValidator(this.password)) {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Signup failed', 1)
        return
      }
      this.isLoading = true
      const model: AuthPassChangeReqModel = {
        newpass: this.password,
      }
      new AuthApi(this.$store.getters['auth/config'])
        .postPassResetVerify(this.passwdResetToken, model)
        .then(() => {
          this.successToast(
            // @ts-ignore
            this.$buefy,
            'Signup requested, a varification url will be sent'
          )
          this.$router.push('/auth/login')
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'Signup failed', err.response.status)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
})
</script>

<style lang="scss">
.passwd-reset-box {
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
