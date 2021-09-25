<template>
  <div class="setting-users-container">
    <div ref="users-item-container" class="users-item-container">
      <BorderTitle :title="'Users'" />
      <b-button
        class="invitationlink-button"
        icon-left="plus"
        @click="openCreateUserBox"
      >
        New User
      </b-button>
      <div class="users-tool-container">
        <Input
          :label-name="'Search Name'"
          :value="userSearchText"
          class="search-input"
          @text="changedSearchText"
        />
        <div class="include-locked-user-box">
          <span class="label">Include locked user</span>
          <b-switch
            v-model="includeLockedUser"
            class="switch"
            size="is-small"
            @input="getUsers"
          />
        </div>
      </div>
      <BorderTitle :title="`${userPaging.total} users`" />
      <div class="users-item-box">
        <UserCell
          v-for="(user, index) in userPaging.data"
          :key="`user-cell-${uuid}-${index}`"
          class="user-cell"
          :user="user"
          :lockable="isAdmin"
          @lock="openLockUserDialog($event)"
          @unlock="openUnlockUserDialog($event)"
        />
      </div>
      <b-pagination
        v-model="userPaging.page"
        class="pagination"
        :total="userPaging.total"
        :per-page="userPaging.PER_PAGE"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        @change="getUsers"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import Input from '@/components/atoms/input/Input.vue'
import BorderTitle from '@/components/atoms/title/BorderTitle.vue'
import UserCell from '@/components/atoms/cell/UserCell.vue'
import CreateUserBox from '@/components/organisms/settings/CreateUserBox.vue'
import {
  checkAuthWithStatus,
  SearchApi,
  ProfileModel,
  ProfileApi,
  AuthApi,
} from '@/scripts/api/index'
import { failureToast } from '@/scripts/utils/toast'
import {
  TOAST_TYPE,
  getToastDesc,
  MODAL_TYPE,
  getModalDesc,
} from '@/scripts/model/toast'
import { getTitle, PAGES } from '@/scripts/model/head/index'

type PagingModel = {
  data: ProfileModel[]
  total: number
  page: number
  PER_PAGE: number
  isFetching: boolean
}

type DataType = {
  uuid: string
  userSearchText: string
  userPaging: PagingModel
  includeLockedUser: boolean
  isAdmin: boolean
}

export default Vue.extend({
  components: {
    BorderTitle,
    UserCell,
    Input,
  },
  data(): DataType {
    return {
      uuid: uuidv4(),
      userSearchText: '',
      userPaging: {
        data: [] as ProfileModel[],
        total: 0,
        page: 1,
        PER_PAGE: 15,
        isFetching: false,
      } as PagingModel,
      includeLockedUser: false,
      isAdmin: false,
    }
  },
  head: {
    title: getTitle(PAGES.USERS),
  },
  created() {
    this.getUsers()
    this.getOwnPermission()
  },
  mounted() {
    window.addEventListener('resize', this.updateWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWidth)
  },
  methods: {
    openLockUserDialog(uuid: string) {
      // @ts-ignore
      this.$buefy.dialog.confirm({
        message: getModalDesc(MODAL_TYPE.LOCK_USER_CONFIRM),
        onConfirm: () => this.lockUser(uuid),
        onCancel: () => {},
      })
    },
    openUnlockUserDialog(uuid: string) {
      // @ts-ignore
      this.$buefy.dialog.confirm({
        message: getModalDesc(MODAL_TYPE.UNLOCK_USER_CONFIRM),
        onConfirm: () => this.unlockUser(uuid),
        onCancel: () => {},
      })
    },
    openCreateUserBox() {
      // @ts-ignore
      this.$buefy.modal.open({
        parent: this.$root,
        component: CreateUserBox,
      })
    },
    changedSearchText(text: string) {
      this.userSearchText = text
      this.userPaging.page = 1
      this.getUsers()
    },
    getUsers() {
      new SearchApi(this.$store.getters['auth/config'])
        .getSearchUser(
          this.userSearchText,
          this.userPaging.PER_PAGE,
          (this.userPaging.page - 1) * this.userPaging.PER_PAGE,
          this.includeLockedUser ? undefined : 'unlocked'
        )
        .then(res => {
          this.userPaging.total = res.data.total ?? 0
          this.userPaging.data = res.data.users ?? []
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
          this.updateWidth()
        })
    },
    getOwnPermission() {
      new ProfileApi(this.$store.getters['auth/config'])
        .getUserProfileUuid(this.$store.getters['auth/uuid'])
        .then(res => {
          this.isAdmin = res.data.is_admin ?? false
        })
    },
    lockUser(uuid: string) {
      new AuthApi(this.$store.getters['auth/config'])
        .postAuthLock(uuid)
        .then(() => {
          this.getUsers()
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.CANNOT_LOCK).failure,
            err.response.status
          )
        })
    },
    unlockUser(uuid: string) {
      new AuthApi(this.$store.getters['auth/config'])
        .deleteAuthLock(uuid)
        .then(() => {
          this.getUsers()
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.CANNOT_UNLOCK).failure,
            err.response.status
          )
        })
    },
    updateWidth() {
      const hMargin = 16
      const cellWidth = 250
      const cellWidthWithMargin = cellWidth + hMargin
      const userCellContainer = this.$refs[
        'users-item-container'
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
.setting-users-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0px 8px;
  margin-bottom: 32px;
  color: white;
  background-color: $main-color;
  font-size: 14px;
  font-weight: bold;

  .invitationlink-button {
    margin: 0 8px 16px auto;
    font-weight: bold;
    color: $font-color;
    background-color: $accent-color;
  }

  .users-tool-container {
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    margin: 0 8px;
    padding: 32px;
    margin-bottom: 16px;
    background-color: $sub-main-color;

    @media only screen and (max-width: 600px) {
      padding: 32px 16px;
    }

    .search-input {
      max-width: 400px;
      width: 100%;
    }

    .include-locked-user-box {
      display: flex;
      flex-flow: row wrap;
      .label {
        font-size: 14px;
        margin: 0;
        margin-right: 8px;
        width: auto;
        color: $font-color;
      }
    }
  }

  .users-item-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    max-width: 798px;
    margin: 0 auto;

    .border-title {
      width: 100%;
      margin: 16px 8px;
    }

    .users-item-box {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      width: 100%;
      margin-bottom: 20px;

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
      margin: 16px;
      .pagination-link {
        color: $font-color;
      }
    }
  }
}
</style>
