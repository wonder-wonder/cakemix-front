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
    <b-button
      :loading="isLoading"
      :native-type="'submit'"
      class="login-button"
      v-text="'Login'"
    />
    <a class="option" @click="forgotPassword" v-text="'Forgot Password'" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'
import { AuthLoginReqModel, AuthApi } from '@/scripts/api/index'
import { failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getToastDesc } from '@/scripts/model/toast'

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
        // @ts-ignore
        failureToast(this.$buefy, getToastDesc(TOAST_TYPE.LOGIN).failure, 1)
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
        .catch(err => {
          this.isError = true
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.LOGIN).failure,
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
.login-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 24px 32px;
  background-color: $sub-main-color;

  .field {
    width: 100%;
  }

  .login-button {
    margin-top: 16px;
    width: 50%;
    color: $font-color;
    background-color: $sub-main-color;
  }

  .option {
    margin-top: 4px;
    font-size: 12px;
    color: $font-color;
  }
}
</style>
