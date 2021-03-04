<template>
  <div class="setting-teams-container">
    <div ref="teams-item-container" class="teams-item-container">
      <BorderTitle :title="'Teams'" />
      <TeamTools
        class="team-tools-container"
        @create-team="openCreateTeamBox"
      />
      <div class="teams-item-box">
        <UserCell
          v-for="(user, index) in users"
          :key="`user-cell-${uuid}-${index}`"
          class="user-cell"
          :user="user"
          @click.native="selectTeam(user)"
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
        @change="getTeams"
      />
    </div>
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
  PER_PAGE: number
}

export default Vue.extend({
  components: {
    BorderTitle,
    TeamTools,
    UserCell,
  },
  data(): DataType {
    return {
      uuid: uuidv4(),
      users: [],
      selectedTeam: {} as ProfileModel,
      total: 0,
      page: 1,
      generatedLink: '',
      PER_PAGE: 9,
    }
  },
  created() {
    this.getTeams()
  },
  mounted() {
    window.addEventListener('resize', this.updateWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWidth)
  },
  methods: {
    failureToast,
    successToast,
    checkAuthWithStatus,
    openCreateTeamBox() {
      // @ts-ignore
      this.$buefy.modal.open({
        parent: this.$root,
        component: CreateTeamBox,
        events: { created: this.getTeams },
      })
    },
    openTeamEdit() {
      // @ts-ignore
      this.$buefy.modal.open({
        parent: this.$root,
        component: TeamEdit,
        props: {
          team: this.selectedTeam,
        },
        events: { reload: this.getTeams },
      })
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
        .finally(() => {
          this.updateWidth()
        })
    },

    selectTeam(team: ProfileModel) {
      this.selectedTeam = team
      this.openTeamEdit()
    },
    updateWidth() {
      const hMargin = 16
      const cellWidth = 250
      const cellWidthWithMargin = cellWidth + hMargin
      const userCellContainer = this.$refs[
        'teams-item-container'
      ] as HTMLElement
      const listWidth = userCellContainer.clientWidth
      const minNumCell = Math.floor(listWidth / cellWidthWithMargin)
      const cellWidthDiff = listWidth - minNumCell * cellWidthWithMargin
      const eCellWidthWithMargin =
        cellWidthWithMargin + Math.floor(cellWidthDiff / minNumCell)
      const eCellWidth = eCellWidthWithMargin - hMargin
      const userCells = document.getElementsByClassName('user-cell')
      for (let index = 0; index < userCells.length; index++) {
        const cell = userCells[index] as HTMLElement
        cell.style.width = `${eCellWidth}px`
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.setting-teams-container {
  width: 100%;
  padding: 0px 8px;
  margin-bottom: 32px;
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

    .team-tools-container {
      margin-bottom: 16px;
    }
    .border-title {
      width: 100%;
      margin: 16px 8px;
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
      .pagination-link {
        color: white;
      }
    }
  }
}
</style>
