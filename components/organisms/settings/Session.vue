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
import BorderTitle from '@/components/atoms/title/BorderTitle.vue'
import SessionCell from '@/components/atoms/cell/SessionCell.vue'
import { successToast, failureToast } from '@/scripts/utils/toast'
import {
  TOAST_TYPE,
  getToastDesc,
  getModalDesc,
  MODAL_TYPE,
} from '@/scripts/model/toast'
import {
  checkAuthWithStatus,
  AuthApi,
  AuthSessionModel,
} from '@/scripts/api/index'
import { getTitle, PAGES } from '@/scripts/model/head/index'

type DataType = {
  sessions: AuthSessionModel[]
}

export default Vue.extend({
  components: {
    BorderTitle,
    SessionCell,
  },
  data(): DataType {
    return {
      sessions: [],
    }
  },
  head: {
    title: getTitle(PAGES.SESSION),
  },
  created() {
    this.fetch()
  },
  methods: {
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
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.GET_SESSION).failure,
            err.response.status
          )
        })
    },
    deleteConfirm(sessionID: string) {
      // @ts-ignore
      this.$buefy.dialog.confirm({
        message: getModalDesc(MODAL_TYPE.DELETE_SESSION_CONFIRM),
        onConfirm: () => this.delete(sessionID),
        onCancel: () => {},
      })
    },
    delete(sessionID: string) {
      new AuthApi(this.$store.getters['auth/config'])
        .deleteAuthSession(sessionID)
        .then(() => {
          this.fetch()
          successToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.DELETE_SESSION).success
          )
        })
        .catch(err => {
          checkAuthWithStatus(this, err.response.status)
          failureToast(
            // @ts-ignore
            this.$buefy,
            getToastDesc(TOAST_TYPE.DELETE_SESSION).failure,
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
