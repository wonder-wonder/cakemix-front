<template>
  <div class="login-box">
    <Input :label-name="'UserName'" @text="username = $event" />
    <Input
      :label-name="'Password'"
      :is-password="true"
      @text="password = $event"
    />
    <b-button :loading="isLoading" @click="request" v-text="'Login'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'

export type DataType = {
  username: string
  password: string
  isLoading: boolean
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
    }
  },
  methods: {
    request() {
      this.isLoading = !this.isLoading
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
