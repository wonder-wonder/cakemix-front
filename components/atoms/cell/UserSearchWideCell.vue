<template>
  <div class="user-search-wide-cell-container">
    <div class="icon-box">
      <i v-if="!hasImage" class="fa" :class="isTeam ? 'fa-users' : 'fa-user'" />
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
  },
})
</script>

<style lang="scss">
.user-search-wide-cell-container {
  display: flex;
  flex-flow: row wrap;

  .icon-box {
    height: 20px;
    width: 20px;
    margin-right: 16px;
    color: black;

    img {
      border-radius: 4px;
    }
  }
}
</style>
