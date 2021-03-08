<template>
  <div class="session-cell-container">
    <div class="session-type-container">
      <fa-icon class="type-icon" icon="desktop" />
    </div>
    <div class="session-info-container">
      <div class="session-id-container">
        <span class="session-detail-item" v-text="sessionID" />
        <span v-if="isCurrent" class="vertical-separator-item" />
        <span
          v-if="isCurrent"
          class="session-hightlight-detail-item"
          v-text="'CURRENT SESSION'"
        />
      </div>
      <span
        class="session-detail-info1-item"
        v-text="`Logged in at ${lastLogin}`"
      />
      <span class="vertical-separator-item" />
      <span
        class="session-detail-info1-item"
        v-text="`Last used at ${lastUsed}`"
      />
      <span class="vertical-separator-item" />
      <span
        class="session-detail-info2-item"
        title="IP Address"
        v-text="ipAddress"
      />
      <span
        class="session-detail-info2-item"
        title="Device Information"
        v-text="deviceInfo"
      />
    </div>
    <div class="session-button-container" @click="$emit('delete', sessionID)">
      <fa-icon class="session-revoke" icon="trash" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { AuthSessionModel } from '@/scripts/api/index'
import { toDate } from '@/scripts/utils/date'

export default Vue.extend({
  props: {
    session: {
      type: Object as PropType<AuthSessionModel>,
      default: {} as AuthSessionModel,
    },
  },
  computed: {
    sessionID(): string {
      if (this.session.sessionid === undefined) {
        return ''
      }
      return this.session.sessionid
    },
    lastLogin(): string {
      if (this.session.lastlogin === undefined) {
        return ''
      }
      return this.toDate(this.session.lastlogin)
    },
    lastUsed(): string {
      if (this.session.lastused === undefined) {
        return ''
      }
      return this.toDate(this.session.lastused)
    },
    ipAddress(): string {
      if (this.session.ipaddr === undefined) {
        return ''
      }
      return this.session.ipaddr
    },
    deviceInfo(): string {
      if (this.session.devinfo === undefined) {
        return ''
      }
      return this.session.devinfo
    },
    isCurrent(): boolean {
      if (this.session.iscurrent === undefined) {
        return false
      }
      return this.session.iscurrent
    },
  },
  methods: {
    toDate,
  },
})
</script>

<style lang="scss" scoped>
.session-cell-container {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  height: auto;
  width: 100%;
  padding: 8px;
  background-color: #333333;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.4);
  .session-type-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    .type-icon {
      font-size: 32px;
    }
  }
  .session-info-container {
    display: flex;
    flex-flow: row wrap;
    height: auto;
    width: 100%;
    .session-id-container {
      display: flex;
      flex-flow: row wrap;
      height: auto;
      width: 100%;
      .session-detail-item {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        font-size: 14px;
        margin: 4px;
        color: #eeb155;
      }
      .session-hightlight-detail-item {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        margin: 4px;
        padding: 0 4px;
        border-radius: 4px;
        color: white;
        background-color: #cc8d2e;
      }
    }
    .separator-item {
      font-size: 14px;
      margin: 4px;
    }
    .vertical-separator-item {
      margin: 4px;
      content: '';
      width: 2px;
      background-color: white;
      left: 100%;
    }
    .session-detail-info1-item {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      font-size: 14px;
      margin: 4px;
      border-radius: 4px;
      color: white;
    }
    .session-highlight-detail-info1-item {
      color: #eeb155;
      @extend .session-detail-info1-item;
    }
    .session-detail-info2-item {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      margin: 4px;
      padding: 0 4px;
      border-radius: 4px;
      color: whitesmoke;
      background-color: #4b4b4b;
    }
    .session-desciption-item {
      width: 100%;
      margin: 4px;
      font-size: 16px;
    }
  }
  .session-button-container {
    position: absolute;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 32px;
    top: 8px;
    right: 8px;
    border-radius: 16px;
    background-color: rgba(245, 245, 245, 0.1);
    .session-revoke {
      font-size: 20px;
      opacity: 0.5;
    }
    &:hover {
      background-color: rgb(230, 90, 40);
      .session-revoke {
        opacity: 1;
      }
    }
  }
}
</style>
