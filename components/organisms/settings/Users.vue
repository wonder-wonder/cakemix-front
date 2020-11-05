<template>
  <div class="setting-users-container">
    <ButtonInput
      class="button-input"
      :button-name="'Generate link'"
      :label-name="'Invitation Link'"
      :value="generatedLink"
      @click="generateLink"
    />
    <BorderTitle :title="'Users'" />
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
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import BorderTitle from '@/components/atoms/title/BorderTitle.vue'
import UserCell from '@/components/atoms/cell/UserCell.vue'
import ButtonInput from '@/components/molecules/button/ButtonInput.vue'
import {
  AuthApi,
  checkAuthWithStatus,
  SearchApi,
  ProfileModel,
} from '@/scripts/api/index'
import { failureToast } from '@/scripts/tools/toast'

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
      PER_PAGE: 10,
    }
  },
  watch: {
    page() {
      this.getUsers()
    },
  },
  created() {
    this.getUsers()
  },
  methods: {
    failureToast,
    checkAuthWithStatus,
    getUsers() {
      new SearchApi(this.$store.getters['auth/config'])
        .getSearchUser('', this.PER_PAGE, (this.page - 1) * this.PER_PAGE)
        .then(res => {
          this.total = res.data.total ?? 0
          this.users = this.users.concat(res.data.users ?? [])
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'Search user failed', 1)
        })
    },
    generateLink() {
      new AuthApi(this.$store.getters['auth/config'])
        .getNewTokenRegist()
        .then(res => {
          this.generatedLink = `${process.env.HTTP_SCHEME}://${process.env.DOMAIN}/auth/signup/${res.data.token}`
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          // @ts-ignore
          this.failureToast(this.$buefy, 'Generate a invitation link failed', 1)
        })
    },
  },
})
</script>

<style lang="scss">
.setting-users-container {
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

  label {
    color: white;
  }

  .button-input {
    max-width: 500px;
    width: 100%;
  }

  .border-title {
    width: 100%;
    margin: 20px 0;
  }

  .users-item-box {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 20px;

    .user-cell {
      margin: 16px 16px 0 0;
    }

    .update-button {
      width: 120px;
      margin-top: 16px;
      font-weight: bold;
    }
  }

  .pagination {
    margin: 16px;
  }
}
</style>
