<template>
  <div class="setting-profile-container">
    <div class="profile-item-box">
      <BorderTitle :title="'Profile'" />
      <SquareIcon :label-name="'Icon'" :src="icon" @upload="uploadImage" />
      <ValidateInput
        class="maximum-width"
        :label-name="'UserName'"
        :message="['OK', 'Invalid charactor or already used']"
        :is-valid="isUnique"
        :value="userName"
        :disabled="true"
        @text="updateUserName"
      />
      <Select
        class="maximum-width"
        :label-name="'Language'"
        :select-items="languageList"
        :placeholder="'Select a language'"
        :current="languageFullName"
        @input="current = getAbbreviation($event)"
      />
      <Select
        class="maximum-width"
        :label-name="'Theme'"
        :select-items="themeList"
        :placeholder="'Select a theme'"
        :current="currentTheme"
        @input="updateTheme($event)"
      />
      <TextArea :label-name="'Biography'" :value="bio" @text="bio = $event" />
      <b-button
        class="update-button"
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
import ValidateInput from '@/components/atoms/input/ValidateInput.vue'
import TextArea from '@/components/atoms/input/TextArea.vue'
import Select from '@/components/atoms/input/Select.vue'
import { successToast, failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getToastDesc } from '@/scripts/model/toast'
import { setTheme, THEMELIST } from '@/scripts/colors'
import {
  getLanguageList,
  getFullName,
  getAbbreviation,
} from '@/scripts/model/language/language'
import { API_BASE_URL } from '@/scripts/api/base'
import {
  SearchApi,
  ProfileApi,
  ImageApi,
  ProfileModel,
} from '@/scripts/api/index'
import { getTitle, PAGES } from '@/scripts/model/head/index'

type DataType = {
  current: string
  icon: string
  userName: string
  bio: string
  isLoading: boolean
  isUnique: boolean
}

export default Vue.extend({
  components: {
    BorderTitle,
    SquareIcon,
    ValidateInput,
    TextArea,
    Select,
  },
  data(): DataType {
    return {
      current: '',
      icon: require('@/assets/noimage.png'),
      userName: '',
      bio: '',
      isLoading: false,
      isUnique: false,
    }
  },
  head: {
    title: getTitle(PAGES.PROFILE),
  },
  computed: {
    languageFullName(): string {
      return getFullName(this.current)
    },
    languageList(): string[] {
      return getLanguageList()
    },
    themeList(): string[] {
      return THEMELIST
    },
    currentTheme(): string {
      const theme = this.$store.getters['device/theme']
      return THEMELIST[theme]
    },
  },
  created() {
    new ProfileApi(this.$store.getters['auth/config'])
      .getUserProfileUuid(this.$store.getters['auth/uuid'])
      .then(res => {
        this.userName = res.data.name
        this.current = res.data.lang ?? ''
        this.bio = res.data.bio ?? ''
        if (res.data.icon_uri) {
          this.icon = res.data.icon_uri
        }
      })
  },
  methods: {
    getLanguageList,
    getFullName,
    getAbbreviation,
    setTheme,
    updateTheme(theme: string) {
      const themeNum = THEMELIST.indexOf(theme) ?? -1
      this.$store.commit('device/theme', themeNum)
      if (themeNum !== -1) {
        this.setTheme(theme.toLowerCase())
      }
    },
    request() {
      const profile = {
        uuid: this.$store.getters['auth/uuid'],
        name: this.userName,
        bio: this.bio,
        icon_uri: this.icon,
        lang: this.current,
      } as ProfileModel
      this.isLoading = true
      new ProfileApi(this.$store.getters['auth/config'])
        .putUserProfileUuid(this.$store.getters['auth/uuid'], profile)
        .then(() => {
          successToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.UPDATE_PROFILE).success
          )
        })
        .catch(err => {
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.UPDATE_PROFILE).failure,
            err.response.status
          )
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    uploadImage(file: File) {
      new ImageApi(this.$store.getters['auth/config'])
        .postImage(file)
        .then(res => {
          this.icon = `${API_BASE_URL}/image/${res.data.id}`
        })
    },
    updateUserName(userName: string) {
      this.userName = userName
      new SearchApi(this.$store.getters['auth/config'])
        .getSearchUser(userName)
        .then(res => {
          const users = res.data.users ?? []
          this.isUnique = users.filter(u => u.name === userName).length === 0
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.setting-profile-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  max-width: 798px;
  padding: 0px 16px;
  margin-bottom: 32px;
  color: $font-color;
  background-color: $main-color;
  font-size: 14px;
  font-weight: bold;

  .border-title {
    width: 100%;
    margin: 16px 0;
  }

  .profile-item-box {
    width: 100%;

    .maximum-width {
      max-width: 375px;
    }
    .update-button {
      width: 144px;
      margin: 16px 0;
      font-weight: bold;
      color: white;
      background-color: $accent-color;
    }
  }

  .border-title {
    margin-bottom: 30px;
  }
}
</style>
