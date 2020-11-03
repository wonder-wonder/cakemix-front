<template>
  <div class="setting-teams-container">
    <BorderTitle :title="'Teams'" />
    <div class="teams-item-box">
      <UserCell
        v-for="(user, index) in users"
        :key="`user-cell-${uuid}-${index}`"
        class="user-cell"
        :user="user"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import BorderTitle from '@/components/atoms/title/BorderTitle.vue'
import UserCell from '@/components/atoms/cell/UserCell.vue'
import ButtonInput from '@/components/molecules/button/ButtonInput.vue'
import {
  TeamApi,
  SearchApi,
  checkAuthWithStatus,
  ProfileModel,
} from '@/scripts/api/index'
import { failureToast } from '@/scripts/tools/toast'

export type DataType = {
  uuid: String
  users: ProfileModel[]
  generatedLink: String
}

export default Vue.extend({
  components: {
    BorderTitle,
    UserCell,
  },
  data(): DataType {
    return {
      uuid: uuidv4(),
      users: [],
      generatedLink: '',
    }
  },
  methods: {
    failureToast,
    checkAuthWithStatus,
    getTeams() {
      // new TeamApi(this.$store.getters['auth/config']).
    },
  },
})
</script>

<style lang="scss">
.setting-teams-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  height: 40px;
  padding: 0px 32px;
  color: white;
  background-color: rgb(32, 32, 32);
  font-size: 14px;
  font-weight: bold;

  .label {
    color: white;
  }

  .border-title {
    width: 100%;
    margin: 20px 0;
  }

  .teams-item-box {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: 100%;

    .user-cell {
      margin: 16px 16px 0 0;
    }

    .update-button {
      width: 120px;
      margin-top: 16px;
      font-weight: bold;
    }
  }
}
</style>
