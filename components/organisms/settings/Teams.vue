<template>
  <div class="setting-teams-container">
    <TeamTools @create-team="isCreateViewEnable = true" />
    <BorderTitle :title="'Teams'" />
    <div class="teams-item-box">
      <UserCell
        v-for="(user, index) in users"
        :key="`user-cell-${uuid}-${index}`"
        class="user-cell"
        :user="user"
      />
    </div>
    <b-modal v-model="isCreateViewEnable" trap-focus>
      <CreateBox @create="createTeam" @close="isCreateViewEnable = false" />
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import BorderTitle from '@/components/atoms/title/BorderTitle.vue'
import TeamTools from '@/components/molecules/settings/TeamTools.vue'
import UserCell from '@/components/atoms/cell/UserCell.vue'
import ButtonInput from '@/components/molecules/button/ButtonInput.vue'
import CreateBox from '@/components/organisms/settings/CreateBox.vue'
import {
  TeamApi,
  SearchApi,
  checkAuthWithStatus,
  ProfileModel,
} from '@/scripts/api/index'
import { failureToast, successToast } from '@/scripts/tools/toast'

type DataType = {
  uuid: String
  users: ProfileModel[]
  generatedLink: String
  isCreateViewEnable: boolean
}

export default Vue.extend({
  components: {
    BorderTitle,
    TeamTools,
    UserCell,
    CreateBox,
  },
  data(): DataType {
    return {
      uuid: uuidv4(),
      users: [],
      generatedLink: '',
      isCreateViewEnable: false,
    }
  },
  methods: {
    failureToast,
    successToast,
    checkAuthWithStatus,
    getTeams() {
      // new TeamApi(this.$store.getters['auth/config']).
    },
    createTeam(name: string) {
      new TeamApi(this.$store.getters['auth/config'])
        .postTeam(name)
        .then(() => {
          // @ts-ignore
          this.successToast(this.$buefy, 'Success to create new team')
        })
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
  .modal .modal-content {
    width: auto;
  }
}
</style>
