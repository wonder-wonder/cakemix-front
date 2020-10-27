<template>
  <div class="user-cell-container">
    <div class="icon-box">
      <img :src="user.icon" :alt="'user_icon'">
    </div>
    <div class="username-box">
      <span v-text="user.userName" />
    </div>
    <div class="joinedat-box">
      <span v-text="user.joinedAt" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export type UserModel = {
  icon: String
  userName: String
  joinedAt: String
}

export default Vue.extend({
  props: {
    user: {
      type: Object as PropType<UserModel>,
      default: {} as UserModel,
    },
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
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 3;
    grid-column: 1;
    font-size: 20px;

    img {
      height: 100%;
      width: 100%;
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
