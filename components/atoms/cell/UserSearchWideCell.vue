<template>
  <div class="user-search-wide-cell-container">
    <div class="icon-box">
      <fa-icon v-if="isLock" class="lock-icon" icon="lock" />
      <fa-icon v-if="!hasImage" :icon="isTeam ? 'users' : 'user'" />
      <b-image v-if="hasImage" :src="imageUri" />
    </div>
    <div class="name">
      {{ name }}
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
  },
  computed: {
    isTeam(): boolean {
      return this.user.is_team
    },
    hasImage(): boolean {
      return !(this.user.icon_uri === undefined || this.user.icon_uri === '')
    },
    imageUri(): string {
      return this.user.icon_uri
    },
    name(): string {
      return this.user.name
    },
    isLock(): boolean {
      return this.user.is_lock === true
    },
  },
})
</script>
<style lang="scss">
.user-search-wide-cell-container .icon-box img {
  border-radius: 4px;
}
</style>
<style lang="scss" scoped>
.user-search-wide-cell-container {
  display: flex;
  flex-flow: row wrap;

  .icon-box {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: center;
    height: 20px;
    width: 20px;
    margin-right: 16px;
    color: black;
    border-radius: 2px;

    .lock-icon {
      position: absolute;
      top: -6px;
      right: -6px;
      height: 12px;
      width: 12px;
      padding: 2px;
      background-color: whitesmoke;
      border-radius: 6px;
    }
  }
}
</style>
