<template>
  <div class="setting-users-container">
    <ButtonInput
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import BorderTitle from '@/components/atoms/title/BorderTitle.vue'
import UserCell, { UserModel } from '@/components/atoms/cell/UserCell.vue'
import ButtonInput from '@/components/molecules/button/ButtonInput.vue'
import { AuthApi, checkAuthWithStatus } from '@/scripts/api/index'
import { failureToast } from '@/scripts/tools/toast'

export type DataType = {
  uuid: String
  users: UserModel[]
  generatedLink: String
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
      users: [
        {
          icon: 'https://picsum.photos/64/64',
          userName: 'user_name',
          joinedAt: '2020-09-27 21:17:40',
        },
      ],
      generatedLink: '',
    }
  },
  methods: {
    failureToast,
    checkAuthWithStatus,
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
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  padding: 0px 32px;
  color: white;
  background-color: rgb(32, 32, 32);
  font-size: 14px;
  font-weight: bold;

  .label {
    color: white;
  }

  .border-title {
    width: 100%;
    margin: 20px 0;
  }

  .users-item-box {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;

    .user-cell {
      margin: 16px 16px 0 0;
    }

    .update-button {
      width: 120px;
      margin-top: 16px;
      font-weight: bold;
    }
  }
}
</style>
