<template>
  <div class="team-edit-container">
    <div class="team-item-tool-box">
      <Input :label-name="'Team Name'" :value="team.name" :disabled="true" />
      <!-- <b-button
        type="is-success"
        class="change-team-name-button"
        @click="$emit('change-team-name')"
      >
        Change
      </b-button> -->
    </div>
    <b-field label="Add new member">
      <b-autocomplete
        :data="searchPaging.data"
        placeholder="UserName"
        field="Users"
        :loading="searchPaging.isFetching"
        :check-infinite-scroll="true"
        @typing="getUsers"
        @infinite-scroll="getUsers"
        @select="selectUser"
      >
        <template slot-scope="props">
          <div class="user-search-cell-container">
            <div class="icon-box">
              <i v-if="!teamHasImage" class="fa fa-user" />
              <b-image
                v-if="teamHasImage"
                :src="props.option.icon_uri"
                :rounded="rounded"
              />
            </div>
            <div class="name">
              {{ props.option.name }}
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
    <div class="users-item-tool-box">
      <b-input
        placeholder="Search..."
        type="text"
        class="user-search-input"
        @input="userSearchInput = $event"
      />
    </div>
    <div class="users-item-box">
      <TeamMemberWideCell
        v-for="(user, index) in filteredMember"
        :key="`user-cell-${uuid}-${index}`"
        :user="user"
        :own-permission="ownPermission"
        @changed="changedPermComfirm(user, $event)"
      />
    </div>
    <b-button
      type="is-danger"
      class="delete-team-button"
      @click="deleteTeamConfirm"
    >
      Delete Team
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import TeamMemberWideCell from '@/components/molecules/settings/cell/TeamMemberWideCell.vue'
import Input from '@/components/atoms/input/Input.vue'
import { successToast, failureToast } from '@/scripts/tools/toast'
import {
  checkAuthWithStatus,
  TeamApi,
  SearchApi,
  ProfileModel,
  MemberInfoModel,
} from '@/scripts/api/index'

type DataType = {
  uuid: string
  searchName: string
  searchPaging: SearchPagingModel
  members: MemberInfoModel[]
  userSearchInput: string
}

type SearchPagingModel = {
  data: ProfileModel[]
  total: number
  page: number
  PER_PAGE: number
  isFetching: boolean
}

export default Vue.extend({
  components: {
    Input,
    TeamMemberWideCell,
  },
  props: {
    team: {
      type: Object as PropType<ProfileModel>,
      default: {},
    },
  },
  data(): DataType {
    return {
      uuid: uuidv4(),
      searchName: '',
      searchPaging: {
        data: [] as ProfileModel[],
        total: 9999,
        page: 1,
        PER_PAGE: 20,
        isFetching: false,
      } as SearchPagingModel,
      members: [] as MemberInfoModel[],
      userSearchInput: '',
    }
  },
  computed: {
    teamHasImage(): boolean {
      return !(this.team.icon_uri === undefined || this.team.icon_uri === '')
    },
    filteredMember(): MemberInfoModel[] {
      if (this.userSearchInput === '') {
        return this.members
      }
      const reg = RegExp(`.*${this.userSearchInput}.*`)
      return this.members.filter(mm => {
        const name = (mm.member as ProfileModel).name
        return reg.test(name)
      })
    },
    ownPermission(): number {
      const own = this.members.filter(mm => {
        const uuid = (mm.member as ProfileModel).uuid
        return uuid === this.$store.getters['auth/uuid']
      }) as MemberInfoModel[]
      if (own.length === 0) {
        return 3
      }
      return own[0].permission ?? 0
    },
  },
  mounted() {
    this.getMembers()
  },
  methods: {
    successToast,
    failureToast,
    checkAuthWithStatus,
    selectUser(user: ProfileModel) {
      const teamId = this.team.uuid
      if (!teamId) {
        return
      }
      const mModel: MemberInfoModel = {
        member: user.uuid,
        permission: 0,
      } as MemberInfoModel

      new TeamApi(this.$store.getters['auth/config'])
        .postTeamTeamidMember(teamId, mModel)
        .then(() => {
          this.getMembers()
          // @ts-ignore
          this.successToast(this.$buefy, 'Added new member')
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'Add new member failed', 1)
        })
    },
    getMembers() {
      const teamId = this.team.uuid
      if (!teamId) {
        return
      }
      new TeamApi(this.$store.getters['auth/config'])
        .getTeamTeamidMember(teamId)
        .then(res => {
          this.members = res.data
        })
    },
    getUsers(name: string) {
      if (this.searchName !== name) {
        this.searchPaging.data = []
        this.searchPaging.total = 999
        this.searchPaging.page = 1
      }
      this.searchName = name
      if (this.searchPaging.total < this.searchPaging.page) {
        return
      }
      this.searchPaging.isFetching = true
      new SearchApi(this.$store.getters['auth/config'])
        .getSearchUser(
          name,
          this.searchPaging.PER_PAGE,
          (this.searchPaging.page - 1) * this.searchPaging.PER_PAGE
        )
        .then(res => {
          this.searchPaging.total = Math.ceil(
            (res.data.total ?? 0) / this.searchPaging.PER_PAGE
          )
          this.searchPaging.data = this.searchPaging.data.concat(
            res.data.users ?? []
          )
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'Search user failed', 1)
        })
        .finally(() => {
          this.searchPaging.isFetching = false
        })
    },
    changedPerm(user: MemberInfoModel, newPerm: number) {
      const teamId = this.team.uuid
      if (!teamId) {
        return
      }
      const profile = user.member as ProfileModel
      const uModel: MemberInfoModel = {
        member: profile.uuid,
        permission: newPerm,
      } as MemberInfoModel
      new TeamApi(this.$store.getters['auth/config'])
        .putTeamTeamidMember(teamId, uModel)
        .then(() => {
          this.getMembers()
          // @ts-ignore
          this.successToast(this.$buefy, 'Upgraded permission')
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'Change permission failed', 1)
        })
    },
    changedPermComfirm(user: MemberInfoModel, newPerm: number) {
      if (newPerm < 2) {
        this.changedPerm(user, newPerm)
        return
      }
      // @ts-ignore
      this.$buefy.dialog.confirm({
        message: 'Owner will be transferred to other, are you sure?',
        onConfirm: () => this.changedPerm(user, newPerm),
        onCancel: () => {
          this.getMembers()
        },
      })
    },
    deleteTeam() {
      const teamId = this.team.uuid
      if (!teamId) {
        return
      }
      new TeamApi(this.$store.getters['auth/config'])
        .deleteTeamTeamid(teamId)
        .then(() => {
          this.$emit('reload')
          // @ts-ignore
          this.successToast(this.$buefy, 'This team was deleted')
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'Delete team failed', 1)
        })
    },
    deleteTeamConfirm() {
      // @ts-ignore
      this.$buefy.dialog.confirm({
        message: 'Do you want to delete this team?',
        onConfirm: () => this.deleteTeam(),
        onCancel: () => {
          this.getMembers()
        },
      })
    },
  },
})
</script>

<style lang="scss">
.team-edit-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 16px;

  .team-item-tool-box {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    margin-bottom: 12px;

    .change-team-name-button {
      margin: auto 0 12px 12px;
    }
  }
  .field {
    width: 100%;
  }

  .search-input {
    margin: 8px;
  }

  .users-item-tool-box {
    width: 100%;
    padding: 16px 0;
    display: grid;
    grid-template-rows: 36px;
    grid-template-columns: auto 200px;
    align-items: center;

    .user-search-input {
      grid-column: 2 / 3;
    }
  }

  .users-item-box {
    width: 100%;
    height: 300px;
    overflow: scroll;
  }

  .user-search-cell-container {
    display: flex;
    flex-flow: row wrap;

    .icon-box {
      height: 100%;
      margin-right: 16px;
      color: black;
    }
  }

  .delete-team-button {
    width: 250px;
  }
}
</style>
