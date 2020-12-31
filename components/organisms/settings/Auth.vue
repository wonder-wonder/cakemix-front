<template>
  <div class="setting-auth-container">
    <div class="auth-item-box">
      <BorderTitle :title="'Change Password'" />
      <Input
        :label-name="'Current Password'"
        :is-password="true"
        @text="oldPassword = $event"
      />
      <ValidateInput
        :label-name="'New Password'"
        :is-password="true"
        :message="['OK', 'Needs 8 or more characters']"
        :is-valid="passwordValidator(newPassword)"
        @text="newPassword = $event"
      />
      <b-button
        class="update-button is-primary"
        :loading="isLoading"
        @click="request"
        v-text="'Change'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BorderTitle from '@/components/atoms/title/BorderTitle.vue'
import Input from '@/components/atoms/input/Input.vue'
import ValidateInput from '@/components/atoms/input/ValidateInput.vue'
import { AuthPassChangeReqModel, AuthApi } from '@/scripts/api/index'
import { successToast, failureToast } from '@/scripts/utils/toast'
import { passwordValidator } from '@/scripts/utils/validator'

export default Vue.extend({
  components: {
    BorderTitle,
    Input,
    ValidateInput,
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      isLoading: false,
    }
  },
  methods: {
    successToast,
    failureToast,
    passwordValidator,
    request() {
      if (
        !(this.oldPassword !== '' && this.passwordValidator(this.newPassword))
      ) {
        // @ts-ignore
        this.failureToast(this.$buefy, 'Request failed', 1)
        return
      }
      this.isLoading = true
      const model: AuthPassChangeReqModel = {
        oldpass: this.oldPassword,
        newpass: this.newPassword,
      }
      new AuthApi(this.$store.getters['auth/config'])
        .postPassChange(model)
        .then(() => {
          // @ts-ignore
          this.successToast(this.$buefy, 'Password changed')
        })
        .catch(err => {
          // @ts-ignore
          this.failureToast(this.$buefy, 'Request failed', err.response.status)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
})
</script>

<style lang="scss">
.setting-auth-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  height: 40px;
  padding: 0px 32px;
  color: white;
  background-color: rgb(32, 32, 32);
  font-size: 14px;
  font-weight: bold;

  .border-title {
    width: 100%;
    margin-bottom: 20px;
  }

  .auth-item-box {
    max-width: 500px;
    width: 100%;

    .label {
      color: white;
    }

    .update-button {
      width: 120px;
      margin-top: 16px;
      font-weight: bold;
    }
  }
}
</style>
