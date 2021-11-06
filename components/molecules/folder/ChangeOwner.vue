<template>
  <div class="owner-container">
    <b-tabs v-model="currentTab" class="menu-tabs-container" type="is-boxed">
      <template v-for="tab in tabs">
        <b-tab-item
          v-if="tab.displayed"
          :key="tab.id"
          :value="tab.id"
          :label="tab.label"
          :icon="tab.icon"
        />
      </template>
    </b-tabs>
    <b-field label="Search">
      <b-autocomplete
        :data="searchPaging.data"
        placeholder="Name"
        field="Users"
        :loading="searchPaging.isFetching"
        :check-infinite-scroll="true"
        :max-height="'150px'"
        @typing="get"
        @infinite-scroll="getMore"
        @select="select"
      >
        <template #default="props">
          <UserSearchWideCell :user="props.option" />
        </template>
      </b-autocomplete>
    </b-field>
    <div v-if="isUserSelected" class="user-cells-box">
      <UserMinCell class="user-cell" :user="currentOwner" />
      <fa-icon class="icon" icon="arrow-right" />
      <UserMinCell class="user-cell" :user="selectedUser" />
    </div>
    <b-button
      v-if="isUserSelected"
      class="change-owner-button"
      @click="changeOwner"
    >
      Change
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { debounce } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import UserMinCell from '@/components/atoms/cell/UserMinCell.vue'
import UserSearchWideCell from '@/components/atoms/cell/UserSearchWideCell.vue'
import { failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getToastDesc } from '@/scripts/model/toast'
import {
  checkAuthWithStatus,
  SearchApi,
  ProfileModel,
  MemberInfoModel,
} from '@/scripts/api/index'

type SearchPagingModel = {
  data: ProfileModel[]
  total: number
  page: number
  PER_PAGE: number
  isFetching: boolean
}

type TabModel = {
  id: string
  displayed: boolean
  admin: boolean
  label: string
  icon: string
}

type DataType = {
  uuid: string
  searchName: string
  searchPaging: SearchPagingModel
  members: MemberInfoModel[]
  tabs: TabModel[]
  currentTab: string
  selectedUser: ProfileModel
}

const TAB_TYPE_MODEL = {
  USER: '0',
  TEAM: '1',
} as const

const tabs = [
  {
    id: TAB_TYPE_MODEL.USER,
    displayed: true,
    admin: false,
    label: 'User',
    icon: 'account',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.TEAM,
    displayed: true,
    admin: false,
    label: 'Team',
    icon: 'account-group',
  } as TabModel,
]

export default Vue.extend({
  components: {
    UserMinCell,
    UserSearchWideCell,
  },
  props: {
    currentOwner: {
      type: Object as PropType<ProfileModel>,
      default: {} as ProfileModel,
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
      tabs,
      currentTab: TAB_TYPE_MODEL.USER,
      selectedUser: {} as ProfileModel,
    }
  },
  computed: {
    isUserSelected(): boolean {
      return !!this.selectedUser.uuid
    },
  },
  watch: {
    currentTab() {
      this.searchName = ''
      this.searchPaging.data = []
      this.searchPaging.total = 999
      this.searchPaging.page = 1
    },
  },
  methods: {
    select(user: ProfileModel) {
      this.selectedUser = user
    },
    get: debounce(function (this: any, name: string) {
      if (this.currentTab === TAB_TYPE_MODEL.USER) {
        this.getUser(name)
      } else if (this.currentTab === TAB_TYPE_MODEL.TEAM) {
        this.getTeam(name)
      }
    }, 200),
    getMore() {
      this.get(this.searchName)
    },
    getUser(name: string) {
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
          name,
          this.searchPaging.PER_PAGE,
          (this.searchPaging.page - 1) * this.searchPaging.PER_PAGE
        )
        .then(res => {
          this.searchPaging.total = Math.ceil(
            (res.data.total ?? 0) / this.searchPaging.PER_PAGE
          )
          this.searchPaging.page = this.searchPaging.page + 1
          this.searchPaging.data = this.searchPaging.data.concat(
            res.data.users ?? []
          )
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
    },
    getTeam(name: string) {
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
        .getSearchTeam(
          name,
          this.searchPaging.PER_PAGE,
          (this.searchPaging.page - 1) * this.searchPaging.PER_PAGE
        )
        .then(res => {
          this.searchPaging.total = Math.ceil(
            (res.data.total ?? 0) / this.searchPaging.PER_PAGE
          )
          this.searchPaging.data = this.searchPaging.data.concat(
            res.data.teams ?? []
          )
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
    },
    changeOwner() {
      this.$emit('update-user', this.selectedUser)
      this.$emit('close')
    },
  },
})
</script>

<style lang="scss">
.owner-container {
  .b-tabs:not(:last-child) {
    margin: 0;
  }
  .b-tabs .tab-content {
    padding: 0;
  }
}
</style>

<style lang="scss" scoped>
.owner-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 700px;
  max-width: 100vw;
  min-height: 300px;
  padding: 16px;
  background-color: $sub-main-color;
  border: solid 1px white;
  border-radius: 16px;

  .b-tabs:not(:last-child) {
    margin: 0;
  }
  .b-tabs .tab-content {
    padding: 0 !important;
  }
  .field {
    width: 100%;
  }

  .search-input {
    margin: 8px;
  }

  .user-search-cell-container {
    display: flex;
    flex-flow: row wrap;

    .icon-box {
      height: 20px;
      margin-right: 16px;
      color: $contrast-color;
    }
  }

  .user-cells-box {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    height: auto;
    margin-bottom: 8px;

    .user-cell {
      margin: 4px;
    }
    .icon {
      font-size: 32px;
      margin: 0 8px 32px 8px;
    }
  }
  .change-owner-button {
    width: 250px;
    color: white;
    background-color: $danger-color;
    font-weight: bold;
  }
}
</style>
