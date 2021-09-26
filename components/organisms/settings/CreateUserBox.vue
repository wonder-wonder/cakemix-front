<template>
  <div class="create-user-box">
    <Input
      class="field-input"
      :label-name="'Invitation Link'"
      :is-password="false"
      :value="generatedLink"
      :autofocus="true"
      :is-read-only="true"
      @text="name = $event"
    />
    <div class="button-container">
      <b-button
        class="cancel-button"
        @click="$emit('close')"
        v-text="'Cancel'"
      />
      <b-button
        class="submit-button"
        :native-type="'submit'"
        @click="regenerate"
        v-text="'New link'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/atoms/input/Input.vue'
import { WEB_BASE_URL } from '@/scripts/api/base'
import { AuthApi, checkAuthWithStatus } from '@/scripts/api/index'
import { failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getToastDesc } from '@/scripts/model/toast'

type DataType = {
  name: string
  generatedLink: string
}

export default Vue.extend({
  components: {
    Input,
  },
  data(): DataType {
    return {
      name: '',
      generatedLink: '',
    }
  },
  created() {
    this.generateLink()
  },
  methods: {
    regenerate() {
      this.generateLink()
    },
    generateLink() {
      new AuthApi(this.$store.getters['auth/config'])
        .getNewTokenRegist()
        .then(res => {
          this.generatedLink = `${WEB_BASE_URL}/auth/signup/${res.data.token}`
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.GENERATE_NEW_LINK).failure,
            err.response.status
          )
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.create-user-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 16px;
  background-color: $sub-main-color;
  border: solid 1px white;
  border-radius: 16px;
  height: auto;
  width: 400px;
  max-width: 100vw;

  .field-input {
    width: 100%;
    max-width: 400px;
  }
  .icon {
    height: 80px;
    font-size: 80px;
  }
  .button-container {
    display: flex;
    flex-flow: row wrap;

    .cancel-button {
      width: 120px;
      margin: 4px;
      font-weight: bold;
      color: white;
      background-color: $danger-color;
    }

    .submit-button {
      width: 120px;
      margin: 4px;
      font-weight: bold;
      color: white;
      background-color: $accent-color;
    }
  }
}
</style>
