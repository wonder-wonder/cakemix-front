<template>
  <div class="log-cell-container">
    <div class="log-type-container">
      <fa-icon class="type-icon" :icon="iconType" />
    </div>
    <div class="log-info-container">
      <div class="log-user-container">
        <img
          v-if="hasUserIcon"
          class="user-icon-item"
          :src="userIcon"
          alt="user_profile_icon"
        >
        <span class="user-name-item" v-text="userName" />
      </div>
      <span class="separator-item" v-text="'−'" />
      <span class="log-highlight-detail-info1-item" v-text="logType" />
      <span class="vertical-separator-item" />
      <span class="log-detail-info1-item" v-text="logDate" />
      <span class="log-desciption-item" v-text="logDesc" />
      <span
        v-for="(v, i) in logDetails"
        :key="`log-detail-info-${logDate}-${i}`"
        class="log-detail-info2-item"
        :title="logDetailKeys[i]"
        v-text="v"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { AuthLogModel } from '@/scripts/api/index'
import { toDate } from '@/scripts/utils/date'
import { getDescription } from '@/scripts/model/log/description'
import { getKey } from '@/scripts/model/log/keys'

export default Vue.extend({
  props: {
    logModel: {
      type: Object as PropType<AuthLogModel>,
      default: {} as AuthLogModel,
    },
  },
  computed: {
    iconType(): string {
      const logType = this.logType.split('.')[0]
      switch (logType) {
        case 'auth':
          return 'key'
        default:
          return 'question-circle'
      }
    },
    userIcon(): string {
      if (this.logModel.user === undefined) {
        return ''
      }
      return this.logModel.user.icon_uri
    },
    hasUserIcon(): boolean {
      return this.userIcon !== ''
    },
    userName(): string {
      if (this.logModel.user === undefined) {
        return ''
      }
      return this.logModel.user.name
    },
    logType(): string {
      if (this.logModel.type === undefined) {
        return ''
      }
      return this.logModel.type
    },
    logDate(): string {
      if (this.logModel.date === undefined) {
        return ''
      }
      return this.toDate(this.logModel.date)
    },
    logDesc(): string {
      const bigCategory = this.logType.split('.')[0]
      const smallCategory = this.logType.split('.')[1]
      return getDescription(bigCategory, smallCategory)
    },
    logDetailKeys(): string[] {
      if (this.logModel.data === undefined) {
        return []
      }
      const data = Object.keys(this.logModel.data)
      const keys: string[] = []
      for (let i = 0; i < data.length; i++) {
        keys.push(this.getKey(data[i]))
      }
      return keys
    },
    logDetails(): string[] {
      if (this.logModel.data === undefined) {
        return []
      }
      return Object.values(this.logModel.data)
    },
  },
  methods: {
    toDate,
    getDescription,
    getKey,
  },
})
</script>

<style lang="scss" scoped>
.log-cell-container {
  display: flex;
  flex-flow: row nowrap;
  height: auto;
  width: 100%;
  padding: 8px;
  background-color: #333333;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.4);
  .log-type-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    .type-icon {
      font-size: 32px;
    }
  }
  .log-info-container {
    display: flex;
    flex-flow: row wrap;
    height: auto;
    width: 100%;
    .log-user-container {
      display: flex;
      flex-flow: row wrap;
      height: auto;
      height: 28px;
      .user-icon-item {
        height: 20px;
        width: 20px;
        margin: 4px;
        border-radius: 50%;
      }
      .user-name-item {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        margin: 4px;
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
      height: 20px;
      background-color: white;
      left: 100%;
    }
    .log-detail-info1-item {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      margin: 4px;
      padding: 0 4px;
      border-radius: 4px;
      color: white;
    }
    .log-highlight-detail-info1-item {
      color: #eeb155;
      @extend .log-detail-info1-item;
    }
    .log-detail-info2-item {
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
    .log-desciption-item {
      width: 100%;
      margin: 4px;
      font-size: 16px;
    }
  }
}
</style>
