<template>
  <div class="user-cell-container">
    <div class="icon-box">
      <i v-if="!hasImage" class="fa" :class="isTeam ? 'fa-users' : 'fa-user'" />
      <b-image v-if="hasImage" :src="user.icon_uri" :rounded="rounded" />
    </div>
    <div class="username-box">
      <span v-text="user.name" />
    </div>
    <div class="joinedat-box">
      <span v-text="toDate(user.created_at)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ProfileModel } from '@/scripts/api/index'
import { toDate } from '@/scripts/utils/date'

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
  },
  methods: {
    toDate,
  },
})
</script>

<style lang="scss">
.user-cell-container {
  display: grid;
  min-width: 250px;
  grid-template-rows: 40px 24px;
  grid-template-columns: 64px 16px 160px;
  border: solid 1px white;
  padding: 4px;
  border-radius: 5px;
  color: white;
  background-color: black;
  transition: all 100ms;

  &:hover {
    background-color: rgb(100, 100, 100);
  }

  .icon-box {
    grid-row: 1 / 3;
    grid-column: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;

    img {
      border-radius: 4px;
    }
  }

  .username-box {
    display: flex;
    align-items: center;
    grid-row: 1;
    grid-column: 3;
    font-size: 16px;
    font-weight: bold;
  }

  .joinedat-box {
    display: flex;
    align-items: center;
    grid-row: 2;
    grid-column: 3;
    font-size: 12px;
  }
}
</style>
