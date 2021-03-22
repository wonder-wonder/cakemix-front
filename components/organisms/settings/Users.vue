<template>
  <div class="setting-users-container">
    <div ref="users-item-container" class="users-item-container">
      <BorderTitle :title="'Users'" />
      <div class="users-tool-container">
        <ButtonInput
          class="button-input"
          :button-name="'Generate link'"
          :label-name="'Invitation Link'"
          :value="generatedLink"
          @click="generateLink"
        />
      </div>
      <div class="users-item-box">
        <UserCell
          v-for="(user, index) in users"
          :key="`user-cell-${uuid}-${index}`"
          class="user-cell"
          :user="user"
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
        @change="getUsers"
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
  checkAuthWithStatus,
  AuthApi,
  SearchApi,
  ProfileModel,
} from '@/scripts/api/index'
import { failureToast } from '@/scripts/utils/toast'
import { TOAST_TYPE, getToastDesc } from '@/scripts/model/toast'
import { getTitle, PAGES } from '@/scripts/model/head/index'

type DataType = {
  uuid: string
  users: ProfileModel[]
  total: number
  page: number
  generatedLink: string
  PER_PAGE: number
}

export default Vue.extend({
  components: {
    BorderTitle,
    UserCell,
    ButtonInput,
  },
  data(): DataType {
    return {
      uuid: uuidv4(),
      users: [],
      total: 0,
      page: 1,
      generatedLink: '',
      PER_PAGE: 9,
    }
  },
  head: {
    title: getTitle(PAGES.USERS),
  },
  created() {
    this.getUsers()
  },
  mounted() {
    window.addEventListener('resize', this.updateWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWidth)
  },
  methods: {
    getUsers() {
      new SearchApi(this.$store.getters['auth/config'])
        .getSearchUser('', this.PER_PAGE, (this.page - 1) * this.PER_PAGE)
        .then(res => {
          this.total = res.data.total ?? 0
          this.users = res.data.users ?? []
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
    generateLink() {
      new AuthApi(this.$store.getters['auth/config'])
        .getNewTokenRegist()
        .then(res => {
          const DOMAIN =
            process.env.NODE_ENV === 'development'
              ? process.env.DOMAIN
              : location.hostname
          this.generatedLink = `${process.env.HTTP_SCHEME}://${location.hostname}:${process.env.PORT}/auth/signup/${res.data.token}`
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.GENERATE_NEW_LINK).failure,
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

<style lang="scss">
.setting-users-container .users-tool-container label {
  color: white;
}
</style>

<style lang="scss" scoped>
.setting-users-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0px 8px;
  margin-bottom: 32px;
  color: white;
  background-color: rgb(32, 32, 32);
  font-size: 14px;
  font-weight: bold;

  .users-tool-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    max-width: 450px;
    padding: 0px 8px;
    margin-bottom: 16px;

    label {
      color: white;
    }

    .button-input {
      max-width: 500px;
      width: 100%;
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
        color: white;
      }
    }
  }
}
</style>
