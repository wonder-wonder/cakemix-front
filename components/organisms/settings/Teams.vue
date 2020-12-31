<template>
  <div class="setting-teams-container">
    <TeamTools @create-team="isCreateViewEnable = true" />
    <div class="teams-item-container">
      <BorderTitle :title="'Teams'" />
      <div class="teams-item-box">
        <UserCell
          v-for="(user, index) in users"
          :key="`user-cell-${uuid}-${index}`"
          class="user-cell"
          :user="user"
          @dblclick.native="selectTeam(user)"
        />
      </div>
      <b-pagination
        v-model="page"
        class="pagination"
        :total="total"
        :per-page="PER_PAGE"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      />
    </div>
    <b-modal v-model="isCreateViewEnable">
      <CreateTeamBox @create="createTeam" @close="isCreateViewEnable = false" />
    </b-modal>
    <b-modal v-model="isEditViewEnable">
      <TeamEdit
        :team="selectedTeam"
        @close="isEditViewEnable = false"
        @reload="reload"
      />
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
import CreateTeamBox from '@/components/organisms/settings/CreateTeamBox.vue'
import TeamEdit from '@/components/molecules/settings/TeamEdit.vue'
import {
  TeamApi,
  SearchApi,
  checkAuthWithStatus,
  ProfileModel,
} from '@/scripts/api/index'
import { failureToast, successToast } from '@/scripts/utils/toast'

type DataType = {
  uuid: string
  users: ProfileModel[]
  selectedTeam: ProfileModel
  total: number
  page: number
  generatedLink: string
  isCreateViewEnable: boolean
  isEditViewEnable: boolean
  PER_PAGE: number
}

export default Vue.extend({
  components: {
    BorderTitle,
    TeamTools,
    UserCell,
    CreateTeamBox,
    TeamEdit,
  },
  data(): DataType {
    return {
      uuid: uuidv4(),
      users: [],
      selectedTeam: {} as ProfileModel,
      total: 0,
      page: 1,
      generatedLink: '',
      isCreateViewEnable: false,
      isEditViewEnable: false,
      PER_PAGE: 10,
    }
  },
  created() {
    this.getTeams()
  },
  methods: {
    failureToast,
    successToast,
    checkAuthWithStatus,
    reload() {
      this.isEditViewEnable = false
      this.getTeams()
    },
    getTeams() {
      new SearchApi(this.$store.getters['auth/config'])
        .getSearchTeam('', this.PER_PAGE, (this.page - 1) * this.PER_PAGE)
        .then(res => {
          this.total = res.data.total ?? 0
          this.users = res.data.teams ?? []
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'Search team failed',
            err.response.status
          )
        })
    },
    createTeam(name: string) {
      new TeamApi(this.$store.getters['auth/config'])
        .postTeam(name)
        .then(() => {
          this.isCreateViewEnable = false
          this.getTeams()
          // @ts-ignore
          this.successToast(this.$buefy, 'Success to create new team')
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'Failed to create',
            err.response.status
          )
        })
    },
    selectTeam(team: ProfileModel) {
      this.selectedTeam = team
      this.isEditViewEnable = true
    },
  },
})
</script>

<style lang="scss">
.setting-teams-container {
  width: 100%;
  height: 40px;
  padding: 0px 32px;
  color: white;
  background-color: rgb(32, 32, 32);
  font-size: 14px;
  font-weight: bold;

  .teams-item-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    max-width: 798px;
    margin: 0 auto;

    .border-title {
      width: 100%;
      margin: 20px 8px;
    }

    .teams-item-box {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      width: 100%;

      .user-cell {
        margin: 8px;
      }

      .update-button {
        width: 120px;
        margin-top: 16px;
        font-weight: bold;
      }
    }

    .pagination {
      margin: 32px;
    }
  }
}
</style>
