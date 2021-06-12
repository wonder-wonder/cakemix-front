<template>
  <div class="user-min-cell-container">
    <div class="icon-box">
      <fa-icon v-if="!hasImage" :icon="isTeam ? 'users' : 'user'" />
      <b-image v-if="hasImage" :src="user.icon_uri" :rounded="rounded" />
    </div>
    <div class="username-box">
      <fa-icon v-if="isLock" class="lock-icon" icon="lock" />
      <span v-text="user.name" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ProfileModel } from '@/scripts/api/index'

export default Vue.extend({
  props: {
    user: {
      type: Object as PropType<ProfileModel>,
      default: {} as ProfileModel,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasImage(): boolean {
      return !(this.user.icon_uri === undefined || this.user.icon_uri === '')
    },
    isTeam(): boolean {
      return this.user.is_team
    },
    isLock(): boolean {
      return this.user.is_lock === true
    },
  },
})
</script>

<style lang="scss">
.user-min-cell-container .icon-box img {
  border-radius: 4px;
}
</style>

<style lang="scss" scoped>
.user-min-cell-container {
  display: flex;
  flex-flow: column nowrap;
  height: 140px;
  width: 100px;
  padding: 4px;
  border-radius: 5px;
  color: black;

  .icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 92px;
    width: 92px;
    font-size: 40px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.1);

    img {
      border-radius: 4px;
    }
  }

  .username-box {
    height: 40px;
    font-size: 13px;
    font-weight: bold;
    overflow: scroll;

    .lock-icon {
      height: 13px;
      width: 13px;
      padding: 2px;
      background-color: whitesmoke;
      border-radius: 6.5px;
    }

    span {
      word-wrap: break-word;
    }
  }
}
</style>
