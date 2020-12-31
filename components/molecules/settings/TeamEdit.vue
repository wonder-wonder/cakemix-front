<template>
  <div class="team-edit-container">
    <div class="team-item-tool-box">
      <Input :label-name="'Team Name'" :value="team.name" :disabled="true" />
    </div>
    <b-field label="Add new member">
      <b-autocomplete
        :data="searchPaging.data"
        placeholder="UserName"
        field="Users"
        :loading="searchPaging.isFetching"
        :check-infinite-scroll="true"
        @typing="getUsers"
        @infinite-scroll="getMoreUsers"
        @select="selectUser"
      >
        <template v-slot="props">
          <UserSearchWideCell :user="props.option" />
        </template>
      </b-autocomplete>
    </b-field>
    <div class="users-item-box">
      <TeamMemberWideCell
        v-for="(user, index) in memberPaging.data"
        :key="`user-cell-${uuid}-${index}`"
        :user="user"
        :own-permission="ownPermission"
        @changed="changedPermComfirm(user, $event)"
        @remove="removeMember($event)"
      />
    </div>
    <b-pagination
      v-model="memberPaging.page"
      class="pagination"
      :total="memberPaging.total"
      :per-page="memberPaging.PER_PAGE"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      @change="getMembers"
    />
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
import { debounce } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import TeamMemberWideCell from '@/components/molecules/settings/cell/TeamMemberWideCell.vue'
import UserSearchWideCell from '@/components/atoms/cell/UserSearchWideCell.vue'
import Input from '@/components/atoms/input/Input.vue'
import { successToast, failureToast } from '@/scripts/utils/toast'
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
  memberPaging: PagingModel
  searchPaging: PagingModel
  userSearchInput: string
}

type PagingModel = {
  data: ProfileModel[] | MemberInfoModel[]
  total: number
  page: number
  PER_PAGE: number
  isFetching: boolean
}

export default Vue.extend({
  components: {
    Input,
    TeamMemberWideCell,
    UserSearchWideCell,
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
      memberPaging: {
        data: [] as MemberInfoModel[],
        total: 0,
        page: 1,
        PER_PAGE: 5,
        isFetching: false,
      } as PagingModel,
      searchPaging: {
        data: [] as ProfileModel[],
        total: 0,
        page: 1,
        PER_PAGE: 10,
        isFetching: false,
      } as PagingModel,
      userSearchInput: '',
    }
  },
  computed: {
    teamHasImage(): boolean {
      return !(this.team.icon_uri === undefined || this.team.icon_uri === '')
    },
    ownPermission(): number {
      const members = this.memberPaging.data as MemberInfoModel[]
      const own = members.filter(mm => {
        const uuid = (mm.member as ProfileModel).uuid
        return uuid === this.$store.getters['auth/uuid']
      })
      if (own.length === 0) {
        return 3
      }
      return own[0].permission ?? 0
    },
  },
  created() {
    this.getMembers()
  },
  methods: {
    successToast,
    failureToast,
    checkAuthWithStatus,
    resetMember() {
      this.memberPaging = {
        data: [] as MemberInfoModel[],
        total: 0,
        page: 1,
        PER_PAGE: 5,
        isFetching: false,
      } as PagingModel
    },
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
          this.resetMember()
          this.getMembers()
          // @ts-ignore
          this.successToast(this.$buefy, 'Added new member')
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'Add new member failed',
            err.response.status
          )
        })
    },
    getMembers() {
      const teamId = this.team.uuid
      if (!teamId) {
        return
      }
      new TeamApi(this.$store.getters['auth/config'])
        .getTeamTeamidMember(
          teamId,
          this.memberPaging.PER_PAGE,
          (this.memberPaging.page - 1) * this.memberPaging.PER_PAGE
        )
        .then(res => {
          this.memberPaging.total = res.data.total ?? 0
          const member = this.memberPaging.data as MemberInfoModel[]
          this.memberPaging.data = member.concat(res.data.members ?? [])
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'Get member failed',
            err.response.status
          )
        })
    },
    getUsers: debounce(function (this: any, name: string) {
      if (this.searchName !== name) {
        this.searchPaging.data = []
        this.searchPaging.total = 999
        this.searchPaging.page = 1
      }
      this.searchName = name
      if (this.searchPaging.total < this.searchPaging.page || name === '') {
        return
      }
      this.searchPaging.isFetching = true
      new SearchApi(this.$store.getters['auth/config'])
        .getSearchUser(
          this.searchName,
          this.searchPaging.PER_PAGE,
          (this.searchPaging.page - 1) * this.searchPaging.PER_PAGE
        )
        .then(res => {
          this.searchPaging.total = Math.ceil(
            (res.data.total ?? 0) / this.searchPaging.PER_PAGE
          )
          this.searchPaging.page = this.searchPaging.page + 1
          const users = this.searchPaging.data as ProfileModel[]
          this.searchPaging.data = users.concat(res.data.users ?? [])
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'Search user failed',
            err.response.status
          )
        })
        .finally(() => {
          this.searchPaging.isFetching = false
        })
    }, 200),
    getMoreUsers() {
      this.getUsers(this.searchName)
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
          // @ts-ignore
          this.successToast(this.$buefy, 'Upgraded permission')
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'Change permission failed',
            err.response.status
          )
        })
        .finally(() => {
          this.resetMember()
          this.getMembers()
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
    removeMember(uuid: string) {
      const teamId = this.team.uuid
      if (!teamId) {
        return
      }
      new TeamApi(this.$store.getters['auth/config'])
        .deleteTeamTeamidMember(teamId, uuid)
        .then(() => {
          this.resetMember()
          this.getMembers()
          // @ts-ignore
          this.successToast(this.$buefy, 'Member removed')
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'Unable to remove member',
            err.response.status
          )
          this.resetMember()
          this.getMembers()
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
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'Delete team failed',
            err.response.status
          )
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

<style lang="scss" scoped>
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
    height: 280px;
    overflow: scroll;
  }

  .pagination {
    margin: 8px 0px;
  }

  .delete-team-button {
    width: 250px;
  }
}
</style>
