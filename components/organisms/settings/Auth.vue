<template>
  <div class="setting-auth-container">
    <div class="auth-item-box">
      <BorderTitle :title="'Authentication'" />
      <Input
        class="maximum-width"
        :label-name="'Current Password'"
        :is-password="true"
        @text="oldPassword = $event"
      />
      <ValidateInput
        class="maximum-width"
        :label-name="'New Password'"
        :is-password="true"
        :message="['OK', 'Needs 8 or more characters']"
        :is-valid="passwordValidator(newPassword)"
        @text="newPassword = $event"
      />
      <b-button
        class="update-button is-success"
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
import { TOAST_TYPE, getToastDesc } from '@/scripts/model/toast'
import { passwordValidator } from '@/scripts/utils/validator'
import { getTitle, PAGES } from '@/scripts/model/head/index'

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
  head: {
    title: getTitle(PAGES.AUTH),
  },
  methods: {
    passwordValidator,
    request() {
      if (!(this.oldPassword !== '' && passwordValidator(this.newPassword))) {
        failureToast(
          // @ts-ignore
          this.$buefy,
          getToastDesc(TOAST_TYPE.CHANGE_PASSWD).failure,
          1
        )
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
          successToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.CHANGE_PASSWD).success
          )
        })
        .catch(err => {
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.CHANGE_PASSWD).failure,
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

<style lang="scss">
.setting-auth-container .auth-item-box .label {
  color: white;
}
</style>

<style lang="scss" scoped>
.setting-auth-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  max-width: 798px;
  padding: 0px 16px;
  font-weight: bold;

  .auth-item-box {
    width: 100%;

    .maximum-width {
      max-width: 375px;
    }
    .border-title {
      width: 100%;
      margin: 16px 0;
    }

    .update-button {
      width: 144px;
      margin-top: 16px;
      font-weight: bold;
    }
  }
}
</style>
