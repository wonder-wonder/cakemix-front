<template>
  <div class="profile-container">
    <BorderTitle :title="'Auth'" />
    <div class="profile-item-box">
      <Input
        :label-name="'Current Password'"
        :is-password="true"
        @text="oldPassword = $event"
      />
      <ValidateInput
        :label-name="'Confirm'"
        :is-password="true"
        :is-valid="isMatchConfirm(cOldPassword)"
        :message="['OK', 'password does not match']"
        @text="cOldPassword = $event"
      />
      <ValidateInput
        :label-name="'New Password'"
        :is-password="true"
        :message="['OK', 'Invalid password']"
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

export default Vue.extend({
  components: {
    BorderTitle,
    Input,
    ValidateInput,
  },
  data() {
    return {
      oldPassword: '',
      cOldPassword: '',
      newPassword: '',
      isLoading: false,
    }
  },
  methods: {
    request() {
      console.log('UPDATE INFO')
    },
    isMatchConfirm(cPassword: string): boolean {
      return this.oldPassword !== '' && this.oldPassword === cPassword
    },
    passwordValidator(text: string): boolean {
      const reg: RegExp = /^(?=.*?[a-z])(?=.*?\d)(?=.*?[!-\/:-@[-`{-~])[!-~]{8,100}$/i
      return reg.test(text)
    },
  },
})
</script>

<style lang="scss">
.profile-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  padding: 0px 32px;
  color: white;
  background-color: rgb(32, 32, 32);
  font-size: 14px;
  font-weight: bold;

  .border-title {
    width: 100%;
  }

  .profile-item-box {
    width: 60%;

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
