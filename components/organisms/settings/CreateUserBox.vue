<template>
  <div class="create-team-box">
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
        type="is-danger is-light"
        @click="$emit('close')"
        v-text="'Cancel'"
      />
      <b-button
        type="is-success"
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
          const DOMAIN =
            process.env.NODE_ENV === 'development'
              ? process.env.DOMAIN
              : location.host
          this.generatedLink = `${process.env.HTTP_SCHEME}://${DOMAIN}/auth/signup/${res.data.token}`
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
.create-team-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 16px;
  background-color: whitesmoke;
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
    color: black;
  }
  label {
    color: black;
  }
  .button-container {
    display: flex;
    flex-flow: row wrap;

    button {
      width: 120px;
      margin: 4px;
    }
  }
}
</style>
