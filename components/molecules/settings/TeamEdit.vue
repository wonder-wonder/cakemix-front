<template>
  <div class="team-edit-container">
    <div class="team-item-tool-box">
      <Input :label-name="'Team Name'" :value="team.name" :disabled="true" />
    </div>
    <b-field label="Add new member">
      <b-autocomplete
        :data="searchPaging.data"
        field="Users"
        :loading="searchPaging.isFetching"
        :check-infinite-scroll="true"
        @typing="getUsers"
        @infinite-scroll="getMoreUsers"
        @select="selectUser"
      >
        <template #default="props">
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
    <b-button class="delete-team-button" @click="deleteTeamConfirm">
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
  TOAST_TYPE,
  MODAL_TYPE,
  getToastDesc,
  getModalDesc,
} from '@/scripts/model/toast'
import {
  checkAuthWithStatus,
  TeamApi,
  SearchApi,
  ProfileModel,
  MemberInfoModel,
} from '@/scripts/api/index'
import { getEditTeamTitle } from '@/scripts/model/head/index'

type PagingModel = {
  data: ProfileModel[] | MemberInfoModel[]
  total: number
  page: number
  PER_PAGE: number
  isFetching: boolean
}

type DataType = {
  uuid: string
  searchName: string
  memberPaging: PagingModel
  searchPaging: PagingModel
  userSearchInput: string
  ownPermission: number
}

type HeadType = {
  title: string
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
      default: {} as ProfileModel,
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
      ownPermission: 0,
    }
  },
  head(): HeadType {
    return {
      title: getEditTeamTitle(this.teamName),
    }
  },
  computed: {
    teamHasImage(): boolean {
      return !(this.team.icon_uri === undefined || this.team.icon_uri === '')
    },
    teamName(): string {
      return this.team.name ?? 'Unknown'
    },
  },
  created() {
    this.getOwnPermission()
    this.getMembers()
  },
  methods: {
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
          successToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.ADD_NEW_MEMBER).success
          )
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.ADD_NEW_MEMBER).failure,
            err.response.status
          )
        })
    },
    getOwnPermission() {
      const teamId = this.team.uuid
      if (!teamId) {
        return
      }
      new TeamApi(this.$store.getters['auth/config'])
        .getTeamTeamidMember(
          teamId,
          this.memberPaging.PER_PAGE,
          (this.memberPaging.page - 1) * this.memberPaging.PER_PAGE,
          this.$store.getters['auth/uuid']
        )
        .then(res => {
          const total = res.data.total ?? 0
          const members = res.data.members ?? []
          if (total < 1 || members.length < 1) {
            this.ownPermission = 0
            return
          }
          this.ownPermission = members[0].permission ?? 0
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
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
          this.memberPaging.data = res.data.members ?? []
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.GET_MEMBER).failure,
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
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.SEARCH).failure,
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
          successToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.CHANGE_PERMISSION).success
          )
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.CHANGE_PERMISSION).failure,
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
        message: getModalDesc(MODAL_TYPE.OWNER_TRANSFER),
        type: 'is-danger',
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
          successToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.REMOVE_MEMBER).success
          )
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.REMOVE_MEMBER).failure,
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
          successToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.DELETE_TEAM).success
          )
          this.$emit('close')
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.DELETE_TEAM).failure,
            err.response.status
          )
        })
    },
    deleteTeamConfirm() {
      // @ts-ignore
      this.$buefy.dialog.confirm({
        message: getModalDesc(MODAL_TYPE.DELETE_TEAM),
        type: 'is-danger',
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
  width: 958px;
  max-width: 100vw;
  padding: 16px;
  background-color: $sub-main-color;
  border: solid 1px white;
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
    margin-top: 8px;
    margin-bottom: 16px;
  }

  .delete-team-button {
    width: 250px;
    font-weight: bold;
    color: white;
    background-color: $danger-color;
  }
}
</style>
