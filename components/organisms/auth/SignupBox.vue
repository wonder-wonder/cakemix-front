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
      :message="['OK', 'Invalid email address']"
      :is-valid="emailValidator(email)"
      @text="email = $event"
    />
    <ValidateInput
      :label-name="'Password'"
      :message="['OK', 'Needs 8 or more characters includes number']"
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
import { successToast, failureToast } from '@/scripts/utils/toast'
import { emailValidator, passwordValidator } from '@/scripts/utils/validator'

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
    successToast,
    failureToast,
    emailValidator,
    passwordValidator,
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
    request() {
      if (
        this.username === '' ||
        this.email === '' ||
        this.password === '' ||
        this.signupToken === ''
      ) {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Signup Failed', 1)
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
          this.successToast(
            // @ts-ignore
            this.$buefy,
            'Signup requested, a varification url will be sent'
          )
          this.$router.push('/auth/login')
        })
        .catch(err => {
          // @ts-ignore
          this.failureToast(this.$buefy, 'Signup Failed', err.response.status)
        })
        .finally(() => {
          this.isLoading = false
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
