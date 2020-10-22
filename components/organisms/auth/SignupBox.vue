<template>
  <div class="signup-box">
    <ValidateInput
      :label-name="'UserName'"
      :message="['OK', 'Invalid charactor or already used']"
      :is-valid="isUnique"
      @text="updateUserName"
    />
    <ValidateInput
      :label-name="'Email'"
      :message="['OK', 'Invalid email']"
      :is-valid="emailValidator(email)"
      @text="email = $event"
    />
    <ValidateInput
      :label-name="'Password'"
      :message="['OK', 'Needs 8 or more characters']"
      :is-password="true"
      :is-valid="passwordValidator(password)"
      @text="password = $event"
    />
    <b-button :loading="isLoading" @click="request" v-text="'Sign up'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ValidateInput from '@/components/atoms/input/ValidateInput.vue'
import { AuthRegistReqModel, AuthApi } from '@/scripts/api/index'

export type DataType = {
  email: string
  username: string
  isUnique: boolean
  password: string
  isLoading: boolean
}

export default Vue.extend({
  components: {
    ValidateInput,
  },
  data(): DataType {
    return {
      email: '',
      username: '',
      isUnique: false,
      password: '',
      isLoading: false,
    }
  },
  computed: {
    signupToken() {
      return this.$route.params.id
    },
  },
  methods: {
    updateUserName(userName: string) {
      this.username = userName
      new AuthApi()
        .getAuthCheckUserUsername(this.signupToken, userName)
        .then(() => {
          this.isUnique = true
        })
        .catch(() => {
          this.isUnique = false
        })
    },
    emailValidator(text: string): boolean {
      const reg: RegExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return reg.test(text)
    },
    passwordValidator(text: string): boolean {
      const reg: RegExp = /^(?=.*?[a-z])(?=.*?\d)(?=.*?[!-\/:-@[-`{-~])[!-~]{8,100}$/i
      return reg.test(text)
    },
    request() {
      if (
        this.username === '' ||
        this.email === '' ||
        this.password === '' ||
        this.signupToken === ''
      ) {
        this.failureToast(1)
        return
      }
      this.isLoading = true
      const model: AuthRegistReqModel = {
        email: this.email,
        username: this.username,
        password: this.password,
      }
      new AuthApi(this.$store.getters['auth/config'])
        .postRegist(this.signupToken, model)
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
        duration: 3000,
        message: 'Signup requested, a varification url will be sent',
        type: 'is-success',
      })
    },
    failureToast(err: Number) {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: `Signup Failed [ Error : ${err} ]`,
        position: 'is-bottom',
        type: 'is-danger',
      })
    },
  },
})
</script>

<style lang="scss">
.signup-box {
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