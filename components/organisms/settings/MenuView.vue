<template>
  <div class="menu-view-container">
    <b-tabs
      :value="current"
      class="menu-tabs-container"
      type="is-boxed"
      @input="changedTab"
    >
      <template v-for="tab in tabs">
        <b-tab-item
          v-if="tab.displayed"
          :key="tab.id"
          :value="tab.id"
          :label="tab.label"
          :icon="tab.icon"
        />
      </template>
    </b-tabs>
    <Profile v-if="current === TAB_TYPE_MODEL.PROFILE" />
    <Auth v-if="current === TAB_TYPE_MODEL.AUTH" />
    <Users v-if="current === TAB_TYPE_MODEL.USERS" />
    <Teams v-if="current === TAB_TYPE_MODEL.TEAMS" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Profile from '@/components/organisms/settings/Profile.vue'
import Auth from '@/components/organisms/settings/Auth.vue'
import Users from '@/components/organisms/settings/Users.vue'
import Teams from '@/components/organisms/settings/Teams.vue'

type TabModel = {
  id: string
  displayed: boolean
  admin: boolean
  label: string
  icon: string
}

const TAB_TYPE_MODEL = {
  PROFILE: 'profile',
  AUTH: 'auth',
  USERS: 'users',
  TEAMS: 'teams',
} as const

const tabs = [
  {
    id: TAB_TYPE_MODEL.PROFILE,
    displayed: true,
    admin: false,
    label: 'Profile',
    icon: 'badge-account-horizontal-outline',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.AUTH,
    displayed: true,
    admin: false,
    label: 'Authentication',
    icon: 'lock-reset',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.USERS,
    displayed: true,
    admin: false,
    label: 'Users',
    icon: 'account',
  } as TabModel,
  {
    id: TAB_TYPE_MODEL.TEAMS,
    displayed: true,
    admin: false,
    label: 'Teams',
    icon: 'account-group',
  } as TabModel,
]

type DataType = {
  TAB_TYPE_MODEL: Object
  tabs: TabModel[]
}

export default Vue.extend({
  components: {
    Profile,
    Auth,
    Users,
    Teams,
  },
  props: {
    current: {
      type: String,
      default: TAB_TYPE_MODEL.PROFILE,
    },
  },
  data(): DataType {
    return {
      tabs,
      TAB_TYPE_MODEL,
    }
  },
  methods: {
    changedTab(view: string) {
      this.$router.push(`/settings/${view}`)
    },
  },
})
</script>

<style lang="scss">
.menu-view-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  margin: 32px auto;
  background-color: rgb(32, 32, 32);

  .menu-tabs-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    padding: 16px 32px;
    border-radius: 8px;
    .tab-content {
      padding: 0;
    }

    .tabs li a {
      color: white;
    }

    .tabs.is-boxed a:hover {
      background-color: rgb(60, 60, 60);
    }

    .tabs li.is-active a {
      color: #3273dc;
    }

    .tabs.is-boxed li.is-active a:hover {
      background-color: white;
    }
  }
}
</style>
