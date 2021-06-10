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
            <fa-icon icon="users" />
            <span v-text="teamDesc" />
          </div>
          <div v-if="isAdmin" class="admin">
            <fa-icon icon="user" />
            <span v-text="'Admin on this workspace'" />
          </div>
        </div>
      </div>
    </template>
    <div class="user-cell-container" :class="deactivatedClass">
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
    deactivated: {
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
    deactivatedClass(): string {
      return this.deactivated ? 'deactivated' : ''
    },
  },
  methods: {
    toDate,
  },
})
</script>

<style lang="scss">
.tooltip-content {
  padding: 0px !important;
  white-space: normal !important;
}
.tooltip-container img {
  border-radius: 50%;
}
.user-cell-container img {
  border-radius: 4px;
}
</style>

<style lang="scss" scoped>
.tooltip-container {
  display: grid;
  width: 300px;
  padding: 8px;
  grid-template-rows: 25px 25px auto 8px auto;
  grid-template-columns: 50px 16px 218px;

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
    }
    .language {
      width: 218px;
      font-size: 12px;
      font-weight: bold;
      color: gray;
      word-wrap: break-word;
    }
  }

  .info-box {
    grid-row: 5 / 6;
    grid-column: 1 / 4;
    font-size: 12px;
    font-weight: bold;
    color: gray;

    .user,
    .admin,
    .info {
      word-wrap: break-word;
    }
    i {
      width: 16px;
      font-size: 14px;
      margin-right: 2px;
    }
  }
}
.user-cell-container {
  display: grid;
  min-width: 250px;
  grid-template-rows: 40px 24px;
  grid-template-columns: 64px 16px 160px;
  border: solid 1px white;
  padding: 4px;
  border-radius: 5px;
  color: white;
  background-color: black;
  transition: all 100ms;

  &:hover {
    background-color: rgb(100, 100, 100);
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
}
.deactivated {
  background-color: rgb(85, 85, 85);
}
</style>
