<template>
  <b-tabs
    :value="current"
    class="tabs-container"
    type="is-boxed"
    @input="changedTab"
  >
    <template v-for="tab in tabModels">
      <b-tab-item
        v-if="tab.displayed"
        :key="tab.id"
        :value="tab.id"
        :label="tab.label"
        :icon="tab.icon"
      />
    </template>
  </b-tabs>
</template>

<script lang="ts">
import Vue from 'vue'

export const TAB_TYPE_MODEL = {
  PROFILE: 'profile',
  AUTH: 'auth',
  USERS: 'users',
  TEAMS: 'teams',
} as const

type TabModel = {
  id: string
  displayed: boolean
  admin: boolean
  label: string
  icon: string
}
const tabModels = [
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
    label: 'Auth',
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
] as TabModel[]

type DataType = {
  tabModels: TabModel[]
}

export default Vue.extend({
  props: {
    current: {
      type: String,
      default: TAB_TYPE_MODEL.PROFILE,
    },
  },
  data(): DataType {
    return {
      tabModels,
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
.tabs-container {
  display: flex;
  flex-flow: row wrap;

  .tab-content {
    padding: 0;
  }

  .tabs.is-boxed {
    padding: 0 15px;
    margin: 0 auto;
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
</style>
