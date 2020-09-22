<template>
  <div class="profile-container">
    <BorderTitle :title="title" />
    <div class="profile-item-box">
      <SquareIcon
        class="icon"
        :label-name="'Icon'"
        :current="'https://picsum.photos/256/256'"
      />
      <Input :label-name="'UserName'" />
      <Select
        :label-name="'Language'"
        :select-items="selectItems"
        :placeholder="'Select a language'"
        @input="current = $event"
      />
      <TextArea :label-name="'Biography'" />
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
import BorderTitle from '@/components/atoms/title/BorderTitle.vue'
import SquareIcon from '@/components/molecules/image/UploadableImage.vue'
import Input from '@/components/atoms/input/Input.vue'
import TextArea from '@/components/atoms/input/TextArea.vue'
import Select from '@/components/atoms/input/Select.vue'

export default Vue.extend({
  components: {
    BorderTitle,
    SquareIcon,
    Input,
    TextArea,
    Select,
  },
  props: {
    title: {
      type: String,
      default: 'Profile',
    },
  },
  data() {
    return {
      current: '',
      selectItems: ['English', 'Japanese'],
      isLoading: false,
    }
  },
  methods: {
    request() {
      console.log('UPDATE INFO')
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
