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
    <b-button
      :loading="isLoading"
      class="signup-button"
      @click="request"
      v-text="'Sign up'"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ValidateInput from '@/components/atoms/input/ValidateInput.vue'
import { AuthRegistReqModel, AuthApi } from '@/scripts/api/index'
import { successToast, failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getToastDesc } from '@/scripts/model/toast'
import { emailValidator, passwordValidator } from '@/scripts/utils/validator'

export type DataType = {
  email: string
  userName: string
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
      userName: '',
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
    emailValidator,
    passwordValidator,
    updateUserName(userName: string) {
      this.userName = userName
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
        this.userName === '' ||
        this.email === '' ||
        this.password === '' ||
        this.signupToken === ''
      ) {
        // @ts-ignore
        failureToast(this.$buefy, getToastDesc(TOAST_TYPE.SIGNUP).failure, 1)
        return
      }
      this.isLoading = true
      const model: AuthRegistReqModel = {
        email: this.email,
        username: this.userName,
        password: this.password,
      }
      new AuthApi(this.$store.getters['auth/config'])
        .postRegist(this.signupToken, model)
        .then(() => {
          successToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.SIGNUP).success
          )
          this.$router.push('/auth/login')
        })
        .catch(err => {
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.SIGNUP).failure,
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
.signup-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 24px 32px;
  background-color: $sub-main-color;

  .field {
    width: 100%;
  }

  .signup-button {
    width: 50%;
    color: $font-color;
    background-color: $sub-main-color;
  }
}
</style>
