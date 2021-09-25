<template>
  <b-tooltip type="is-dark is-light" position="is-top" :active="!isTeam">
    <template #content>
      <div class="tooltip-container">
        <div class="icon-box">
          <fa-icon v-if="!hasImage" icon="user" />
          <b-image v-if="hasImage" :src="user.icon_uri" :rounded="rounded" />
        </div>
        <div class="detail-box">
          <div class="username" v-text="user.name" />
          <div class="detail" v-text="user.bio" />
          <div class="language">
            <fa-icon icon="globe-asia" />
            <span v-text="user.lang" />
          </div>
        </div>
        <div class="info-box">
          <div class="team">
            <fa-icon icon="users" class="info-box-icon" />
            <span v-text="teamDesc" />
          </div>
          <div v-if="isAdmin" class="admin">
            <fa-icon icon="user" class="info-box-icon" />
            <span v-text="'Admin on this workspace'" />
          </div>
        </div>
      </div>
    </template>
    <div class="user-cell-container" :class="lockedColorClass">
      <div class="icon-box">
        <fa-icon v-if="!hasImage" :icon="isTeam ? 'users' : 'user'" />
        <b-image v-if="hasImage" :src="user.icon_uri" :rounded="rounded" />
      </div>
      <div class="username-box">
        <span v-text="user.name" />
      </div>
      <div class="joinedat-box">
        <span v-text="toDate(user.created_at)" />
      </div>
      <div v-if="lockable" class="option-box" :class="userLockableClass">
        <span
          class="lock-user-item"
          @click="$emit(user.is_lock ? 'unlock' : 'lock', user.uuid)"
          v-text="user.is_lock ? 'UNLOCK' : 'LOCK'"
        />
      </div>
    </div>
  </b-tooltip>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ProfileModel } from '@/scripts/api/index'
import { toDate } from '@/scripts/utils/date'

export default Vue.extend({
  props: {
    user: {
      type: Object as PropType<ProfileModel>,
      default: {} as ProfileModel,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    lockable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasImage(): boolean {
      return !(this.user.icon_uri === undefined || this.user.icon_uri === '')
    },
    isTeam(): boolean {
      return this.user.is_team
    },
    teamDesc(): string {
      const teams = this.user.teams ?? []
      if (teams.length > 0) {
        let t = `Member of ${teams[0].name}`
        t += teams.length > 1 ? `, and ${teams.length - 1} more` : ''
        return t
      }
      return 'Not participated in any team'
    },
    isAdmin(): boolean {
      return this.user.is_admin ?? false
    },
    lockedColorClass(): string {
      return this.user.is_lock === true ? 'locked-color' : ''
    },
    userLockableClass(): string {
      return this.lockable ? 'user-lockable' : ''
    },
  },
  methods: {
    toDate,
  },
})
</script>

<style lang="scss" scoped>
::v-deep .tooltip-content {
  padding: 0px !important;
  white-space: normal !important;
}
::v-deep .tooltip-container img {
  border-radius: 50%;
}
::v-deep .user-cell-container img {
  border-radius: 4px;
}

.tooltip-container {
  display: grid;
  width: 300px;
  padding: 8px;
  grid-template-rows: 25px 25px auto 8px auto;
  grid-template-columns: 50px 16px 218px;
  border: solid 1px $contrast-color;
  border-radius: 4px;
  background-color: $sub-main-color;

  .icon-box {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
  }

  .detail-box {
    grid-row: 1 / 4;
    grid-column: 3 / 4;

    .username {
      width: 218px;
      font-size: 15px;
      font-weight: bold;
      word-wrap: break-word;
    }
    .detail {
      max-height: 100px;
      width: 218px;
      font-size: 14px;
      padding: 2px 0;
      word-wrap: break-word;
      overflow: hidden;
      font-weight: bold;
    }
    .language {
      width: 218px;
      font-size: 12px;
      color: $font-color;
      word-wrap: break-word;
    }
  }

  .info-box {
    grid-row: 5 / 6;
    grid-column: 1 / 4;
    font-size: 12px;
    color: $font-color;

    .user,
    .admin,
    .info {
      word-wrap: break-word;

      .info-box-icon {
        width: 14px;
        font-size: 14px;
        margin-right: 2px;
      }
    }
  }
}
.user-cell-container {
  display: grid;
  min-width: 250px;
  grid-template-rows: 40px 24px;
  grid-template-columns: 64px 16px 160px;
  padding: 4px;
  border-radius: 5px;
  color: $font-color;
  background-color: $sub-main-color;
  transition: all 100ms;

  &:hover {
    opacity: 0.9;
  }

  .icon-box {
    grid-row: 1 / 3;
    grid-column: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;

    img {
      border-radius: 4px;
    }
  }

  .username-box {
    display: flex;
    align-items: center;
    grid-row: 1;
    grid-column: 3;
    font-size: 16px;
    font-weight: bold;
  }

  .joinedat-box {
    display: flex;
    align-items: center;
    grid-row: 2;
    grid-column: 3;
    font-size: 12px;
  }

  .option-box {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-end;
    grid-row: 3;
    grid-column: 1 / 4;
    padding: 0 4px;

    .lock-user-item {
      font-size: 10px;
      background-color: $contrast-color;
      color: $sub-main-color;
      padding: 1px 6px;
      border-radius: 4px;
      transition: all 200ms;

      &:hover {
        background-color: $dangerous-color;
        color: $font-color;
      }
    }
  }
}
.locked-color {
  opacity: 0.4;
}
.user-lockable {
  grid-template-rows: 40px 24px 24px;
}
</style>
