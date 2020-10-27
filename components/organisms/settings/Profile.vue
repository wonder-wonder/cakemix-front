<template>
  <div class="setting-profile-container">
    <div class="profile-item-box">
      <SquareIcon class="icon" :label-name="'Icon'" :src="src" />
      <ValidateInput
        :label-name="'UserName'"
        :message="['OK', 'Invalid charactor or already used']"
        :is-valid="usernameValidator(userName)"
        :value="userName"
        @text="userName = $event"
      />
      <Select
        :label-name="'Language'"
        :select-items="selectItems"
        :placeholder="'Select a language'"
        :current="current"
        @input="current = $event"
      />
      <TextArea :label-name="'Biography'" :value="bio" />
      <b-button
        class="update-button is-primary"
        :loading="isLoading"
        @click="request"
        v-text="'Update'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SquareIcon from '@/components/molecules/image/UploadableImage.vue'
import ValidateInput from '@/components/atoms/input/ValidateInput.vue'
import TextArea from '@/components/atoms/input/TextArea.vue'
import Select from '@/components/atoms/input/Select.vue'
import { checkAuthWithStatus } from '@/scripts/api/index'

export default Vue.extend({
  components: {
    SquareIcon,
    ValidateInput,
    TextArea,
    Select,
  },
  data() {
    return {
      current: 'English',
      selectItems: ['English', 'Japanese'],
      src: 'https://picsum.photos/256/256',
      userName: 'abcdefg',
      bio: 'Hello!!\nThis is test biography.',
      isLoading: false,
    }
  },
  methods: {
    checkAuthWithStatus,
    request() {
      console.log('UPDATE INFO', this.current)
    },
    usernameValidator(text: string): boolean {
      return text === 'abcdefg'
    },
  },
})
</script>

<style lang="scss">
.setting-profile-container {
  display: flex;
  flex-flow: row wrap;
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
    min-width: 300px;
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

  .border-title {
    margin-bottom: 30px;
  }
}
</style>
