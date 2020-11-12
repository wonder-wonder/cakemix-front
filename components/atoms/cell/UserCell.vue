<template>
  <div class="user-cell-container">
    <div class="icon-box">
      <i v-if="!hasImage" class="fa fa-user" />
      <b-image v-if="hasImage" :src="user.icon_uri" :rounded="rounded">
        <b-skeleton slot="placeholder" class="skeleton-placeholder" />
      </b-image>
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
import { toDate } from '@/scripts/tools/date'

export default Vue.extend({
  props: {
    user: {
      type: Object as PropType<ProfileModel>,
      default: {} as ProfileModel,
    },
  },
  computed: {
    hasImage() {
      return !(this.user.icon_uri === undefined || this.user.icon_uri === '')
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
  width: 240px;
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

    .b-skeleton,
    .b-skeleton-item {
      width: 64px;
      height: 64px;
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
