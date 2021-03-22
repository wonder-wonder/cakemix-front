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
  checkAuthWithStatus,
  AuthPassChangeReqModel,
  AuthApi,
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
    passwordValidator,
    request() {
      if (!passwordValidator(this.password)) {
        // @ts-ignore
        failureToast(this.$buefy, 'Signup failed', 1)
        return
      }
      this.isLoading = true
      const model: AuthPassChangeReqModel = {
        newpass: this.password,
      }
      new AuthApi(this.$store.getters['auth/config'])
        .postPassResetVerify(this.passwdResetToken, model)
        .then(() => {
          successToast(
            // @ts-ignore
            this.$buefy,
            'Signup requested, a varification url will be sent'
          )
          this.$router.push('/auth/login')
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          failureToast(this.$buefy, 'Signup failed', err.response.status)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
})
</script>

<style lang="scss" scoped>
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
