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
import { AuthPassChangeReqModel, AuthApi } from '@/scripts/api/index'

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
    passwordValidator(text: string): boolean {
      const reg: RegExp = /^(?=.*?[a-z])(?=.*?\d)(?=.*?[!-\/:-@[-`{-~])[!-~]{8,100}$/i
      return reg.test(text)
    },
    request() {
      if (!this.passwordValidator(this.password)) {
        this.failureToast(1)
        return
      }
      this.isLoading = !this.isLoading
      const model: AuthPassChangeReqModel = {
        newpass: this.password,
      }
      new AuthApi(this.$store.getters['auth/config'])
        .postPassResetVerify(this.passwdResetToken, model)
        .then(() => {
          this.successToast()
          this.$router.push('/auth/login')
        })
        .catch(() => {
          this.failureToast(2)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    successToast() {
      // @ts-ignore
      this.$buefy.toast.open({
        message: 'Signup requested, a varification url will be sent',
        type: 'is-success',
      })
    },
    failureToast(err: Number) {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 2000,
        message: `Signup Failed [ Error : ${err} ]`,
        position: 'is-bottom',
        type: 'is-danger',
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
