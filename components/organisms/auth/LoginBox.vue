<template>
  <form class="login-box" @submit.prevent="request">
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
    <b-button :loading="isLoading" :native-type="'submit'" v-text="'Login'" />
    <a class="option" @click="forgotPassword" v-text="'Forgot Password'" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'
import { AuthLoginReqModel, AuthApi } from '@/scripts/api/index'
import { successToast, failureToast } from '@/scripts/tools/toast'

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
    successToast,
    failureToast,
    forgotPassword() {
      this.$router.push('/auth/passwd')
    },
    request() {
      if (this.username === '' || this.password === '') {
        this.isError = true
        // @ts-ignore
        this.failureToast(this.$buefy, 'Login failed', 1)
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
          const re = this.$route.query.redirect
          if (typeof re === 'string') {
            this.$router.push(re)
            return
          }
          this.$router.push('/folder/')
        })
        .catch(() => {
          this.isError = true
          // @ts-ignore
          this.failureToast(this.$buefy, 'Login failed', 2)
        })
        .finally(() => {
          this.isLoading = false
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
