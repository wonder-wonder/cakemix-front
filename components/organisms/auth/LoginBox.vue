<template>
  <div class="login-box">
    <Input
      :label-name="'UserName'"
      :is-error="isError"
      @text="username = $event"
    />
    <Input
      :label-name="'Password'"
      :is-password="true"
      :is-error="isError"
      @text="password = $event"
    />
    <b-button :loading="isLoading" @click="request" v-text="'Login'" />
    <a class="option" @click="forgotPassword" v-text="'Forgot Password'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'
import { AuthLoginReqModel, AuthApi } from '@/scripts/api/index'

export type DataType = {
  username: string
  password: string
  isLoading: boolean
  isError: boolean
}

export default Vue.extend({
  components: {
    Input,
  },
  data(): DataType {
    return {
      username: '',
      password: '',
      isLoading: false,
      isError: false,
    }
  },
  methods: {
    forgotPassword() {
      this.$router.push('/auth/passwd')
    },
    request() {
      if (this.username === '' || this.password === '') {
        this.isError = true
        this.failureToast(1)
        return
      }
      this.isLoading = true
      const model: AuthLoginReqModel = {
        id: this.username,
        pass: this.password,
      }
      new AuthApi(this.$store.getters['auth/config'])
        .postLogin(model)
        .then(res => {
          this.$store.commit('auth/login', res.data.jwt)
          this.$router.push('/folder/')
        })
        .catch(() => {
          this.isError = true
          this.failureToast(2)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    failureToast(err: Number) {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 3000,
        message: `Login Failed [ Error : ${err} ]`,
        position: 'is-bottom',
        type: 'is-danger',
      })
    },
  },
})
</script>

<style lang="scss">
.login-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 24px 32px;
  background-color: white;

  .field {
    width: 100%;
  }

  button {
    margin-top: 16px;
    width: 50%;
  }

  .option {
    margin-top: 4px;
    font-size: 12px;
  }
}
</style>
