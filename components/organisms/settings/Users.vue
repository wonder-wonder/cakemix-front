<template>
  <div class="users-container">
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

export type DataType = {
  uuid: String
  users: UserModel[]
  generatedLink: String
}

const User = {
  icon: 'https://picsum.photos/64/64',
  userName: 'user_name',
  joinedAt: '2020-09-27 21:17:40',
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
      users: [User, User, User],
      generatedLink: '',
    }
  },
  methods: {
    generateLink() {
      this.generatedLink = 'http://localhost:3000/invite/qawsedrftgyhujikolp'
    },
  },
})
</script>

<style lang="scss">
.users-container {
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
