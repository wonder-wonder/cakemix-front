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
        @typing="get"
        @infinite-scroll="get"
        @select="select"
      >
        <template slot-scope="props">
          <div class="user-search-cell-container">
            <div class="icon-box">
              <i
                v-if="props.option.icon_uri === ''"
                class="fa"
                :class="props.option.isteam ? 'fa-users' : 'fa-user'"
              />
              <b-image
                v-if="props.option.icon_uri"
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
    <div class="users-cell-item-box">
      <UserCell :user="currentOwner" />
      <i class="fa fa-arrow-circle-right" />
      <UserCell :user="selectedUser" />
    </div>
    <b-button type="is-danger" class="change-owner-button" @click="changeOwner">
      Change
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import UserCell from '@/components/atoms/cell/UserCell.vue'
import { v4 as uuidv4 } from 'uuid'
import { failureToast } from '@/scripts/utils/toast'
import {
  checkAuthWithStatus,
  SearchApi,
  ProfileModel,
  MemberInfoModel,
} from '@/scripts/api/index'

type DataType = {
  uuid: string
  searchName: string
  searchPaging: SearchPagingModel
  members: MemberInfoModel[]
  tabs: TabModel[]
  currentTab: string
  selectedUser: ProfileModel
}

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
    UserCell,
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
  watch: {
    currentTab() {
      this.searchName = ''
      this.searchPaging.data = []
      this.searchPaging.total = 999
      this.searchPaging.page = 1
    },
  },
  methods: {
    failureToast,
    checkAuthWithStatus,
    select(user: ProfileModel) {
      this.selectedUser = user
    },
    get(name: string) {
      if (this.currentTab === TAB_TYPE_MODEL.USER) {
        this.getUser(name)
      } else if (this.currentTab === TAB_TYPE_MODEL.TEAM) {
        this.getTeam(name)
      }
    },
    getUser(name: string) {
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
    getTeam(name: string) {
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
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'Search team failed', 1)
        })
        .finally(() => {
          this.searchPaging.isFetching = false
        })
    },
    changeOwner() {
      this.$emit('update-user', this.selectedUser)
    },
  },
})
</script>

<style lang="scss">
.owner-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 16px;

  .b-tabs:not(:last-child) {
    margin: 0;
  }
  .b-tabs .tab-content {
    padding: 0;
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
      color: black;
    }
  }

  .users-cell-item-box {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    height: auto;
    margin-bottom: 20px;

    .fa {
      font-size: 40px;
      margin: 8px;
    }
  }
  .change-owner-button {
    width: 250px;
  }
}
</style>
