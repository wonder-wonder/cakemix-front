<template>
  <div class="setting-session-container">
    <div class="session-item-box">
      <BorderTitle title="Session" />
      <div class="session-vertical-container">
        <SessionCell
          v-for="(v, i) in sessions"
          :key="`log-cell-${i}`"
          :session="v"
          @delete="deleteConfirm($event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SessionCell from '@/components/atoms/cell/SessionCell.vue'
import { failureToast, successToast } from '@/scripts/utils/toast'
import {
  checkAuthWithStatus,
  AuthApi,
  AuthSessionModel,
} from '@/scripts/api/index'

type DataType = {
  sessions: AuthSessionModel[]
}

export default Vue.extend({
  components: {
    SessionCell,
  },
  data(): DataType {
    return {
      sessions: [],
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    successToast,
    failureToast,
    checkAuthWithStatus,
    fetch() {
      new AuthApi(this.$store.getters['auth/config'])
        .getAuthSession()
        .then(res => {
          /// sort in desc order
          this.sessions = res.data.sort(
            (a, b) => (b.lastused ?? 0) - (a.lastused ?? 0)
          )
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'fetch session info failed',
            err.response.status
          )
        })
    },
    deleteConfirm(sessionID: string) {
      // @ts-ignore
      this.$buefy.dialog.confirm({
        message: 'Do you want to delete this session?',
        onConfirm: () => this.delete(sessionID),
        onCancel: () => {},
      })
    },
    delete(sessionID: string) {
      new AuthApi(this.$store.getters['auth/config'])
        .deleteAuthSession(sessionID)
        .then(() => {
          this.fetch()
          this.successToast(
            // @ts-ignore
            this.$buefy,
            `session(${sessionID}) was deleted`
          )
        })
        .catch(err => {
          this.checkAuthWithStatus(this, err.response.status)
          this.failureToast(
            // @ts-ignore
            this.$buefy,
            'delete session failed',
            err.response.status
          )
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.setting-session-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  max-width: 798px;
  padding: 0px 16px;
  margin-bottom: 32px;
  color: white;
  background-color: rgb(32, 32, 32);
  font-size: 14px;
  font-weight: bold;

  .border-title {
    width: 100%;
    margin: 16px 0;
  }

  .session-item-box {
    width: 100%;

    .maximum-width {
      max-width: 375px;
    }
    .update-button {
      width: 144px;
      margin: 16px 0;
      font-weight: bold;
    }
  }

  .border-title {
    margin-bottom: 30px;
  }
}
</style>
