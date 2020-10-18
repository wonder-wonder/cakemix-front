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
  </div>
</template>

<script lang="ts">
import { AuthLoginReqModel, AuthApi } from '@/scripts/api/index'

import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'

export type DataType = {
  username: string
  password: string
  isLoading: boolean
  isError: boolean
  authApi: AuthApi
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
      authApi: new AuthApi(),
    }
  },
  methods: {
    request() {
      this.isLoading = !this.isLoading
      const model: AuthLoginReqModel = {
        id: this.username,
        pass: this.password,
      }
      this.authApi
        .postLogin(model)
        .then(res => {
          this.$store.commit('auth/login', res.data.jwt)
          this.$router.push('/folder/fwk6al7nyj4qdufaz')
        })
        .catch(() => {
          this.isError = true
          this.failureToast()
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    failureToast() {
      // @ts-ignore
      this.$buefy.toast.open({
        duration: 2000,
        message: 'Login Failed, Please check login information.',
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
}
</style>
